import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'

import { constants } from '../../../constants'
import { api } from '../../../modules/api'
import { util } from '../../../util'
import * as url from '../../../modules/Promotions/url'
import { Button, MonthScheduler, Spinner, SelectInput } from '../../common'
import { connect } from 'react-redux'

export const PrioritizeContent = ({ actions, promotions_list }) => {
    const [loading, setLoading] = useState(false)
    const [promos, setPromos] = useState(null)
    const [promoConfigs, setPromoConfigs] = useState(null)
    const [filteredPromos, setFilteredPromos] = useState(null)

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [selectedMonth, setMonth] = useState(new Date().getMonth())
    const [regions, setRegions] = useState([])
    const [selectedRegion, setSelectedRegion] = useState(regions[0])
    const [placements, setPlacements] = useState(constants.placements[0])

    useEffect(() => {
        const startDate = util.getFormattedDate(
            moment([selectedYear, selectedMonth]),
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
        // Clone the value before .endOf()
        const endDate = util.getFormattedDate(
            moment(util.ISOToLocalTime(startDate)).endOf('month'),
            'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        )
        _fetchPromos(startDate, endDate)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth, selectedYear])

    useEffect(() => {
        if (promos) {
            const updatedConfigs = _getPromoConfigs(promos)
            const filteredData = updatedConfigs.filter(
                ({ placement_location, region }) =>
                    placement_location === placements && region === selectedRegion
            )
            setFilteredPromos(filteredData)
        }
    }, [selectedYear, selectedMonth, placements, selectedRegion, promos, promoConfigs])

    useEffect(() => {
        if (promotions_list && promotions_list.length) {
            setPromos(promotions_list)

            const updatedConfigs = _getPromoConfigs(promotions_list)
            const updatedRegions = util.findUniqueValues(updatedConfigs, 'region')

            setPromoConfigs(updatedConfigs)
            setRegions(updatedRegions)
        }
    }, [promotions_list])

    const _fetchPromos = async (startDate, endDate) => {
        try {
            setLoading(true)
            const {
                data: { promotions },
            } = await api(url.getPromosURL, 'POST', {
                search: { start_date: startDate, end_date: endDate, status: ['scheduled', 'live'] },
                sort: { start_date: 'asc' },
                size: 100,
                pageNo: 1,
            })

            const updatedConfigs = _getPromoConfigs(promotions)
            const updatedRegions = util.findUniqueValues(updatedConfigs, 'region')
            !selectedRegion && setSelectedRegion(updatedRegions[0])

            setPromos(promotions)
            setPromoConfigs(updatedConfigs)
            setRegions(updatedRegions)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    const _getPromoConfigs = promotions =>
        promotions.reduce(
            (acc, { _id, name, configurations }) =>
                configurations.map(config => ({ ...config, promoId: _id, name: name })).concat(acc),
            []
        )

    const placementChangeHandler = value => setPlacements(value)

    const selectedRegionChangeHandler = value => {
        let region = ''
        if (value === 'National') region = 'all'
        else {
            for (let key in constants.statesList) {
                if (constants.statesList[key] === value) {
                    region = key
                    break
                }
            }
        }
        setSelectedRegion(region)
    }

    const fullRegionalValues = useMemo(
        () => regions.map(key => (key === 'all' ? 'National' : constants.statesList[key])),
        [regions]
    )

    // const configSaveHandler = (clonedConfig, isScheduledUpdated, currCellDate) => {
    //     const { start_date: cSrtDate, end_date: cEndDate } = clonedConfig.schedule
    //     const updatedProms = promos.map(promo => {
    //         if (promo._id === clonedConfig.promoId) {
    //             delete clonedConfig.promoId
    //             delete clonedConfig.name
    //             delete clonedConfig.color
    //             isScheduledUpdated && delete clonedConfig.id
    //
    //             const configs = promo.configurations.map(config => {
    //                 const updateConfig = { ...config }
    //                 const updatedSch = { ...updateConfig.schedule }
    //                 const { start_date: uSrtDate, end_date: uEndDate } = updatedSch
    //                 if (
    //                     updateConfig.placement_location === placements &&
    //                     updateConfig.region === selectedRegion
    //                 ) {
    //                     if (util.betweenIN(currCellDate, uSrtDate, uEndDate)) {
    //                         if (!isScheduledUpdated)
    //                             updateConfig['priority'] = clonedConfig.priority
    //                         else if (
    //                             util.mtDiffDays(cSrtDate, uSrtDate) >= 1 &&
    //                             util.mtDiffDays(cEndDate, uEndDate) < 0
    //                         ) {
    //                             updatedSch['end_date'] = util.subtractTime(cSrtDate, 1, 'minute')
    //                             updateConfig['schedule'] = updatedSch
    //
    //                             const rmngConfig = { ...config }
    //                             delete rmngConfig.id
    //
    //                             const rmngConfigSch = { ...rmngConfig.schedule }
    //                             rmngConfigSch['start_date'] = util.addTime(cEndDate, 1, 'minute')
    //                             rmngConfig['schedule'] = rmngConfigSch
    //
    //                             clonedConfig = [clonedConfig].concat(rmngConfig)
    //                             console.log('cond 1')
    //                         } else if (
    //                             util.mtDiffDays(cSrtDate, uSrtDate) >= 1 &&
    //                             util.mtDiffDays(cEndDate, uEndDate) === 0
    //                         ) {
    //                             updatedSch['start_date'] = uSrtDate
    //                             updatedSch['end_date'] = util.subtractTime(cSrtDate, 1, 'minute')
    //
    //                             updateConfig['schedule'] = updatedSch
    //                             console.log('cond 2')
    //                         } else {
    //                             updatedSch['start_date'] = util.addTime(cEndDate, 1, 'minute')
    //                             updateConfig['schedule'] = updatedSch
    //                             console.log('cond 3')
    //                         }
    //                     }
    //                     // else if (
    //                     //     util.mtDiffDays(cEndDate, uSrtDate) <= 0 &&
    //                     //     util.mtDiffDays(cEndDate, uEndDate) <= 0
    //                     // ) {
    //                     //     updatedSch['start_date'] = util.addTime(cEndDate, 1, 'minute')
    //                     //     updateConfig['schedule'] = updatedSch
    //                     // } else if (
    //                     //     util.mtDiffDays(cSrtDate, uEndDate) <= 0 &&
    //                     //     util.mtDiffDays(cSrtDate, uSrtDate) <= 0
    //                     // ) {
    //                     //     updatedSch['end_date'] = util.subtractTime(cSrtDate, 1, 'minute')
    //                     //     updateConfig['schedule'] = updatedSch
    //                     // }
    //                 }
    //                 return updateConfig
    //             })
    //
    //             const updatedPromo = { ...promo }
    //
    //             updatedPromo['configurations'] = isScheduledUpdated
    //                 ? configs.concat(clonedConfig)
    //                 : configs
    //
    //             return updatedPromo
    //         } else return promo
    //     })
    //     setPromos(updatedProms)
    // }

    const savePromosHandler = () => {
        actions.priorityList(promos)
    }

    const renderPromos = (week, day, position) => {
        const currCellDate = moment(
            util.getFormattedDate(
                moment()
                    .year(selectedYear)
                    .week(week)
                    .day(day),
                'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
            )
        )

        const filteredData = filteredPromos
            .filter(({ schedule: { start_date, end_date } }) =>
                util.betweenIN(currCellDate, start_date, end_date)
            )
            .sort((a, b) => a.priority - b.priority)

        if (!filteredData.length) return null
    }

    const renderSchedulerFilters = () => (
        <>
            <SelectInput
                size={'md'}
                className={'mr-5'}
                value={placements}
                label={'Placement'}
                options={constants.placements}
                onChange={placementChangeHandler}
            />
            <SelectInput
                label={'Region'}
                size={'md'}
                value={selectedRegion === 'all' ? 'National' : constants.statesList[selectedRegion]}
                options={fullRegionalValues}
                onChange={selectedRegionChangeHandler}
            />
        </>
    )

    if (loading) return <Spinner />
    if (!promoConfigs || !filteredPromos) return null

    return (
        <div className={'prioritization-calender'}>
            <MonthScheduler
                renderEvents={renderPromos}
                scheduleFilters={renderSchedulerFilters}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setMonth={setMonth}
                setYear={setSelectedYear}
            />
            <div className={'calender-actions'}>
                <Button color={'dark'} size={'lg'} onClick={savePromosHandler}>
                    Save
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ promotions }) => ({
    promotions_list: promotions.promotions_list,
})

export default connect(mapStateToProps)(PrioritizeContent)
