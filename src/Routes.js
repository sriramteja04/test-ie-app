import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import enhancePage from './enhancePage'
import { constants } from './constants'

/**
 * Warning: lazy takes a function that must call a dynamic import().
 * This must return a Promise which resolves to a module with a default export containing a React component.
 */

const promotionBaseRoute = '/dashboard/promotions'

const routes = [
    {
        path: constants.routePaths.marketing,
        component: enhancePage(lazy(() => import('./containers/Marketing'))),
    },
    {
        path: constants.routePaths.prioritize_promos,
        component: enhancePage(lazy(() => import('./pages/PrioritizePromos'))),
    },
    {
        path: constants.routePaths.promo_details,
        component: enhancePage(lazy(() => import('./containers/PromoDetail'))),
    },
    {
        path: constants.routePaths.promotions,
        component: enhancePage(lazy(() => import('./containers/Promotions'))),
    },
    {
        path: constants.routePaths.dashboard,
        render: () => <Redirect to={promotionBaseRoute} />,
    },
    {
        path: '/',
        render: () => <Redirect to={promotionBaseRoute} />,
    },
]

const Routes = () => (
    <Switch>
        {routes.map((props, i) => (
            <Route key={i} exact={true} {...props} />
        ))}
    </Switch>
)

export default Routes
