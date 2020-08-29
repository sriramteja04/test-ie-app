import React, { memo, useRef } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index'
import { util } from '../../../util'

/** This Component is responsible to render input text field
 *
 * @returns {*} Custom Input Component
 */
const InputField = ({ label, value, inputProps, size, error, className, ...rest }) => {
    const focusRef = useRef()
    const focusInput = () => focusRef.current.focus()

    /**
     *
     * @param position (start | end)
     * @returns {*} Icon Component
     */
    const renderInputProps = position =>
        inputProps && inputProps.hasOwnProperty(position) ? (
            <i className={`input__${position}`}>
                <Icon
                    onClick={focusInput}
                    size={'sm'}
                    display={'inline'}
                    renderIcon={inputProps[position]}
                />
            </i>
        ) : null

    const renderInputControl = () => (
        <>
            <input
                ref={focusRef}
                className={util.joinClasses('input__control', value && 'has-value')}
                value={value}
                autoComplete={'off'}
                {...rest}
            />
            <span className={'label'} onClick={focusInput}>
                {label}
            </span>
        </>
    )

    return (
        <div className={`input-container ${size} ${className}`} onClick={focusInput}>
            <div className={util.joinClasses('input', error && error.length && 'error')}>
                {renderInputProps('start')}
                {renderInputControl()}
                {renderInputProps('end')}
            </div>
            {error && error.length > 0 && <p className={'input-container__error-label'}>{error}</p>}
        </div>
    )
}

InputField.propTypes = {
    /** @param label {String} -> label that represents the Input Field component */
    label: PropTypes.string,

    /** @param value {*} -> value prop for input element */
    value: PropTypes.any,

    /** @param inputProps {Object} -> (start | end) object which positions the icon inside input component */
    inputProps: PropTypes.shape({
        start: PropTypes.func,
        end: PropTypes.func,
    }),

    /** @param size {String} -> ( 'xs'| 'xss' | sm | 'md' | 'lg' | 'xl' ) different sizes */
    size: PropTypes.oneOf(['md', 'lg', 'xl', 'sm', 'xs', 'xxs']),

    /** @param error {String} -> */
    error: PropTypes.string,

    /** @param className {String} -> overrides the default input component styles */
    className: PropTypes.string,
    rest: PropTypes.object,
}

export default memo(InputField)
