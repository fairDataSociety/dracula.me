/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { InternalLink } from '../common/links/internal-link'
import { ShowIf } from '../common/show-if/show-if'
import {
  DocumentInfoLineWithTimeMode,
  DocumentInfoTimeLine
} from '../editor-page/document-bar/document-info/document-info-time-line'
import './document-infobar.scss'
import { useCustomizeAssetsUrl } from '../../hooks/common/use-customize-assets-url'

export interface DocumentInfobarProps {
  createdAuthor: string
  editable: boolean
  noteId: string
}

export const DocumentInfobar: React.FC<DocumentInfobarProps> = ({

  createdAuthor,
  editable,
  noteId
}) => {
  const { t } = useTranslation()
  const assetsBaseUrl = useCustomizeAssetsUrl()

  return (
    <div className={'d-flex flex-row my-3 document-infobar'}>
      <div className={'col-md'}>&nbsp;</div>
      <div className={'d-flex flex-fill'}>
        <div className={'d-flex flex-column'}>
          <DocumentInfoTimeLine
            mode={DocumentInfoLineWithTimeMode.CREATED}
      
            userName={createdAuthor}
            profileImageSrc={`${assetsBaseUrl}/img/avatar.png`}
          />
          <DocumentInfoTimeLine
            mode={DocumentInfoLineWithTimeMode.EDITED}
            userName={createdAuthor}
            profileImageSrc={`${assetsBaseUrl}/img/avatar.png`}
          />
          <hr />
        </div>
        <span className={'ml-auto'}>
          <Trans i18nKey={'views.readOnly.viewCount'} />
          <ShowIf condition={editable}>
            <InternalLink
              text={''}
              href={`/n/${noteId}`}
              icon={'pencil'}
              className={'text-primary text-decoration-none mx-1'}
              title={t('views.readOnly.editNote')}
            />
          </ShowIf>
        </span>
      </div>
      <div className={'col-md'}>&nbsp;</div>
    </div>
  )
}
