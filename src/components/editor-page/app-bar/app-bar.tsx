/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { ShowIf } from '../../common/show-if/show-if'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button/help-button'
import { SyncScrollButtons } from './sync-scroll-buttons/sync-scroll-buttons'

import { NewNoteButton } from './new-note-button'
import { LoadFilesComponent, ListPodsComponent, OpenPodComponent } from '@fairdatasociety/fairos-connect'

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
  setNewNote?: any
  setPodName?: any
  podName?: any
}

export const AppBar: React.FC<AppBarProps> = ({
  mode,
  openModal,
  openSaveFileModal,
  password,
  setFiles,
  openFileListModal,
  setNewNote,
  setPodName,
  podName
}) => {
  // const noteFrontmatter = useApplicationState((state) => state.noteDetails.)
  const [pods, setPod] = useState([])

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
        <Button className='mx-3' size='sm' variant='primary' onClick={openModal}>
          FD Connect
        </Button>

        {password && (
          <Button className='mx-3' size='sm' variant='primary' onClick={openSaveFileModal}>
            Save File
          </Button>
        )}
        {password && (
          <Button className='mx-3' size='sm' variant='primary' onClick={openFileListModal}>
            <LoadFilesComponent podName={podName} password={password} setFiles={setFiles}></LoadFilesComponent>
          </Button>
        )}
        {password && (
          <Dropdown>
            <Dropdown.Toggle size='sm'>
              <label>
                <ListPodsComponent setPod={setPod}></ListPodsComponent>
              </label>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {pods.map((pod) => {
                return (
                  <Dropdown.Item
                    onClick={() => {
                      setPodName(pod)
                      console.log(pod)
                      console.log(podName)
                    }}>
                    <OpenPodComponent password={password} podName={pod}></OpenPodComponent>
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
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
