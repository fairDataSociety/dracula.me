/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { setUpI18n } from './i18n'
import { fetchAndSetBanner } from './fetch-and-set-banner'
import { setApiUrl } from '../../../redux/api-url/methods'
import { fetchFrontendConfig } from './fetch-frontend-config'

const customDelay: () => Promise<void> = async () => {
  if (window.localStorage.getItem('customDelay')) {
    return new Promise((resolve) => setTimeout(resolve, 5000))
  } else {
    return Promise.resolve()
  }
}

export interface InitTask {
  name: string
  task: Promise<void>
}

export const createSetUpTaskList = (
  frontendAssetsUrl: string,
  customizeAssetsUrl: string,
  backendBaseUrl: string
): InitTask[] => {
  setApiUrl({
    apiUrl: `${backendBaseUrl}api/private/`
  })

  return [
    {
      name: 'Load Translations',
      task: setUpI18n(frontendAssetsUrl)
    },
    {
      name: 'Load config',
      task: fetchFrontendConfig()
    },
    {
      name: 'Banner',
      task: fetchAndSetBanner(customizeAssetsUrl)
    },
    {
      name: 'Add Delay',
      task: customDelay()
    }
  ]
}
