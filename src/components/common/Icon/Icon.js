import React, { memo } from 'react'
import { util } from '../../../util'
import PropTypes from 'prop-types'

const Icon = ({
    className,
    color,
    disabled = false,
    display,
    margin,
    onClick,
    pointer,
    renderIcon,
    size,
    ...rest
}) => {
    const iconClass = util.joinClasses(
        'svg-icon',
        size,
        pointer && 'pointer',
        display,
        margin,
        className,
        color
    )
    return (
        <div className={iconClass} onClick={!disabled ? onClick : undefined} {...rest}>
            {/* renderIcon will return SVG component */}
            {renderIcon && renderIcon()}
        </div>
    )
}

Icon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['disable', 'danger', 'color-check', 'success', 'warning']),
    disabled: PropTypes.bool,
    display: PropTypes.oneOf(['inline', 'block', 'inline-block']),
    margin: PropTypes.string,
    onClick: PropTypes.oneOfType([PropTypes.func]),
    pointer: PropTypes.bool,
    renderIcon: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
}

export default memo(Icon)
