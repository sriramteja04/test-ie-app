import React, { memo } from 'react'
import { constants } from '../../../constants'
import { SelectInput } from '../index'

const Yearly = ({ MonthOptionHandler, month }) => {
    return (
        <SelectInput
            options={constants.monthList}
            onChange={MonthOptionHandler}
            value={month}
            name={'yearly'}
            className={'repeat-setting__yearly'}
        />
    )
}

export default memo(Yearly, (prevProps, nextProps) => !(prevProps.month !== nextProps.month))
