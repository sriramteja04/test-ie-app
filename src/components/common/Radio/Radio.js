import React, { memo } from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param id
 * @param onChange
 * @param value
 * @param checked
 * @param label
 * @param name
 * @returns {*}
 * @constructor
 */
const Radio = ({ id, onChange, checked, label, name }) => {
    return (
        <div className={'radioButton'}>
            <input id={id} onChange={onChange} type={'radio'} checked={checked} name={name} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

Radio.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
}

export default memo(Radio)
