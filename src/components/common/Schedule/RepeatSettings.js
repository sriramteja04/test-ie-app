import React, { memo, useCallback } from 'react'

import { SelectInput } from '../index'
import { constants } from '../../../constants'
import { GetCounterComp } from '../../Custom Hooks/useCustomHooks'

const RepeatSettings = ({
    repeatOption,
    RepeatOptionHandler,
    repeatError,
    counterChangeHandler,
    repeatCounter,
    InputCounterHandler,
    counterBlurHandler,
    name,
}) => {
    const repeatEveryLabelHandler = repeatOption => {
        switch (repeatOption) {
            case 'Daily':
                return 'Day(s)'
            // case 'Weekly':
            //     return 'Week(s)'
            // case 'Monthly':
            //     return 'Month(s)'
            // case 'Yearly':
            //     return 'Year(s)'
            default:
                return ''
        }
    }

    const _renderEndProps = useCallback(
        () => GetCounterComp('repeat', counterChangeHandler),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <SelectInput
                label={'Repeat'}
                options={constants.repeatList}
                onChange={RepeatOptionHandler}
                value={repeatOption}
                error={repeatError}
                name={'repeat'} //Please don't change the name. because it helps us to updated state.
            />
            {repeatOption !== 'Does Not Repeat' && (
                <>
                    <SelectInput
                        name={'repeat'}
                        label={'Repeat Every'}
                        inputType={'number'}
                        min={'1'}
                        value={repeatCounter}
                        onChange={InputCounterHandler}
                        inputProps={{ end: _renderEndProps }}
                        required
                        readOnly={false}
                        onBlur={counterBlurHandler}
                    />
                    <label className={'repeat-every-label'}>
                        {repeatEveryLabelHandler(repeatOption)}
                    </label>
                </>
            )}
        </>
    )
}

export default memo(
    RepeatSettings,
    (prevProps, nextProps) =>
        !(
            prevProps.repeatOption !== nextProps.repeatOption ||
            prevProps.repeatCounter !== nextProps.repeatCounter ||
            prevProps.repeatError !== nextProps.repeatError
        )
)
