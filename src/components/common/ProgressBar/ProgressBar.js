import React, { memo, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param percentage
 * @returns {*}
 * @constructor
 */
const ProgressBar = ({ percentage }) => {
    const statusRef = useRef({})

    useLayoutEffect(() => {
        statusRef.current.style.width = `${percentage}%`
    }, [percentage])

    return (
        <div className={'progress-bar'}>
            <div className={'progress-bar__status'} ref={statusRef} />
        </div>
    )
}

ProgressBar.propTypes = {
    percentage: PropTypes.number,
}

export default memo(ProgressBar)
