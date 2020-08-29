import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index'

/**
 *
 * @param size
 * @param margin
 * @param className
 * @param color
 * @param img
 * @param label
 * @returns {*}
 * @constructor
 */
const Indicator = ({ size, margin, className, color, img, label }) => {
    return (
        <div className={`indicator ${className}`}>
            <Icon size={size} margin={margin} color={color} renderIcon={img} />
            <p className={'indicator__label'}>{label}</p>
        </div>
    )
}

Indicator.propTypes = {
    size: PropTypes.oneOf(['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
    margin: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf(['disable', 'danger', 'color-check', 'success', 'warning']),
    img: PropTypes.func,
    label: PropTypes.string,
}

export default memo(Indicator)
