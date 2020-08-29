import React, { useState, memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import AppTiles from './AppTiles'
import { constants } from '../../../constants'

const SEVEN_NOW_APP_TITLE = '7Now'

const AppPlacements = ({ setConfigurations, configurations }) => {
    const [sevenAppList, setSevenApp] = useState([])
    const [checkSevenApp, setCheckSevenApp] = useState('')
    const [placement, setPlacement] = useState({})

    /**
     * This useEffect will execute every time when configuration prop updates..
     */
    useEffect(() => {
        /* Extracting placements from current configurations and creating a set with
         app and placements locations and states if any */
        const placements = _extractPlacements(configurations)
        initiatePlacements(placements)
    }, [configurations])

    /**
     *
     * @param configurations {object} -> includes the promo all configurations
     * @returns {Set} -> returns a set with unique placement locations and states if any
     * @private
     */
    const _extractPlacements = configurations => {
        if (!configurations) {
            return {}
        }
        return configurations.reduce((acc, config, i) => {
            /* If the current config app exits in accumulator then add curr app to the existing accumulator app set value,
             * otherwise create new app set value */
            if (acc.hasOwnProperty(config.app)) {
                const updatedAcc = { ...acc }
                updatedAcc[config.app].add(config.placement_location)
                if (config['region']) {
                    updatedAcc['states'].add(config.region)
                }
                return updatedAcc
            } else {
                acc[config.app] = new Set([config.placement_location])
                if (config['region']) {
                    acc['states'] = new Set([config.region])
                }
                return acc
            }
        }, {})
    }

    /**
     *
     * @param e -> window event object
     */
    const sevenAppSelectedHandler = e => {
        if (e.target.id === checkSevenApp) {
            setCheckSevenApp('')
            setSevenApp([])
            setConfigurations([])
        } else {
            setCheckSevenApp(e.target.id)
            const filteredConfigs = configurations.filter(({ app }) => app === e.target.value)
            setConfigurations(filteredConfigs)
        }
    }

    const appSelectedHandler = (selectedTile, appName) => {
        let configs = [...configurations]

        // Checking whether the selected tile is existed or not
        const index = configs.findIndex(
            ({ placement_location, app }) => app === appName && placement_location === selectedTile
        )

        // If exits, then remove the tile for configurations
        if (index >= 0) {
            configs = configs.filter(
                ({ placement_location, app }) =>
                    app === appName && placement_location !== selectedTile
            )
        } else {
            /* if selected tile is not existed, but audience was already configured,,
                then include the  state property in the newly created config */
            if (placement && placement['states'] && placement['states'].size > 0) {
                // Create array from 7now set values
                const states = [...placement['states'].values()]
                states.forEach(state => {
                    let excludeStates
                    if (state === 'all') {
                        excludeStates = states.filter(state => state !== 'all')
                    }
                    configs.push({
                        app: appName,
                        placement_location: selectedTile,
                        region: state,
                        ...(excludeStates && { excludes: excludeStates }),
                    })
                })
            } else {
                /* No states configured, create the configuration with app and placement location*/
                configs.push({ app: appName, placement_location: selectedTile })
            }
        }
        // ADD configurations to the promoDetail state value in marketing.
        setConfigurations(configs)
    }

    const initiatePlacements = placements => {
        if (placements && placements[SEVEN_NOW_APP_TITLE]) {
            //if there are any placements updated the app tiles list, need to display the already selected title
            setSevenApp([...placements[SEVEN_NOW_APP_TITLE].values()])
            //if placement locations exists, check the appropriate app
            setCheckSevenApp(placements[SEVEN_NOW_APP_TITLE].size > 0 ? SEVEN_NOW_APP_TITLE : '')
            //Set placements set value
            setPlacement(placements)
        } else if (placements && !placements[SEVEN_NOW_APP_TITLE]) {
            setSevenApp([])
        }
    }

    return (
        <div className={'app-placements'}>
            <p className={'paragraph'}>Choose the apps you would like to run your content</p>
            <div className={'app-placements__apps'}>
                <AppTiles
                    checkedApp={checkSevenApp}
                    checkedAppHandler={sevenAppSelectedHandler}
                    appShowAtList={sevenAppList}
                    appSelectedHandler={appSelectedHandler}
                    checkLabel={'7Now App'}
                    name={SEVEN_NOW_APP_TITLE}
                />
            </div>
        </div>
    )
}

AppPlacements.propTypes = {
    setConfigurations: PropTypes.func,
    configurations: constants.promoConfigPropType,
}

export default memo(AppPlacements)
