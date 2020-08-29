import React, { useReducer, memo, useEffect, useRef } from 'react'

export const RangeSlider = memo(() => {
    const sliderRef = useRef()
    const minValueRef = useRef()
    const minValueDragRef = useRef()
    const maxValueRef = useRef()
    const maxValueDragRef = useRef()

    const initialState = {
        sliderWidth: 0,
        offsetSliderWidht: 0,
        min: 0,
        max: 500000,
        minValueBetween: 50000,

        currentMin: 100000,
        inputMin: 100000,

        currentMax: 350000,
        inputMax: 350000,
    }

    const stateTypes = {
        CHANGE_STATE: 'CHANGE_STATE',
    }

    const reducer = (state, action) => {
        const { type, payload } = action
        switch (type) {
            case stateTypes.CHANGE_STATE:
                return { ...state, ...payload }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const { min, max, currentMin, currentMax } = state

    useEffect(() => {
        const { currentMin, currentMax, max } = state
        minValueRef.current.style.width = (currentMin * 100) / max + '%'
        maxValueRef.current.style.width = (currentMax * 100) / max + '%'

        dispatch({
            type: stateTypes.CHANGE_STATE,
            payload: {
                sliderWidth: sliderRef.current.offsetWidth,
                offsetSliderWidht: sliderRef.current.offsetLeft,
            },
        })
    }, [])

    const changeMinValue = e => {
        e.preventDefault()

        document.addEventListener('mousemove', onMouseMoveMin)
        document.addEventListener('mouseup', onMouseUpMin)
    }

    const onMouseMoveMin = e => {
        const { min, max, currentMax, minValueBetween, sliderWidth, offsetSliderWidht } = state

        const dragedWidht = e.clientX - offsetSliderWidht
        const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth
        const currentMin = Math.abs(parseInt((max * dragedWidhtInPercent) / 100))

        if (currentMin >= min && currentMin <= currentMax - minValueBetween) {
            minValueRef.current.style.width = dragedWidhtInPercent + '%'
            minValueRef.current.dataset.content = intToString(currentMin)

            dispatch({
                type: stateTypes.CHANGE_STATE,
                payload: {
                    currentMin: currentMin,
                    inputMin: currentMin,
                },
            })
        }
    }

    const onMouseUpMin = () => {
        document.removeEventListener('mouseup', () => {})
        document.removeEventListener('mousemove', onMouseMoveMin)
    }

    const changeMaxValue = e => {
        e.preventDefault()
        document.addEventListener('mousemove', onMouseMoveMax)
        document.addEventListener('mouseup', onMouseUpMax)
    }

    const onMouseMoveMax = e => {
        const { max, currentMin, minValueBetween, sliderWidth, offsetSliderWidht } = state
        const maxValueThumb = maxValueRef
        const dragedWidht = e.clientX - offsetSliderWidht - 500
        const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth
        const currentMax = Math.abs(parseInt((max * dragedWidhtInPercent) / 100))

        // console.log("SliderWidth", sliderWidth);
        // console.log("offsetSliderWidht", offsetSliderWidht);
        // console.log("e.ClientX", e.clientX);
        // console.log("maxValueThumb------->", maxValueThumb);
        // console.log("dragedWidht--------->", dragedWidht, offsetSliderWidht);
        // console.log("dragedWidhtInPercent------->", dragedWidhtInPercent);
        // console.log("currentMax-------->", currentMax);

        // console.log(currentMax >= currentMin + minValueBetween && currentMax <= max)

        if (currentMax >= currentMin + minValueBetween && currentMax <= max) {
            maxValueThumb.current.style.width = dragedWidhtInPercent + '%'
            maxValueThumb.current.dataset.content = intToString(currentMax)
            dispatch({
                type: stateTypes.CHANGE_STATE,
                payload: {
                    currentMax: currentMax,
                    inputMax: currentMax,
                },
            })
        }
    }

    const onMouseUpMax = () => {
        document.removeEventListener('mouseup', () => {})
        document.removeEventListener('mousemove', onMouseMoveMax)
    }

    function intToString(value) {
        var suffixes = ['', 'k', 'm', 'b', 't']
        var suffixNum = Math.floor(('' + value).length / 4)
        var shortValue = parseFloat(
            (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
        )
        if (shortValue % 1 != 0) {
            shortValue = shortValue.toFixed(1)
        }
        return shortValue + suffixes[suffixNum]
    }

    return (
        <div className="range-slider">
            <div ref={sliderRef} className="slider">
                <div ref={minValueRef} id="min" data-content={intToString(currentMin)}>
                    <div ref={minValueDragRef} id="min-drag" onMouseDown={changeMinValue} />
                </div>

                <div ref={maxValueRef} id="max" data-content={intToString(currentMax)}>
                    <div ref={maxValueDragRef} id="max-drag" onMouseDown={changeMaxValue} />
                </div>
                <div className="values">
                    <div>{intToString(min)}</div>
                    <div>{intToString(max)}</div>
                </div>
            </div>
        </div>
    )
})
