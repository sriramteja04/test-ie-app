import { useCallback, useEffect, useState } from 'react'

export const useDragDropReducer = (labels, HEIGHT) => {
    const [dragState, setDragState] = useState({
        order: labels,
        dragOrder: labels,
        draggedIndex: null,
    })

    useEffect(() => {
        setDragState(state => ({
            ...state,
            order: labels,
            dragOrder: labels,
        }))
    }, [labels])

    const handleDrag = useCallback(
        ({ translation, id }) => {
            const delta = Math.round(translation.y / HEIGHT)
            const index = dragState.order.indexOf(id)
            if (index + delta === 0 || index + delta >= labels.length - 1) {
                return
            }
            const dragOrder = dragState.order.filter(index => index !== id)
            dragOrder.splice(index + delta, 0, id)

            setDragState(state => ({
                ...state,
                draggedIndex: id,
                dragOrder,
            }))
        },
        [dragState.order, labels.length]
    )

    const handleDragEnd = useCallback(() => {
        setDragState(state => ({
            ...state,
            order: state.dragOrder,
            draggedIndex: null,
        }))
    }, [])

    return {
        dragState,
        handleDrag,
        handleDragEnd,
    }
}
