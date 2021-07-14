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
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { UploadFileComponent, LoginComponent, ListFilesComponent, LoadFilesComponent } from 'fairdrive-protocol'

export enum AppBarMode {
  BASIC,
  EDITOR
}

export interface AppBarProps {
  mode: AppBarMode
  openModal?: () => void
  openSaveFileModal?: () => void
  password?: string
  setFiles?: any
  openFileListModal?: any
}

export const AppBar: React.FC<AppBarProps> = ({
  mode,
  openModal,
  openSaveFileModal,
  password,
  setFiles,
  openFileListModal
}) => {
  // const noteFrontmatter = useApplicationState((state) => state.noteDetails.)

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
        <NewNoteButton />
        <Button className='mx-2' size='sm' variant='primary' onClick={openModal}>
          FD Connect
        </Button>
        {password && (
          <Button className='mx-2' size='sm' variant='primary' onClick={openSaveFileModal}>
            Save File
          </Button>
        )}
        {password && (
          <div onClick={openFileListModal}>
            <LoadFilesComponent password={password} setFiles={setFiles}></LoadFilesComponent>
          </div>
        )}
        {/* Add FD login
        <ShowIf condition={!userExists}>
          <SignInButton size={'sm'} />
        </ShowIf>
        <ShowIf condition={userExists}>
          <UserDropdown />
        </ShowIf> */}
      </Nav>
    </Navbar>
  )
}
