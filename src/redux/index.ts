/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { combineReducers, createStore, Reducer } from 'redux'
import { Config } from '../api/config/types'
import { ApiUrlReducer } from './api-url/reducers'
import { ApiUrlObject } from './api-url/types'
import { BannerReducer } from './banner/reducers'
import { BannerState } from './banner/types'
import { ConfigReducer } from './config/reducers'
import { DarkModeConfigReducer } from './dark-mode/reducers'
import { DarkModeConfig } from './dark-mode/types'
import { EditorConfigReducer } from './editor/reducers'
import { EditorConfig } from './editor/types'
import { FdpReducer } from './fdp/reducers'
import { Fdp } from './fdp/types'
import { NoteDetailsReducer } from './note-details/reducers'
import { NoteDetails } from './note-details/types'
import { UserReducer } from './user/reducers'
import { User } from './user/types'

export interface ApplicationState {
  config: Config
  banner: BannerState
  apiUrl: ApiUrlObject
  editorConfig: EditorConfig
  darkMode: DarkModeConfig
  noteDetails: NoteDetails
  user: User
  fdp: Fdp
}

export const allReducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  config: ConfigReducer,
  banner: BannerReducer,
  apiUrl: ApiUrlReducer,
  editorConfig: EditorConfigReducer,
  darkMode: DarkModeConfigReducer,
  noteDetails: NoteDetailsReducer,
  user: UserReducer,
  fdp: FdpReducer
})

export const store = createStore(allReducers)
