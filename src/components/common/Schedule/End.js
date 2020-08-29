import React, { memo, useCallback } from 'react'

import { DatePicker, SelectInput } from '../index'
import { constants } from '../../../constants'
import { GetCounterComp } from '../../Custom Hooks/useCustomHooks'

const End = ({
    EndOptionHandler,
    endValue,
    untilDateHandler,
    untilDate,
    endCounter,
    InputCounterHandler,
    counterChangeHandler,
}) => {
    const _renderEndProps = useCallback(
        () => GetCounterComp('end', counterChangeHandler),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <div className={'repeat-setting__end'}>
            <SelectInput
                size={'sm'}
                label={'End'}
                options={constants.endList}
                onChange={EndOptionHandler}
                value={endValue}
                name={'end'} //Please don't change the name. because it helps us to updated state.
            />
            {endValue === 'Until' && (
                <DatePicker
                    minDate={new Date()}
                    handleDateChange={untilDateHandler}
                    selectedDate={untilDate}
                    name={'untilDate'}
                    size={'sm'}
                />
            )}
            {endValue === 'Count' && (
                <SelectInput
                    size={'md'}
                    inputProps={{ end: _renderEndProps }}
                    inputType={'number'}
                    value={endCounter}
                    onChange={InputCounterHandler}
                    readOnly={false}
                    required
                    name={'end'} //Please don't change the name. because it helps us to updated state.
                    min={'1'}
                />
            )}
        </div>
    )
}

export default memo(
    End,
    (prevProps, nextProps) =>
        !(
            prevProps.endCounter !== nextProps.endCounter ||
            prevProps.untilDate !== nextProps.untilDate ||
            prevProps.endValue !== nextProps.endValue
        )
)
