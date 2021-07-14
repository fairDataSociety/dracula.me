/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { UserAvatar } from '../../common/user-avatar/user-avatar'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export const UserDropdown: React.FC = () => {
  useTranslation()

  return <Dropdown alignRight></Dropdown>
}
