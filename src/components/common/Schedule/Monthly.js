import React, { memo, useCallback } from 'react'

import { Radio, SelectInput } from '../index'
import { constants } from '../../../constants'
import { GetCounterComp } from '../../Custom Hooks/useCustomHooks'

const Monthly = ({
    name,
    monthlyCounter,
    week,
    day,
    monthlyOption,
    radioHandler,
    counterInputHandler,
    counterChangeHandler,
    optionChangeHandler,
    counterBlurHandler,
}) => {
    const _renderEndProps = useCallback(
        () => GetCounterComp(name, counterChangeHandler),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <Radio
                name={'day'}
                className={'radio ml-0'}
                label={'Day'}
                id={'monthly_day'}
                value={monthlyOption}
                onChange={radioHandler}
                checked={monthlyOption === 'day'}
            />
            <SelectInput
                renderEndProps={_renderEndProps}
                onChange={counterInputHandler}
                value={monthlyCounter}
                required
                name={name}
                inputType={'number'}
                size={'md'}
                min={'1'}
                className={'day_counter'}
                readOnly={false}
                onBlur={counterBlurHandler}
            />
            <Radio
                className={'radio ml-0'}
                id={'monthly_dropdown'}
                value={monthlyOption}
                onChange={radioHandler}
                checked={monthlyOption === 'weekly'}
                name={'weekly'}
            />
            <SelectInput
                options={constants.ocurrenceList}
                onChange={optionChangeHandler}
                value={week}
                size={'xs'}
                name={'week'}
            />
            <SelectInput
                options={constants.dayList.map(day => day.value)}
                onChange={optionChangeHandler}
                value={day}
                size={'xs'}
                name={'day'}
            />
        </>
    )
}

export default memo(
    Monthly,
    (prevProps, nextProps) =>
        !(
            prevProps.monthlyOption !== nextProps.monthlyOption ||
            prevProps.monthlyCounter !== nextProps.monthlyCounter ||
            prevProps.day !== nextProps.day ||
            prevProps.week !== nextProps.week
        )
)
