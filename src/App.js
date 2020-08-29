import React, { Suspense, useState, useEffect, memo, lazy } from 'react'
import { withRouter, Route } from 'react-router-dom'

import './scss/index.scss'
import Layout from './pages/Layout'
import { Spinner } from './components/common'
import Authenticator from './containers/Authenticator'
import Routes from './Routes'

const Logout = lazy(() => import('./containers/Logout'))

const App = withRouter(({ history }) => {
    const [pathname, setPathName] = useState('/')

    useEffect(() => {
        setPathName(history.location.pathname)
    }, [history.location.pathname])

    return (
        <div className={'App'}>
            <Suspense fallback={<Spinner />}>
                <Route path={'/logout'} component={Logout} />
                <Authenticator>
                    <Layout pathname={pathname}>
                        <Routes />
                    </Layout>
                </Authenticator>
            </Suspense>
        </div>
    )
})

export default memo(
    App,
    (prevProps, nextProps) =>
        prevProps.history.location.pathname === nextProps.history.location.pathname
)
