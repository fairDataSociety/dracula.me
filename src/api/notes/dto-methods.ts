/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { NoteDto } from './types'
import { NoteDetails } from '../../redux/note-details/types'
import { initialState } from '../../redux/note-details/reducers'

export const noteDtoToNoteDetails = (note: NoteDto): NoteDetails => {
  return {
    markdownContent: note.content,
    id: "123",
    noteTitle: initialState.noteTitle,

  }
}
