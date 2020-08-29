import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import watchPromotions from '../../modules/Promotions/sagas'
import watchAuth from '../../modules/Auth/sagas'

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
    yield all([watchPromotions(), watchAuth()])
}
