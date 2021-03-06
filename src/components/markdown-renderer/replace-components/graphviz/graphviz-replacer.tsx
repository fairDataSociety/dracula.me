/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import DomElement from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { GraphvizFrame } from './graphviz-frame'

export class GraphvizReplacer implements ComponentReplacer {
  getReplacement(codeNode: any): React.ReactElement | undefined {
    if (
      codeNode.name !== 'code' ||
      !codeNode.attribs ||
      !codeNode.attribs['data-highlight-language'] ||
      codeNode.attribs['data-highlight-language'] !== 'graphviz' ||
      !codeNode.children ||
      !codeNode.children[0]
    ) {
      return
    }

    const code = codeNode.children[0].data as string

    return <GraphvizFrame code={code} />
  }
}
