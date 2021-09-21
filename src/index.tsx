/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApplicationLoader } from './components/application-loader/application-loader'
import { ErrorBoundary } from './components/error-boundary/error-boundary'
import { EditorPage } from './components/editor-page/editor-page'
import { store } from './redux'
import * as serviceWorkerRegistration from './service-worker-registration'
import './style/dark.scss'
import './style/index.scss'
import { isTestMode } from './utils/test-modes'

// const EditorPage = React.lazy(
//   () => import(/* webpackPrefetch: true */ /* webpackChunkName: "editor" */ './components/editor-page/editor-page')
// )
const RenderPage = React.lazy(
  () => import(/* webpackPrefetch: true */ /* webpackChunkName: "renderPage" */ './components/render-page/render-page')
)
const DocumentReadOnlyPage = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ /* webpackChunkName: "documentReadOnly" */ './components/document-read-only-page/document-read-only-page'
    )
)
const baseUrl = new URL(document.head.baseURI).pathname

ReactDOM.render(
  <Provider store={store}>
    <Router basename={baseUrl}>
      <ApplicationLoader>
        <ErrorBoundary>
          <Switch>
            <Route path='/render'>
              <RenderPage />
            </Route>
            <Route path='/'>
              <EditorPage />
            </Route>
            <Route exact path='/:podName/:directory/:filename' component={EditorPage}></Route>
          </Switch>
        </ErrorBoundary>
      </ApplicationLoader>
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (isTestMode()) {
  console.log('This build runs in test mode. This means:\n - no sandboxed iframe')
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.unregister()
