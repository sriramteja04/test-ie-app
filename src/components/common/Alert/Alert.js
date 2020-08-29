import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index'
import { util } from '../../../util'

const Alert = ({
    show = true,
    closeAlertHandler,
    description,
    title,
    type,
    variant = 'outlined',
    renderIcon = util.ReportProblemIcon,
    className,
}) => {
    if (!show) {
        return null
    }

    return (
        <div className={util.joinClasses('alert', type, variant, className)}>
            <Icon
                className={'alert__icon ml-4'}
                color={variant !== 'fill' ? type : null}
                size={'sm'}
                renderIcon={renderIcon}
            />
            <div className={'alert__content'}>
                <p className={'alert__content--title'}>{title}</p>
                {description && <p className={'alert__content--description'}>{description}</p>}
            </div>
            {closeAlertHandler ? (
                <Icon
                    pointer={true}
                    className={'alert__close-icon mr-4'}
                    size={'sm'}
                    onClick={closeAlertHandler}
                    renderIcon={util.CloseIcon}
                />
            ) : null}
        </div>
    )
}

Alert.propTypes = {
    /* closeAlertHandler {CallableFunction} -> Callback to close alert. */
    closeAlertHandler: PropTypes.func,

    /* description {String} -> Alert detail description */
    description: PropTypes.string,

    /* title {String} -> Alert title */
    title: PropTypes.string,
    type: PropTypes.oneOf(['warning', 'danger', 'success']),
    variant: PropTypes.oneOf(['fill', 'outlined']),
}

export default memo(Alert)
