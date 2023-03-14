/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { ShowIf } from '../../common/show-if/show-if'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button/help-button'
import { SyncScrollButtons } from './sync-scroll-buttons/sync-scroll-buttons'

import { NewNoteButton } from './new-note-button'
import { ListPods } from '../../common/list-pods/list-pods'
import { LoadFiles } from '../../common/load-files/load-files'

export enum AppBarMode {
  BASIC,
  EDITOR
}

export interface AppBarProps {
  mode: AppBarMode
  openModal?: () => void
  openSaveFileModal?: () => void
  onSignOut?: () => void
  loggedin?: boolean
  setFiles?: any
  setNewNote?: any
  setPodName?: any
  podName?: any
  disabled?: boolean
  disableSave?: boolean
}

export const AppBar: React.FC<AppBarProps> = ({
  mode,
  openModal,
  openSaveFileModal,
  onSignOut,
  loggedin,
  setFiles,
  setNewNote,
  setPodName,
  podName,
  disabled,
  disableSave
}) => {
  return (
    <Navbar bg={'light'}>
      <Nav className='mr-auto d-flex align-items-center'>
        <ShowIf condition={mode === AppBarMode.EDITOR}>
          <EditorViewMode />
          <SyncScrollButtons />
        </ShowIf>
        <DarkModeButton />
        <ShowIf condition={mode === AppBarMode.EDITOR}>
          <HelpButton />
        </ShowIf>
      </Nav>
      <Nav className='d-flex align-items-center text-secondary'>
        <NewNoteButton setNewNote={setNewNote} />
        {loggedin ? (
          <>
            <Button
              className='mx-3'
              size='sm'
              variant='primary'
              onClick={openSaveFileModal}
              disabled={disabled || disableSave || !podName}>
              Save File
            </Button>
            <LoadFiles podName={podName} onLoaded={setFiles} disabled={disabled || !podName} />

            <ListPods selectedPod={podName} onSelect={(pod) => setPodName(pod.name)} disabled={disabled} />

            <Button className='mx-3' size='sm' variant='primary' onClick={onSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button className='mx-3' size='sm' variant='primary' onClick={openModal}>
            Sign In
          </Button>
        )}
      </Nav>
    </Navbar>
  )
}
