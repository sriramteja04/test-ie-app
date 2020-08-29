import React, { useState, memo, useCallback, useEffect } from 'react'
import { util } from '../../../util'

const POSITION = { x: 0, y: 0 }

const Draggable = ({ children, onDrag, onDragEnd, id }) => {
    const [state, setState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION,
    })

    const handleMouseDown = useCallback(e => {
        const { clientX, clientY } = e
        setState(state => ({
            ...state,
            isDragging: true,
            origin: { x: clientX, y: clientY },
        }))
    }, [])

    const handleMouseMove = useCallback(
        ({ clientX, clientY }) => {
            const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y }

            setState(state => ({
                ...state,
                translation,
            }))
            onDrag({ translation, id })
        },
        [state.origin, onDrag, id]
    )

    const handleMouseUp = useCallback(() => {
        setState(state => ({
            ...state,
            isDragging: false,
        }))
        onDragEnd()
    }, [onDragEnd])

    useEffect(() => {
        if (state.isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)

            setState(state => ({ ...state, translation: POSITION }))
        }
    }, [state.isDragging, handleMouseMove, handleMouseUp])

    return (
        <div
            style={{ transform: `translate(${state.translation.x}px, ${state.translation.y}px)` }}
            className={util.joinClasses(state.isDragging ? 'dragging' : 'fixed')}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    )
}

export default memo(Draggable)
