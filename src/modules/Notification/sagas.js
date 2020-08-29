// import { takeEvery, all} from 'redux-saga/effects'
// import { actionTypes } from './actions'
// import { notificationLoadingStart, notificationLoadingEnd } from './actions'

// function* addNotification(action) {
//     try {
//         console.log(action)
//         // yield call(rsf.firestore.addDocument, 'notifications', {
//         //     title: action.payload.title,
//         //     message: action.payload.message,
//         //     total_sent_count: action.payload.total_sent_count,
//         //     startDate: action.payload.startDate,
//         //     createdDate: action.payload.createdDate,
//         //     published: action.payload.published,
//         //     status: action.payload.status,
//         // })
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// function* getNotification(action) {
//     try {
//         // yield put(notificationLoadingStart())
//         // const response = yield call(rsf.firestore.getCollection, 'notifications')
//         // const results = []
//         // response.forEach(promo => {
//         //     const data = promo.data()
//         //     const id = promo.id
//         //     data['id'] = id
//         //     results.push(data)
//         // })
//         // yield put({
//         //     type: actionTypes.GET_NOTIFICATION_SUCCESS,
//         //     payload: results,
//         // })
//     } catch (e) {
//         console.log(e)
//         // yield put(notificationLoadingEnd())
//     }
// }
//
// function* deleteNotification(action) {
//     try {
//         // yield action.payload.map(promo => {
//         //     call(rsf.firestore.deleteDocument, `notifications/${promo.id}`)
//         // })
//         // yield put({
//         //     type: actionTypes.DISPLAY_DELETE_CONFIRMATION,
//         //     payload: true,
//         // })
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// function* clearAlert(action) {
//     // const delay = time => new Promise(resolve => setTimeout(resolve, time))
//     // yield call(delay, action.delay)
//     // yield put({ type: actionTypes.CLEAR_DISPLAY_CONFIRMATION })
// }

// export default function* watchNotifications() {
// yield all([
// takeEvery(actionTypes.ADD_NOTIFICATION, addNotification),
// takeEvery(actionTypes.GET_NOTIFICATION, getNotification),
// takeEvery(actionTypes.DELETE_NOTIFICATION, deleteNotification),
// takeEvery(actionTypes.CLEAR_ALERT, clearAlert),
// ])
// }
