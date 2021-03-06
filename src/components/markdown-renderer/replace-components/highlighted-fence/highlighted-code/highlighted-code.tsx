/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { CopyToClipboardButton } from '../../../../common/copyable/copy-to-clipboard-button/copy-to-clipboard-button'
import '../../../utils/button-inside.scss'
import './highlighted-code.scss'

export interface HighlightedCodeProps {
  code: string
  language?: string
  startLineNumber?: number
  wrapLines: boolean
}

/*
 TODO: Test method or rewrite code so this is not necessary anymore
 */
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#039;')
}

const replaceCode = (code: string): ReactElement[][] => {
  return code
    .split('\n')
    .filter((line) => !!line)
    .map((line) => ReactHtmlParser(line))
}

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, language, startLineNumber, wrapLines }) => {
  const [dom, setDom] = useState<ReactElement[]>()

  useEffect(() => {
    import(/* webpackChunkName: "highlight.js" */ '../../../../common/hljs/hljs')
      .then((hljs) => {
        const languageSupported = (lang: string) => hljs.default.listLanguages().includes(lang)
        const unreplacedCode =
          !!language && languageSupported(language)
            ? hljs.default.highlight(code, { language }).value
            : escapeHtml(code)
        const replacedDom = replaceCode(unreplacedCode).map((line, index) => (
          <Fragment key={index}>
            <span className={'linenumber'}>{(startLineNumber || 1) + index}</span>
            <div className={'codeline'}>{line}</div>
          </Fragment>
        ))
        setDom(replacedDom)
      })
      .catch(() => {
        console.error('error while loading highlight.js')
      })
  }, [code, language, startLineNumber])

  return (
    <Fragment>
      <code className={`hljs ${startLineNumber !== undefined ? 'showGutter' : ''} ${wrapLines ? 'wrapLines' : ''}`}>
        {dom}
      </code>
      <div className={'text-right button-inside'}>
        <CopyToClipboardButton content={code} data-cy='copy-code-button' />
      </div>
    </Fragment>
  )
}

export default HighlightedCode
