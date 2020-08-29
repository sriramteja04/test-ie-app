import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ label, checked, onChange, margin, name, display, id }) => {
    return (
        <div className={`checkbox ${margin} ${display}`}>
            <label className={'checkbox__container'}>
                <input
                    className={'checkbox-input'}
                    name={name}
                    type={'checkbox'}
                    checked={checked}
                    onChange={onChange}
                    id={id}
                />
                <span className={'checkmark'} />
                <span className={'checkbox-label'}>{label}</span>
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    /** @param label {String} text which sits next to checkbox input */
    label: PropTypes.string,

    /** @param checked {Boolean} checked if true else unchecked false value */
    checked: PropTypes.bool,

    /** @param onChange {EventListener} event listener which to handle check input */
    onChange: PropTypes.func,

    /** @param margin {String} margin from the parent or adjacent child react element please check styles config file for different margins */
    margin: PropTypes.string,

    /** @param name {String} input name attribute */
    name: PropTypes.string,

    /** @param controls the css display property */
    display: PropTypes.oneOf(['block']),
}

export default memo(Checkbox)
