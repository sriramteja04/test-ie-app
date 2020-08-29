import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import Icon from '../Icon'

const TableIconCell = ({
    position = 'start',
    inputProps,
    value,
    label,
    align,
    className,
    pointer,
    onClick,
    ...rest
}) => {
    const isSuccessColor = label => {
        return !label || typeof label !== 'string'
            ? false
            : ['complete', 'sent', 'Sent', 'published', 'approved'].findIndex(
                  el => el.toLowerCase() === label.toLowerCase()
              ) >= 0
    }

    const isErrorColor = label => label && label.includes('incomplete')

    const getColor = value => {
        if (isSuccessColor(value)) {
            return 'success'
        } else if (isErrorColor(value)) {
            return 'warning'
        } else {
            return inputProps.hasOwnProperty('color') ? inputProps['color'] : null
        }
    }

    const renderInputProps = pos => {
        return position === pos && inputProps ? (
            <Icon
                color={getColor(value)}
                size={'xs'}
                display={'inline'}
                className={'mr-2'}
                renderIcon={inputProps[label]}
                pointer={inputProps['pointer'] || false}
            />
        ) : null
    }

    return (
        <td
            className={util.joinClasses('table-row__cell', pointer && 'pointer', align, className)}
            onClick={onClick}
            {...rest}
        >
            <span className={'flex-cell'}>
                {renderInputProps('start')}
                <span className={'flex-cell__content'}>{value}</span>
                {renderInputProps('end')}
            </span>
        </td>
    )
}

TableIconCell.propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    inputProps: PropTypes.shape({
        LABEL_ICON_NAME: PropTypes.func,
        color: PropTypes.string,
        pointer: PropTypes.bool,
    }),
    value: PropTypes.any,
    label: PropTypes.string,
    align: PropTypes.string,
    className: PropTypes.string,
    pointer: PropTypes.bool,
    onClick: PropTypes.func,
}

const shouldComponentRender = (prevProps, nextProps) =>
    !(
        prevProps.value !== nextProps.value ||
        prevProps.label !== nextProps.label ||
        prevProps.onClick !== nextProps.onClick
    )

export default memo(TableIconCell, shouldComponentRender)
