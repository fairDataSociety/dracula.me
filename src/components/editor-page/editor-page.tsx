/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitleWithNoteTitle } from '../../hooks/common/use-document-title-with-note-title'
import { useNoteMarkdownContent } from '../../hooks/common/use-note-markdown-content'
import {
  setCheckboxInMarkdownContent,
  setNoteDataFromServer,
  setNoteFrontmatter,
  setNoteMarkdownContent,
  updateNoteTitleByFirstHeading
} from '../../redux/note-details/methods'
import { ShowIf } from '../common/show-if/show-if'
import { AppBar, AppBarMode } from './app-bar/app-bar'
import { EditorMode } from './app-bar/editor-view-mode'
import { EditorPane } from './editor-pane/editor-pane'
import { useViewModeShortcuts } from './hooks/useViewModeShortcuts'
import { RenderIframe } from './renderer-pane/render-iframe'
import { Splitter } from './splitter/splitter'
import { DualScrollState, ScrollState } from './synced-scroll/scroll-props'
import { RendererType } from '../render-page/rendering-message'
import { useEditorModeFromUrl } from './hooks/useEditorModeFromUrl'
import { IframeEditorToRendererCommunicatorContextProvider } from './render-context/iframe-editor-to-renderer-communicator-context-provider'

import { useApplicationState } from '../../hooks/common/use-application-state'
import { UploadFileComponent, LoginComponent, ListFilesComponent } from 'fd-testing-protocol'
export interface EditorPagePathParams {
  id: string
}

export enum ScrollSource {
  EDITOR,
  RENDERER
}

export const EditorPage: React.FC = () => {
  useTranslation()
  const markdownContent = useNoteMarkdownContent()
  const scrollSource = useRef<ScrollSource>(ScrollSource.EDITOR)

  const editorMode: EditorMode = useApplicationState((state) => state.editorConfig.editorMode)
  const editorSyncScroll: boolean = useApplicationState((state) => state.editorConfig.syncScroll)
  const [fileContent, setFileContent] = useState('')
  const [scrollState, setScrollState] = useState<DualScrollState>(() => ({
    editorScrollState: { firstLineInView: 1, scrolledPercentage: 0 },
    rendererScrollState: { firstLineInView: 1, scrolledPercentage: 0 }
  }))

  const onMarkdownRendererScroll = useCallback(
    (newScrollState: ScrollState) => {
      if (scrollSource.current === ScrollSource.RENDERER && editorSyncScroll) {
        setScrollState((old) => ({ editorScrollState: newScrollState, rendererScrollState: old.rendererScrollState }))
      }
    },
    [editorSyncScroll]
  )

  const onEditorScroll = useCallback(
    (newScrollState: ScrollState) => {
      if (scrollSource.current === ScrollSource.EDITOR && editorSyncScroll) {
        setScrollState((old) => ({ rendererScrollState: newScrollState, editorScrollState: old.editorScrollState }))
      }
    },
    [editorSyncScroll]
  )
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(true)

  useViewModeShortcuts()
  useApplyDarkMode()
  useDocumentTitleWithNoteTitle()
  useEditorModeFromUrl()

  useEffect(() => {
    setNoteDataFromServer({ content: '' })
  }, [])

  useEffect(() => {
    setError(false)
    setLoading(false)
  }, [markdownContent])

  const setRendererToScrollSource = useCallback(() => {
    scrollSource.current = ScrollSource.RENDERER
  }, [])

  const setEditorToScrollSource = useCallback(() => {
    scrollSource.current = ScrollSource.EDITOR
  }, [])

  const leftPane = useMemo(
    () => (
      <EditorPane
        onContentChange={setNoteMarkdownContent}
        content={markdownContent}
        scrollState={scrollState.editorScrollState}
        onScroll={onEditorScroll}
        onMakeScrollSource={setEditorToScrollSource}
      />
    ),
    [markdownContent, onEditorScroll, scrollState.editorScrollState, setEditorToScrollSource]
  )

  const rightPane = useMemo(
    () => (
      <RenderIframe
        frameClasses={'h-100 w-100'}
        markdownContent={markdownContent}
        onMakeScrollSource={setRendererToScrollSource}
        onFirstHeadingChange={updateNoteTitleByFirstHeading}
        onTaskCheckedChange={setCheckboxInMarkdownContent}
        onFrontmatterChange={setNoteFrontmatter}
        onScroll={onMarkdownRendererScroll}
        scrollState={scrollState.rendererScrollState}
        rendererType={RendererType.DOCUMENT}
      />
    ),
    [markdownContent, onMarkdownRendererScroll, scrollState.rendererScrollState, setRendererToScrollSource]
  )
  const [password, setPassword] = useState('')
  const [files, setFiles] = useState(null)
  const [file, setFile] = useState({})
  const [openLogin, setOpenLogin] = useState(false)
  const [openFilesList, setOpenFilesList] = useState(false)
  const [openSaveFile, setOpenSaveFile] = useState(false)
  const [uploadRes, setUploadRes] = useState(false)

  const openModal = () => {
    setOpenLogin(true)
  }
  const handleClose = () => {
    setOpenLogin(false)
  }

  const openSaveFileModal = () => {
    setOpenSaveFile(true)
  }
  const handleCloseSaveFileModal = () => {
    setOpenSaveFile(false)
  }

  const openFileListModal = () => {
    if (files) setOpenFilesList(!openFilesList)
  }
  const handleCloseFileListModal = () => {
    setOpenFilesList(false)
  }
  const setNewNote = () => {
    setNoteDataFromServer({ content: '' })
    setFileContent('')
  }
  useEffect(() => {
    const file = new Blob([markdownContent], { type: 'text/plain;charset=utf-8' })
    setFile(file)
  }, [markdownContent])

  useEffect(() => {
    if (password) {
      handleClose()
    }
    // if (files) {
    //   openFileListModal()
    // }
    if (uploadRes === true) {
      handleCloseSaveFileModal()
    }
    if (fileContent) {
      if (fileContent !== markdownContent) {
        setNoteDataFromServer({ content: fileContent })
        setOpenFilesList(false)
      }
    }
  }, [password, files, file, fileContent, uploadRes])

  return (
    <IframeEditorToRendererCommunicatorContextProvider>
      <div className={'d-flex flex-column vh-100'}>
        <AppBar
          mode={AppBarMode.EDITOR}
          openModal={openModal}
          openSaveFileModal={openSaveFileModal}
          password={password}
          setFiles={setFiles}
          openFileListModal={openFileListModal}
          setNewNote={setNewNote}
        />

        {/* <div className={'container'}>
          <ErrorWhileLoadingNoteAlert show={error} />
          {/* <LoadingNoteAlert show={loading} /> 
        </div> */}
        <ShowIf condition={!error && !loading && !openLogin && !openFilesList}>
          <div className={'flex-fill d-flex h-100 w-100 overflow-hidden flex-row'}>
            <Splitter
              showLeft={editorMode === EditorMode.EDITOR || editorMode === EditorMode.BOTH}
              left={leftPane}
              showRight={editorMode === EditorMode.PREVIEW || editorMode === EditorMode.BOTH}
              right={rightPane}
              additionalContainerClassName={'overflow-hidden'}
            />
          </div>
        </ShowIf>
        <ShowIf condition={openLogin}>
          <LoginComponent
            className={'flex-fill d-flex h-100 w-100 overflow-hidden flex-row'}
            setUserPassword={setPassword}
            podName={'Fairdrive'}></LoginComponent>
        </ShowIf>
        <ShowIf condition={openFilesList}>
          <ListFilesComponent password={password} files={files} setFile={setFileContent}></ListFilesComponent>
        </ShowIf>
        <ShowIf condition={openSaveFile}>
          <UploadFileComponent file={file} setUploadRes={setUploadRes}></UploadFileComponent>
        </ShowIf>
      </div>
    </IframeEditorToRendererCommunicatorContextProvider>
  )
}

export default EditorPage
