import React, { memo } from 'react'
import { Icon } from '../index'
import { util } from '../../../util'
import Proptypes from 'prop-types'

/**
 *
 * @param message {String} -> message to be displayed inside toast message
 * @returns {*}
 * @constructor
 */
const ToastMessage = ({ message }) => {
    return (
        <div className={'toast_msg'}>
            <Icon size={'xs'} className={'circle_icon'} renderIcon={util.CheckCircleIcon} />
            <p className={'ml-2 msg'}>{message}</p>
        </div>
    )
}

ToastMessage.prototypes = {
    message: Proptypes.String,
}

export default memo(ToastMessage)
