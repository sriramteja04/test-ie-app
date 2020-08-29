import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index'
import { util } from '../../../util'

/**
 * @returns {*} Error message component
 */
const ErrorMessage = ({ messages, className, type }) => {
    const iconType = {}
    if (type === 'info') {
        iconType.size = 'xxs'
        iconType.icon = util.InfoOutlinedIcon
    } else if (type === 'warning') {
        iconType.size = 'sm'
        iconType.icon = util.ReportProblemOutlinedIcon
    }

    return (
        <div className={util.joinClasses('error-message', className, type)}>
            <Icon
                className={'error-message__icon'}
                size={iconType.size}
                color={type === 'warning' ? 'danger' : type}
                renderIcon={iconType.icon}
            />
            <div className={'error-message__text ml-2'}>
                {messages.map((msg, i) => (
                    <p key={i} className={util.joinClasses(type, 'mb-1')}>
                        {msg}
                    </p>
                ))}
            </div>
        </div>
    )
}

ErrorMessage.propTypes = {
    /** @param messages {String} Error message text */
    messages: PropTypes.array,

    /** @param className {String} class name which will overrides or adds extra styling for default  class name */
    className: PropTypes.string,

    /** @param type {String} type of error message {info, warning} */
    type: PropTypes.string,
}

export default memo(ErrorMessage)
