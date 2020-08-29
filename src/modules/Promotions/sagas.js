import { takeEvery, all, call, put, select } from 'redux-saga/effects'

import * as actions from './actions'
import history from '../../util/history'
import * as url from './url'
import { api } from '../api'
import { util } from '../../util'
import { constants } from '../../constants'

function* createPromoSaga(action) {
    try {
        yield put(actions.promoLoadingStart())
        const email = yield select(util.getUserEmail)
        const data = { ...action.payload, updated_by: email }
        const res = yield call(api, url.createPromoURL, 'POST', data)
        yield put(actions.createPromoSuccess(res.data.promotion))
        yield put(actions.modalClose())
        history.push({
            pathname: `/dashboard/promotions/${res.data.promotion._id}`,
            state: { fromSaga: true },
        })
    } catch (e) {
        console.log(e)
        yield put(actions.createPromoFail(e.data.message))
        yield put(actions.promoLoadingEnd())
    }
}

function* deletePromoById(action) {
    try {
        yield put(actions.promoLoadingStart())
        const data = {
            _id: action.payload,
        }
        yield call(api, url.deletePromoURL, 'POST', data)
        yield put(actions.enablePromoAlert('Promo Successfully Deleted'))
        yield put(actions.promoLoadingEnd())
        history.push('/dashboard/promotions')
    } catch (e) {
        yield put(actions.promoLoadingEnd())
    }
}

function* deletePromos(action) {
    try {
        yield put(actions.promoLoadingStart())
        const { _id, ...rest } = action.payload
        const data = {
            _id: _id,
        }
        yield call(api, url.deletePromoURL, 'POST', data)
        const res = yield call(api, url.getPromosURL, 'POST', {
            ...rest,
        })
        yield put(actions.enablePromoAlert('Promo(s) Successfully Deleted'))
        yield put(
            actions.fetchPromoListSuccess({
                promotions_list: res.data.promotions,
                count: res.data.count,
                size: res.data.size,
                pageNo: res.data.pageNo,
            })
        )
    } catch (e) {
        yield put(actions.promoLoadingEnd())
    }
}

function* fetchPromoList(action) {
    try {
        yield put(actions.promoLoadingStart())
        const res = yield call(api, url.getPromosURL, 'POST', action.payload)
        if (history.location.pathname !== constants.routePaths.prioritize_promos) {
            yield put(
                actions.fetchPromoListSuccess({
                    promotions_list: res.data.promotions,
                    count: res.data.count,
                    size: action.payload.size,
                    pageNo: res.data.pageNo,
                    order: action.payload.sort[Object.keys(action.payload.sort)[0]],
                    orderBy: Object.keys(action.payload.sort)[0],
                })
            )
        } else {
            yield put(
                actions.fetchPromoListSuccess({
                    promotions_list: res.data.promotions,
                })
            )
        }
    } catch (e) {
        yield put(actions.setPromoError(e.message))
        yield put(actions.promoLoadingEnd())
    }
}

function* fetchPrioritizePromos(action) {
    try {
        yield put(actions.promoLoadingStart())
        const res = yield call(api, url.getPromosURL, 'POST', action.payload)
        yield put(
            actions.fetchPrioritizePromosSuccess({
                prioritize_promos: res.data.promotions,
            })
        )
    } catch (e) {
        yield put(actions.promoLoadingEnd())
    }
}

function* updatePrioritizedPromos(action) {
    try {
        yield put(actions.promoLoadingStart())
        const email = yield select(util.getUserEmail)
        const updatingMultiplePromos = action.payload.map(promo => {
            const data = util.promoUpdatedBy({ promo }, email)
            delete data.updated
            return call(api, url.updateMarketingURL, 'POST', data)
        })

        const res = yield all(updatingMultiplePromos)

        // throw new Error()
        const promotions = res.map(({ data: { promotion } }) => promotion)
        const publishingPromos = promotions.reduce((acc, { qa_is_live, is_live, _id }) => {
            if (qa_is_live) {
                acc = acc.concat({
                    type: 'qa_live',
                    publish: true,
                    _id: _id,
                })
            }
            if (is_live) {
                acc = acc.concat({
                    type: 'live',
                    publish: true,
                    _id: _id,
                })
            }
            return acc
        }, [])

        console.log('publishingPromos', publishingPromos)

        if (publishingPromos.length) {
            const publishingMultiplePromos = publishingPromos.map(promo => {
                return call(api, url.publishContentURL, 'POST', promo)
            })

            yield all(publishingMultiplePromos)
        }
        const prioritizePromos = yield select(({ promotions }) => promotions.prioritize_promos)

        const updatedPromotions = prioritizePromos.map(promo => {
            let updatedPromo = promotions.find(({ _id }) => promo._id === _id)
            return updatedPromo ? updatedPromo : { ...promo }
        })

        yield put(actions.updatePrioritizationSuccess(updatedPromotions))
    } catch (e) {
        console.error('Failing updating / publishing multiple promos', e)
        yield put(actions.updatePrioritizationFailed())
    }
}

function* fetchPromoById(action) {
    try {
        yield put(actions.promoLoadingStart())
        const data = { search: { _id: action.payload } }
        const res = yield call(api, url.getPromosURL, 'POST', data)
        const promo = res.data.promotions[0]
        delete promo.isConflictCheckReqd

        yield put(
            actions.fetchPromoSuccess({
                promo_details: promo,
            })
        )
    } catch (e) {
        console.log(e)
        yield put(actions.setPromoError(e.message))
        yield put(actions.promoLoadingEnd())
    }
}

function* clearAlert(action) {
    const delay = time => new Promise(resolve => setTimeout(resolve, time))
    yield call(delay, action.payload)
    yield put({ type: actions.actionTypes.CLEAR_DISPLAY_CONFIRMATION })
}

function* updateMarketing(action) {
    try {
        const res = yield updateData(action)
        const promo = res.data.promotion

        const prevPromo = yield select(util.getCurrentPromo)

        let editingPromo = yield select(util.getEditing)
        if (prevPromo.status !== 'incomplete' && promo.status === 'incomplete') {
            editingPromo = true
        }

        if (promo.status !== 'incomplete' && editingPromo) {
            editingPromo = false
        }

        delete promo.isConflictCheckReqd

        yield put(
            actions.updateMarketingSuccess({
                promo_details: promo,
                id_editing_completed_promo: editingPromo,
            })
        )
    } catch (e) {
        yield put(actions.setPromoError(e.message))
        yield put(actions.promoLoadingEnd())
    }
}

function* updatePromoName(action) {
    try {
        const res = yield call(updateData, action)
        yield put(actions.updateMarketingSuccess({ promo_details: res.data.promotion }))
        yield put(actions.modalClose())
        history.push(`/dashboard/promotions/${res.data.promotion._id}`)
    } catch (e) {
        yield put(actions.promoLoadingEnd())
    }
}

function* updateData(action) {
    try {
        yield put(actions.promoLoadingStart())
        const email = yield select(util.getUserEmail)
        const data = util.promoUpdatedBy(action.payload, email)
        delete data.updated
        return yield call(api, url.updateMarketingURL, 'POST', data)
    } catch (e) {
        yield put(actions.updateMarketingFail(e.data.message))
        yield put(actions.promoLoadingEnd())
    }
}

function* updateInlineEdit(action) {
    try {
        const res = yield updateData(action)
        yield updatePromotionsList(res.data.promotion)
        yield put(actions.promoLoadingEnd())
    } catch (e) {
        console.log(e)
        yield put(actions.promoLoadingEnd())
    }
}

function* fetchCategoriesList() {
    try {
        const res = yield call(api, url.getCategoriesListURL, 'GET')
        if (res) {
            yield put(actions.fetchCategoriesListSuccess(res.data.categories))
        }
    } catch (e) {
        console.log(e)
    }
}

function* publishContent(action) {
    try {
        const { publishContent, publishFromTable } = action.payload
        yield put(actions.promoLoadingStart())
        const res = yield call(api, url.publishContentURL, 'POST', publishContent)
        const promotion = res.data.promotion
        if (publishFromTable) {
            yield updatePromotionsList(promotion)
        } else {
            yield put(
                actions.fetchPromoSuccess({
                    promo_details: promotion,
                })
            )
        }
        const alertMsg = `${constants.publishContentAction[publishContent.type]} was successfully ${
            constants.publishContentStatus[publishContent.publish]
        }`
        yield put(actions.enablePromoAlert(alertMsg))
        yield put(actions.promoLoadingEnd())
    } catch (e) {
        console.log(e)
        yield put(actions.promoLoadingEnd())
    }
}

function* updatePromotionsList(promotion) {
    const promoList = yield select(util.getPromotionsList)
    const updatedPromoList = promoList.map(promo => {
        let updatedPromo = { ...promo }
        if (promo._id === promotion._id) {
            updatedPromo = promotion
        }
        return updatedPromo
    })
    yield put(actions.updateInlineEditSuccess(updatedPromoList))
}

export default function* watchPromotions() {
    yield all([
        takeEvery(actions.actionTypes.SAGA_CREATE_PROMO, createPromoSaga),
        takeEvery(actions.actionTypes.SAGA_FETCH_PROMOS, fetchPromoList),
        takeEvery(actions.actionTypes.SAGA_DELETE_PROMO, deletePromoById),
        takeEvery(actions.actionTypes.CLEAR_PROMO_ALERT, clearAlert),
        takeEvery(actions.actionTypes.SAGA_UPDATE_PROMO_MARKETING, updateMarketing),
        takeEvery(actions.actionTypes.SAGA_UPDATE_PROMO_NAME, updatePromoName),
        takeEvery(actions.actionTypes.SAGA_FETCH_PROMO, fetchPromoById),
        takeEvery(actions.actionTypes.SAGA_BULK_DELETE, deletePromos),
        takeEvery(actions.actionTypes.SAGA_UPDATE_INLINE_EDIT, updateInlineEdit),
        takeEvery(actions.actionTypes.SAGA_FETCH_CATEGORIES_LIST, fetchCategoriesList),
        takeEvery(actions.actionTypes.SAGA_FETCH_PRIORITIZE_PROMOS, fetchPrioritizePromos),
        takeEvery(actions.actionTypes.SAGA_PUBLISH_CONTENT, publishContent),
        takeEvery(actions.actionTypes.SAGA_UPDATE_PRIORITIZED_PROMOS, updatePrioritizedPromos),
    ])
}
