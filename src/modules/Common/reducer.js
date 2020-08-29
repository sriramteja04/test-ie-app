import { actionTypes } from './actions'
import { util } from '../../util'

const initialState = {
    common_error: '',
}

export default (state = initialState, action) => {
    const { type, payload } = action
    const { shallowHelper } = util

    switch (type) {
        case actionTypes.SET_COMMON_ERROR: {
            return shallowHelper(state, { common_error: payload })
        }
        case actionTypes.CLEAR_COMMON_ERROR: {
            return shallowHelper(state, { common_error: '' })
        }

        default:
            return state
    }
}
