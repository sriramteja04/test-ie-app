import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from '../../common'
import { constants } from '../../../constants'
import AppTile from './AppTile'

const AppTiles = ({
    checkedApp,
    checkedAppHandler,
    appShowAtList,
    appSelectedHandler,
    checkLabel,
    name,
}) => {
    return (
        <>
            <Checkbox
                name={name}
                margin={'ml-0'}
                checked={checkedApp === name}
                onChange={checkedAppHandler}
                label={checkLabel}
                id={name}
            />
            {checkedApp && (
                <div className={'app-placements__tiles'}>
                    {constants.sevenAppPlacementTiles.map(({ name, title, width, height }) => {
                        const isSelectedTile =
                            appShowAtList.findIndex(tile => tile === name) >= 0 || false
                        return (
                            <AppTile
                                key={title}
                                name={name}
                                title={title}
                                width={width}
                                height={height}
                                selectedHandler={appSelectedHandler}
                                selected={isSelectedTile}
                                appName={checkedApp}
                            />
                        )
                    })}
                </div>
            )}
        </>
    )
}

AppTiles.propTypes = {
    checkedApp: PropTypes.string,
    checkedAppHandler: PropTypes.func,
    appShowAtList: PropTypes.arrayOf(PropTypes.string),
    appSelectedHandler: PropTypes.func,
    checkLabel: PropTypes.string,
    name: PropTypes.string,
}

export default memo(AppTiles)
