import React, { memo, useState, useEffect } from 'react'

import { util } from '../../../util'
import { SelectInput, Icon } from '../index'

const TableActionCell = ({
    _id,
    align,
    className,
    editType,
    inlineEdit,
    inputProps,
    label,
    onClick,
    pointer,
    size,
    toggleEdit,
    toggleEditHandler,
    value,
    saveEditHandler,
    ...rest
}) => {
    const [message, setMessage] = useState(editType === 'input' && value)
    const [selectOption, setSelectedOption] = useState(editType === 'select' && value)

    useEffect(() => {
        setMessage(value)
    }, [value])

    const cancelActionHandler = () => {
        setMessage(value)
        toggleEditHandler()
    }

    const saveActionHandler = () => {
        toggleEditHandler()
        saveEditHandler(_id, editType === 'input' ? message : selectOption)
    }

    const endClickHandler = e => {
        e.stopPropagation()
        return toggleEditHandler ? toggleEditHandler({ _id, editType }) : onClick()
    }

    const renderEndInputProps = () => (
        <span className={'flex-cell__edit-icon'}>
            <Icon
                color={inputProps.hasOwnProperty('color') && inputProps['color']}
                pointer={inputProps.hasOwnProperty('pointer') && inputProps['pointer']}
                size={inputProps.hasOwnProperty('size') && inputProps['size']}
                display={'inline'}
                className={inputProps.hasOwnProperty('className') && inputProps['className']}
                onClick={endClickHandler}
                renderIcon={inputProps['end'] || inputProps[label]}
            />
        </span>
    )

    const renderEditActions = () => (
        <span className={'flex-cell__actions ml-3'}>
            <Icon
                size={'xs'}
                color={'color-check'}
                pointer={true}
                onClick={saveActionHandler}
                renderIcon={util.CheckCircleIcon}
            />
            <span className={'verticle-line'} />
            <Icon
                onClick={cancelActionHandler}
                size={'xs'}
                color={'danger'}
                pointer={true}
                renderIcon={util.CancelIcon}
            />
        </span>
    )

    const renderInputFields = () =>
        toggleEdit && editType === 'input' ? (
            <input
                className={'flex-cell__inline-input'}
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
        ) : toggleEdit && editType === 'select' ? (
            <span>
                <SelectInput
                    value={selectOption}
                    onChange={value => setSelectedOption(value)}
                    name={'published'}
                    readOnly={true}
                    options={selectOption === 'published' ? ['unpublished'] : ['published']}
                    className={'inline-select'}
                />
            </span>
        ) : null

    return (
        <td
            className={util.joinClasses(
                'table-row__cell',
                pointer && 'pointer',
                align,
                size,
                className,
                inlineEdit && (editType === 'input' || editType === 'select') && 'cell-inplaceEdit'
            )}
            onClick={!inlineEdit || !toggleEdit ? onClick : undefined}
            {...rest}
        >
            <span className={'flex-cell'}>
                {value && !toggleEdit ? (
                    <span className={util.joinClasses('flex-cell__content')}>{value}</span>
                ) : (
                    renderInputFields()
                )}
                {inlineEdit && !toggleEdit && inputProps.hasOwnProperty('end')
                    ? renderEndInputProps()
                    : toggleEdit && renderEditActions()}
            </span>
        </td>
    )
}

const shouldComponentUpdate = (prevProps, nextProps) =>
    !(
        prevProps.inlineEdit !== nextProps.inlineEdit ||
        prevProps.toggleEdit !== nextProps.toggleEdit ||
        prevProps.value !== nextProps.value
    )

export default memo(TableActionCell, shouldComponentUpdate)
