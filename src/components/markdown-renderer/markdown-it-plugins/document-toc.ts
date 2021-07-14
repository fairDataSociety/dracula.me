/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it'
import toc, { TocAst } from 'markdown-it-toc-done-right'
import { tocSlugify } from '../../editor-page/table-of-contents/toc-slugify'

export type DocumentTocPluginOptions = (ast: TocAst) => void

export const documentToc: MarkdownIt.PluginWithOptions<DocumentTocPluginOptions> = (markdownIt, onToc) => {
  if (!onToc) {
    return
  }
  toc(markdownIt, {
    placeholder: '(\\[TOC\\]|\\[toc\\])',
    listType: 'ul',
    level: [1, 2, 3],
    callback: (code: string, ast: TocAst): void => {
      onToc(ast)
    },
    slugify: tocSlugify
  })
}
