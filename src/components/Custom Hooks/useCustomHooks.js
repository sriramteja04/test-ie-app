import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { Icon } from '../common'
import { util } from '../../util'

export const useToggle = (initial = false) => {
    const [state, setState] = useState(initial)
    return [
        state,
        useCallback(
            () => setState(!state),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [state]
        ),
    ]
}

export const usePortal = () => {
    const rootElemRef = React.useRef(document.createElement('div'))
    useEffect(() => {
        const parentElem = document.body
        const node = rootElemRef.current
        parentElem.appendChild(node)
        return () => node.remove()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return rootElemRef.current
}

export const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export const useIconHandler = (icon, rest) => {
    const { size = 'xs', pointer = true, color = null, ...handlers } = rest || {}
    return <Icon size={size} pointer={pointer} color={color} {...handlers} renderIcon={icon} />
}

export const GetCounterComp = (name, clickHandler) => [
    useIconHandler(util.ArrowDropUpIcon, {
        size: 'sm',
        onClick: useCallback(
            () => clickHandler(name, 'arrowUp'),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        ),
    }),
    useIconHandler(util.ArrowDropDownIcon, {
        size: 'sm',
        onClick: useCallback(
            () => clickHandler(name, 'arrowDown'),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        ),
    }),
]

export const useResize = myRef => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (!myRef.current) {
            return null
        }
        handleResize()
        window.addEventListener('resize', _throttleEffect)

        return () => window.removeEventListener('resize', _throttleEffect)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myRef])

    let throttleSetTableWidths = null

    const _throttleEffect = () => {
        clearTimeout(throttleSetTableWidths)
        throttleSetTableWidths = setTimeout(() => handleResize(), 300)
    }

    const handleResize = () => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
    }

    return { width, height }
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(handler)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, delay])
    return debouncedValue
}

export const useMeasure = deps => {
    const [rect, setRect] = useState(null)
    const elmRef = useRef()

    useLayoutEffect(() => {
        setRect(elmRef.current.getBoundingClientRect())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return [rect, elmRef]
}

export const useLayoutThrottle = (func, deps, delay) => {
    let throttleSetTableWidths = null

    useLayoutEffect(() => {
        func()
        window.addEventListener('resize', _throttleEffect)
        return () => window.removeEventListener('resize', _throttleEffect)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    const _throttleEffect = () => {
        clearTimeout(throttleSetTableWidths)
        throttleSetTableWidths = setTimeout(() => func(), delay)
    }
}
