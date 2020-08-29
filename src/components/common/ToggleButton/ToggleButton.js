import React, { memo } from 'react'
import { util } from '../../../util'
import Proptypes from 'prop-types'
/**
 *
 * @param label {String} -> The label(text) that displays beside toggle button
 * @param className {String} -> overrides the default class property
 * @param rest -> consists of all the other remaining event handlers, attrs, etc...
 * @returns {*}
 * @constructor
 */
const ToggleButton = ({ label, className, ...rest }) => {
    return (
        <label className={util.joinClasses('switch', className)}>
            <input className={'slider round'} type={'checkbox'} {...rest} />
            <span className={'slider round'}>
                <span className={'switch text'}>{label}</span>
            </span>
        </label>
    )
}

ToggleButton.propTypes = {
    label: Proptypes.string,
    className: Proptypes.string,
}

export default memo(ToggleButton)
