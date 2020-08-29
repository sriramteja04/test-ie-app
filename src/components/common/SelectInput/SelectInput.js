import React, { memo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Icon } from '../index'

const SelectInput = ({
    className,
    color,
    defaultValue,
    error,
    inputType,
    label,
    options,
    margin,
    name,
    onChange,
    placeholder,
    readOnly = true,
    inputProps,
    required,
    size,
    value,
    onBlur,
}) => {
    const [showOptions, setShowOptions] = useState(false)
    const container = useRef(null)

    const inputRef = useRef()
    const focusRef = () => inputRef.current.focus()

    useEffect(() => {
        document.addEventListener('mousedown', outerClickHandler, true)
        return () => document.removeEventListener('mousedown', outerClickHandler, true)
    }, [showOptions])

    const outerClickHandler = e => {
        if (container.current && !container.current.contains(e.target)) {
            setShowOptions(false)
        }
    }

    const showOptionHandler = () => setShowOptions(!showOptions)

    const optionHandler = value => {
        setShowOptions(false)
        onChange(value, name)
    }

    const onTextEdit = value => {
        setShowOptions(false)
        onChange(value, name)
    }

    const renderInputProps = placement => {
        if (!inputProps || !inputProps[placement]) {
            return (
                <Icon
                    className={'select-container__drop-icon'}
                    size={'md'}
                    renderIcon={showOptions ? util.ArrowDropUpIcon : util.ArrowDropDownIcon}
                />
            )
        }

        return (
            <div className={'select-container__icons'}>
                {React.Children.toArray(inputProps[placement]()).map(child =>
                    React.cloneElement(child, {
                        onClick: () =>
                            !child.props.onClick ? showOptionHandler() : child.props.onClick(),
                    })
                )}
            </div>
        )
    }

    const renderSelectOptions = () =>
        showOptions && (
            <ul className={`select-input__dropdown ${size}`}>
                {options.map(value => (
                    <li
                        className={'option'}
                        key={value}
                        onClick={() => optionHandler(value)}
                        value={value}
                    >
                        {value}
                    </li>
                ))}
            </ul>
        )

    const selectInputHandler = e => (readOnly ? showOptionHandler() : e.stopPropagation())

    const inputClassName = util.joinClasses(
        'select-textfield__control',
        readOnly && 'read-only',
        (showOptions || value) && 'has-value'
    )

    const renderSelectInputValue = () => (
        <div className={'select-textfield'}>
            <input
                ref={inputRef}
                value={value || defaultValue}
                required={required}
                type={inputType}
                placeholder={placeholder}
                name={name}
                autoComplete={'off'}
                className={inputClassName}
                readOnly={readOnly}
                onClick={selectInputHandler}
                onChange={e => onTextEdit(e.target.value)}
                onBlur={onBlur}
            />
            <span className={'input-label'} onClick={focusRef}>
                {label}
            </span>
        </div>
    )

    const selectContainerClass = util.joinClasses(
        'select-container',
        showOptions && 'show-options',
        'outline',
        !readOnly && 'edit',
        color
    )

    const selectClickHandler = () => (readOnly ? showOptionHandler() : undefined)

    return (
        <div className={util.joinClasses('select-input', margin, size, className)} ref={container}>
            <div className={selectContainerClass} onClick={selectClickHandler}>
                {inputProps && inputProps['start'] && renderInputProps('start')}
                {renderSelectInputValue()}
                {renderInputProps('end')}
            </div>

            {renderSelectOptions()}
            {error && error.length > 0 && (
                <div className={util.joinClasses('select-input__error', size)}>{error}</div>
            )}
        </div>
    )
}

SelectInput.propTypes = {
    /** @param className {String} -> className which can override the default design behavior */
    className: PropTypes.string,

    /** @param color {String} -> */
    color: PropTypes.string,

    /** @param defaultValue {*} -> default value that needs to be selected from options */
    defaultValue: PropTypes.any,

    /** @param error {String} -> Error that renders that bottom of the select input component */
    error: PropTypes.string,

    /** @param inputType {String} -> type of the input */
    inputType: PropTypes.string,

    /** @param label {String} -> label that represents the select input */
    label: PropTypes.string,

    /** @param options {Array} -> options */
    options: PropTypes.array,

    /** @param margin {String} -> margin of the selected input component */
    margin: PropTypes.string,

    /** @param name {String} -> name attr for the selected input, it helps to uniquely identify the select input */
    name: PropTypes.string,

    /** @param onChange {EventListener} -> on change event handler that receives value and name of select input component (name comes in handy when you are trying to update the state) */
    onChange: PropTypes.func,

    /** @param placeholder {String} -> placeholder for the select input */
    placeholder: PropTypes.string,

    /** @param readOnly {Boolean} -> if true then you can't edit input or */
    readOnly: PropTypes.bool,

    /** @param inputProps {Object} -> inputProps contains either start or end or both, each key value is a callback which return an JSX (Icons) */
    inputProps: PropTypes.shape({
        start: PropTypes.func,
        end: PropTypes.func,
    }),

    /** @param required {Boolean} -> */
    required: PropTypes.bool,

    /** @param size {String} -> size of the select input {xxs, xs, sm, md, lg, xl, xxl} please refer selectInput.scss */
    size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),

    /** @param value {*} -> value of the selected option from the list of options */
    value: PropTypes.any,

    /** @param onBlur {EventListener} -> */
    onBlur: PropTypes.func,
}

export default memo(SelectInput)
