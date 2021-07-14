/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Navbar } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { HeaderNavLink } from '../header-nav-link'
import { NewGuestNoteButton } from '../new-guest-note-button'
import './header-bar.scss'

const HeaderBar: React.FC = () => {
  useTranslation()

  return (
    <Navbar className='justify-content-between'>
      <div className='nav header-nav'>
        <HeaderNavLink to='/intro' id='navLinkIntro'>
          <Trans i18nKey='landing.navigation.intro' />
        </HeaderNavLink>
        <HeaderNavLink to='/history' id='navLinkHistory'>
          <Trans i18nKey='landing.navigation.history' />
        </HeaderNavLink>
      </div>
      <div className='d-inline-flex'>
        <Fragment>
          <span className={'mx-1 d-flex'}>
            <NewGuestNoteButton />
          </span>
        </Fragment>
      </div>
    </Navbar>
  )
}

export { HeaderBar }
