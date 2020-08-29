import React, { memo } from 'react'
import PropTypes from 'prop-types'

const AppTile = ({ width, height, title, selectedHandler, name, selected, appName }) => {
    const tileSelectHandler = () => selectedHandler(name, appName)
    return (
        <div
            className={`app-placements__tile ${selected && 'selected'}`}
            onClick={tileSelectHandler}
        >
            {selected && (
                <div className={'app-placements__flag'}>
                    <div className={'progress-checkmark'} />
                </div>
            )}
            <div className={'app-placements__content'}>
                <p className={'paragraph sub'}>{title}</p>
                <p className={'paragraph sub'}>
                    {width} x {height}
                </p>
            </div>
        </div>
    )
}

AppTile.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    selectedHandler: PropTypes.func,
    name: PropTypes.string,
    selected: PropTypes.bool,
    appName: PropTypes.string,
}

export default memo(AppTile)
