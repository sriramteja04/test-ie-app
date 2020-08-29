import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Icon } from '../index'

const Button = ({
    color,
    disabled,
    variant,
    size,
    margin,
    inputProps,
    children,
    className,
    ...rest
}) => {
    const btnClass = util.joinClasses(
        'btn',
        color && `btn-${color}`,
        size,
        margin,
        disabled && 'btn-disabled',
        !children && 'no-children',
        inputProps && 'icons',
        variant,
        className
    )
    return (
        <button className={btnClass} disabled={disabled} {...rest}>
            {inputProps && inputProps.hasOwnProperty('start') && (
                <span className={'btn__start'}>
                    <Icon
                        className={util.joinClasses(children && 'mr-2')}
                        size={'sm'}
                        renderIcon={inputProps['start']}
                    />
                </span>
            )}
            {children && <span>{children}</span>}
            {inputProps && inputProps.hasOwnProperty('end') && (
                <span className={'btn__end'}>
                    <Icon size={'sm'} renderIcon={inputProps['end']} />
                </span>
            )}
        </button>
    )
}

Button.propTypes = {
    /* color {String} -> describes the color of the button */
    color: PropTypes.oneOf(['transparent', 'dark', 'warning', 'light', 'disabled']),

    /* disabled {Boolean} -> states the disable property of a button */
    disabled: PropTypes.bool,

    /* variant {String} -> (basic | null) */
    variant: PropTypes.string,

    /* size {String} -> describes the size of the  button. */
    size: PropTypes.oneOf(['md', 'lg', 'xl', 'xxl']),

    /* margin {String} -> look into config.scss for more info on margin configurations */
    margin: PropTypes.string,

    /* inputProps {Object} -> should consist either start or end to render icons fields. */
    inputProps: PropTypes.shape({
        start: PropTypes.func,
        end: PropTypes.func,
    }),

    /* children {JSX} -> JSX wrapped in between button component */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /* className {String} -> overrides the default class property */
    className: PropTypes.string,
}

export default memo(Button)
