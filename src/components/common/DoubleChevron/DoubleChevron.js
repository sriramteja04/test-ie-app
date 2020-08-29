import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index'
import { util } from '../../../util'

const DoubleChevron = ({
    iconSize,
    backwardClickHandler,
    forwardClickHandler,
    forwardDisabled = false,
    backwardDisabled = false,
    renderContent,
    display = 'inline',
    className,
    gap,
}) => {
    const chevronClass = util.joinClasses('double-chevron', gap && `${gap}-gap`, className)
    return (
        <div className={chevronClass}>
            <Icon
                display={display}
                className={'double-chevron__backward-icon'}
                size={iconSize}
                pointer={!backwardDisabled && true}
                onClick={backwardClickHandler}
                disabled={backwardDisabled}
                color={backwardDisabled ? 'disable' : null}
                renderIcon={util.ArrowBackIosIcon}
            />
            {renderContent ? (
                <div className={'double-chevron__content'}>{renderContent()}</div>
            ) : null}
            <Icon
                display={display}
                className={'double-chevron__forward-icon'}
                size={iconSize}
                pointer={!forwardDisabled && true}
                onClick={forwardClickHandler}
                disabled={forwardDisabled}
                color={forwardDisabled ? 'disable' : null}
                renderIcon={util.ArrowForwardIosIcon}
            />
        </div>
    )
}

DoubleChevron.propTypes = {
    iconSize: PropTypes.oneOf(['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
    backwardClickHandler: PropTypes.func,
    forwardClickHandler: PropTypes.func,
    forwardDisabled: PropTypes.bool,
    backwardDisabled: PropTypes.bool,
    renderContent: PropTypes.func,
    display: PropTypes.oneOf(['inline', 'block', 'inline-block']),
    className: PropTypes.string,
}

export default memo(DoubleChevron)
