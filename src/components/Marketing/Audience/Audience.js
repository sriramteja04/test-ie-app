import React, { useState, memo, useEffect, useCallback, useMemo } from 'react'

import { constants } from '../../../constants'
import { util } from '../../../util'
import { Checkbox, SearchInput } from '../../common'

/**
 *
 * @param configurations {Object} -> Current Promo configurations.
 * @param setConfigurations {Callback} -> callback to update the configurations.
 * @returns {JSX} -> Rendering Audience section.
 * @constructor
 */
const Audience = ({ configurations, setConfigurations }) => {
    const [isNational, setNational] = useState(false)
    const [isRegional, setRegional] = useState(false)
    const [selectedRegions, setSelectedRegions] = useState([])
    const [search, setSearch] = useState('')
    const [uniqueRecords, setUniqueRecords] = useState([])
    const { statesList } = constants

    useEffect(() => {
        //Get Unique set of states: a state value can appear in more than one configuration
        const uniqueStates = util.findUniqueValues(configurations, 'region')

        //Get Unique set of Placements.
        const uniquePlacements = util.findUniqueValues(configurations, 'placement_location')

        //Filtering all state value to check if unique states array contains regional states.
        const uniqueRegions = uniqueStates.filter(region => region !== 'all')

        if (uniqueRegions.length !== uniqueStates.length) {
            setNational(true)
        }

        if (uniqueRegions.length > 0) {
            setRegional(true)
            setSelectedRegions(uniqueRegions)
        } else if (selectedRegions.length > 0) {
            setSelectedRegions([])
        }
        setUniqueRecords(_uniqueConfigs(configurations, uniquePlacements, 'placement_location'))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configurations])

    const _uniqueConfigs = (configs, fields, target) => {
        let unique = []
        if (!fields.length) {
            return unique
        }
        unique = fields.map(placement => ({
            app: '7Now',
            placement_location: placement,
            status: 'incomplete',
        }))

        return unique
    }

    /**
     * Every instance when a region configuration gets created, that value should added to national config excludes propery
     *
     * @param configurations {Array} -> Current Configurations
     * @param region {String} -> region Code
     * @returns {Array} -> updated National configuration with excludes property
     * @private
     */
    const _addExcludeToConfig = (configurations, region) =>
        configurations.map(config => {
            const updatedConfig = { ...config }
            if (updatedConfig.region === 'all') {
                let upadteExcludes = updatedConfig.excludes || []
                upadteExcludes = upadteExcludes.concat(region)
                updatedConfig['excludes'] = upadteExcludes
            }
            return updatedConfig
        })

    const _initialConfiguration = (configurations, region) => {
        const updatedNationalConfigs = isNational ? _addExcludeToConfig(configurations, region) : []

        const regionalConfigs = configurations.map(({ app, placement_location, status }) => ({
            app,
            placement_location,
            status,
            region: region,
        }))

        setConfigurations(updatedNationalConfigs.concat(regionalConfigs))
    }

    const changeListHandler = value => {
        setSearch('')
        const stateCode = util.getKeyByValue(statesList, value)
        if (selectedRegions.length) {
            const newConfigs = []
            uniqueRecords.forEach(uniqueRec =>
                newConfigs.push({
                    ...uniqueRec,
                    region: stateCode,
                })
            )
            const updatedConfigs = _addExcludeToConfig(configurations, stateCode)

            setConfigurations(updatedConfigs.concat(newConfigs))
        } else {
            _initialConfiguration(configurations, stateCode)
        }
    }

    const filterPillListHandler = value => {
        let updatedConfigs = []
        let stateCode = ''

        const filteredStatesList = { ...constants.statesList }

        // Filtering the state code from the states list
        for (const key in constants.statesList) {
            if (constants.statesList[key] === value) {
                stateCode = key
                delete filteredStatesList[stateCode]
                break
            }
        }

        // Filtering the region from configuration list as well as from national's excludes array, While
        // the user is removing the regions pill
        updatedConfigs = configurations.reduce((acc, config) => {
            const updatedConfig = { ...config }
            if (updatedConfig.region === 'all') {
                const updatedExcludes = updatedConfig.excludes.filter(reg => reg !== stateCode)
                updatedConfig['excludes'] = updatedExcludes
                return acc.concat(updatedConfig)
            } else if (filteredStatesList.hasOwnProperty(updatedConfig.region)) {
                return acc.concat(updatedConfig)
            } else {
                return acc
            }
        }, [])

        if (!updatedConfigs.length) {
            updatedConfigs = uniqueRecords.map(({ app, placement_location }) => ({
                app,
                placement_location,
                status: 'incomplete',
            }))
        }

        setConfigurations(updatedConfigs)
    }

    const searchHandler = useCallback(
        e => setSearch(e.target.value),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [search]
    )

    /**
     * This Handler fn is responsible for adding and removing 'all' state value to configurations.
     * @param e {Event}: Event object (target -> National Checkbox)
     */
    const nationalCheckHandler = e => {
        if (e.target.checked) {
            setNational(true)
            const newConfigs = []
            //If current configurations are same as the unique records, implies no region value has pre-configured.
            if (configurations.length === uniqueRecords.length && !selectedRegions.length) {
                configurations.forEach(config => newConfigs.push({ ...config, region: 'all' }))
                setConfigurations(newConfigs)
            } else {
                //If the configuration is pre-configured then spread all state config with the configuration
                uniqueRecords.forEach(config =>
                    newConfigs.push({ ...config, region: 'all', excludes: selectedRegions })
                )
                setConfigurations([...configurations, ...newConfigs])
            }
        } else {
            setNational(false)

            //If the National is unchecked, then filter the all state config object.
            const updatedConfigs = configurations.filter(({ region }) => region !== 'all')
            if (
                (isNational && !isRegional) ||
                (isNational && isRegional && selectedRegions.length < 1)
            ) {
                const configs = uniqueRecords.map(({ app, placement_location, status }) => ({
                    app,
                    placement_location,
                    status,
                }))
                setConfigurations(configs)
            } else {
                setConfigurations(updatedConfigs)
            }
        }
    }

    /**
     * This Handler fn is responsible for adding regions config obj to configurations.
     * @param e {Event}: Event object (target -> Regional Checkbox)
     */
    const regionalCheckHandler = e => {
        let updatedConfigs = []
        if (e.target.checked) {
            setRegional(true)
        } else {
            setRegional(false)
            if (!selectedRegions.length) {
                return
            }

            // Filtering the all the regional configs and removing all regions from national config excludes
            updatedConfigs = configurations.reduce((acc, config) => {
                const updatedConfig = { ...config }
                if (updatedConfig.region === 'all') {
                    updatedConfig['excludes'] = []
                    return acc.concat(updatedConfig)
                } else {
                    return acc
                }
            }, [])

            updatedConfigs = !updatedConfigs.length ? uniqueRecords : updatedConfigs

            setConfigurations(updatedConfigs)
        }
    }

    const memoStates = useMemo(
        () => Object.values(statesList),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const fullRegionalValues = useMemo(
        () => selectedRegions.map(key => constants.statesList[key]),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedRegions]
    )

    return (
        <div className={'audience'}>
            <div>
                <p className={'paragraph bold'}>Geographic Segment</p>
                <div className={'audience__content'}>
                    <div className={'audience__options'}>
                        <Checkbox
                            name={'National'}
                            onChange={nationalCheckHandler}
                            className={'checkbox ml-0'}
                            id={'audience_national'}
                            label={'National'}
                            checked={isNational}
                        />
                        <Checkbox
                            name={'Regional'}
                            onChange={regionalCheckHandler}
                            className={'checkbox ml-0 mt-5'}
                            id={'audience_regional'}
                            label={'Regional'}
                            checked={isRegional}
                        />
                    </div>
                    {isRegional && (
                        <SearchInput
                            size={'xl'}
                            searchList={memoStates}
                            className={'audience__content__search ml-6 mt-6'}
                            label={'Regions'}
                            type={'text'}
                            placeholder={'Search for a region'}
                            pillList={fullRegionalValues}
                            onChange={searchHandler}
                            value={search}
                            pillListHandler={changeListHandler}
                            removeFilterList={filterPillListHandler}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Audience)
