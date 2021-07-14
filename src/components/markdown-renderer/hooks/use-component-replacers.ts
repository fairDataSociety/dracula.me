/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback } from 'react'
import { AbcReplacer } from '../replace-components/abc/abc-replacer'
import { AsciinemaReplacer } from '../replace-components/asciinema/asciinema-replacer'
import { ComponentReplacer } from '../replace-components/ComponentReplacer'
import { CsvReplacer } from '../replace-components/csv/csv-replacer'
import { FlowchartReplacer } from '../replace-components/flow/flowchart-replacer'
import { GistReplacer } from '../replace-components/gist/gist-replacer'
import { GraphvizReplacer } from '../replace-components/graphviz/graphviz-replacer'
import { HighlightedCodeReplacer } from '../replace-components/highlighted-fence/highlighted-fence-replacer'
import { ImageClickHandler, ImageReplacer } from '../replace-components/image/image-replacer'
import { KatexReplacer } from '../replace-components/katex/katex-replacer'
import { LinemarkerReplacer } from '../replace-components/linemarker/linemarker-replacer'
import { LinkReplacer } from '../replace-components/link-replacer/link-replacer'
import { MarkmapReplacer } from '../replace-components/markmap/markmap-replacer'
import { MermaidReplacer } from '../replace-components/mermaid/mermaid-replacer'
import { ColoredBlockquoteReplacer } from '../replace-components/colored-blockquote/colored-blockquote-replacer'
import { SequenceDiagramReplacer } from '../replace-components/sequence-diagram/sequence-diagram-replacer'
import { TaskCheckedChangeHandler, TaskListReplacer } from '../replace-components/task-list/task-list-replacer'
import { VegaReplacer } from '../replace-components/vega-lite/vega-replacer'
import { VimeoReplacer } from '../replace-components/vimeo/vimeo-replacer'
import { YoutubeReplacer } from '../replace-components/youtube/youtube-replacer'

export const useComponentReplacers = (
  onTaskCheckedChange?: TaskCheckedChangeHandler,
  onImageClick?: ImageClickHandler,
  baseUrl?: string
): (() => ComponentReplacer[]) =>
  useCallback(
    () => [
      new LinemarkerReplacer(),
      new GistReplacer(),
      new YoutubeReplacer(),
      new VimeoReplacer(),
      new AsciinemaReplacer(),
      new AbcReplacer(),
      new ImageReplacer(onImageClick),
      new SequenceDiagramReplacer(),
      new CsvReplacer(),
      new FlowchartReplacer(),
      new MermaidReplacer(),
      new GraphvizReplacer(),
      new MarkmapReplacer(),
      new VegaReplacer(),
      new HighlightedCodeReplacer(),
      new ColoredBlockquoteReplacer(),
      new KatexReplacer(),
      new TaskListReplacer(onTaskCheckedChange),
      new LinkReplacer(baseUrl)
    ],
    [onImageClick, onTaskCheckedChange, baseUrl]
  )
