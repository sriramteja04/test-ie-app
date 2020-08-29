import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'

/**
 *
 * @param label
 * @param className
 * @param rest
 * @returns {*}
 * @constructor
 */
const TextArea = ({ label, className, ...rest }) => {
    return (
        <div className={util.joinClasses('text-area', className)}>
            <textarea className={'text-area__input'} {...rest} />
            <label className={'text-area__label'}>{label}</label>
        </div>
    )
}

TextArea.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    rest: PropTypes.object,
}

export default memo(TextArea)
