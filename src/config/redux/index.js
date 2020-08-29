import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'

import rootSaga, { sagaMiddleware } from '../sagas'
import auth from '../../modules/Auth/reducer'
import promotions from '../../modules/Promotions/reducer'
import filters from '../../modules/Filters/reducer'
import common from '../../modules/Common/reducer'
import { sagaRedirectAuthInfo } from '../../modules/Auth/actions'

const persistConfig = {
    key: 'root',
    storage,
    transforms: [immutableTransform()],
    whitelist: ['filters'],
}

const promoPersist = {
    key: 'promotions',
    storage,
    whitelist: ['size', 'pageNo', 'order', 'orderBy', 'count'],
}

const authPersist = {
    key: 'auth',
    storage,
    blacklist: ['is_logout'],
}

const rootReducer = combineReducers({
    filters,
    auth: persistReducer(authPersist, auth),
    promotions: persistReducer(promoPersist, promotions),
    common,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const composeEnhancers = composeWithDevTools({ realtime: true, suppressConnectErrors:false,port:3000 })
let composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose

composeEnhancers = composeEnhancers
    ? composeEnhancers(applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware)

const store = createStore(persistedReducer, composeEnhancers)

const persistor = persistStore(store, null, () => {
    store.dispatch(sagaRedirectAuthInfo())
})

export { store, persistor }

sagaMiddleware.run(rootSaga)
