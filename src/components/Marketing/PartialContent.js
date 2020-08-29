import React, { memo } from 'react'
import moment from 'moment'

import { util } from '../../util'
import { constants } from '../../constants'

export const PartialContent = ({ configurations, schedule, step, status, priority }) => {
    const _getAppPlacements = configurations => {
        const placements = configurations.reduce((acc, config, i) => {
            if (acc.hasOwnProperty(config.app)) {
                const updatedAcc = { ...acc }
                updatedAcc[config.app].add(config.placement_location)
                return updatedAcc
            } else {
                acc[config.app] = new Set([config.placement_location])
                return acc
            }
        }, {})
        return (
            <div className={'partial-content__body__app-placements'}>
                {Object.keys(placements).map(app =>
                    [...placements[app].values()].map((location, i) => (
                        <p
                            key={i}
                            className={util.joinClasses(
                                'paragraph block',
                                i !== 0 ? 'mt-4' : 'mt-0'
                            )}
                        >
                            {app} {location}
                        </p>
                    ))
                )}
            </div>
        )
    }

    const _getSchedule = schedule => {
        let { start_date, end_date, repeat_daily } = schedule || {}
        start_date = util.ISOToLocalTime(start_date)
        end_date = util.ISOToLocalTime(end_date)
        const repeatMsg = repeat_daily ? `; Repeats every ${repeat_daily.every} day(s)` : ''
        return (
            <p className={'partial-content__body__schedule'}>
                {moment(start_date).format('MMM D, yyyy')} {moment(start_date).format('LT')} -{' '}
                {moment(end_date).format('MMM D, yyyy')} {moment(end_date).format('LT')}
                {repeatMsg}
            </p>
        )
    }

    const _getAudience = configurations => {
        const states = util.findUniqueValues(configurations, 'region')
        const isNational = states.some(state => state === 'all')
        const regStates = states.filter(state => state !== 'all')

        const renderNational = () =>
            isNational ? (
                <div className={util.joinClasses('paragraph block', regStates.length && 'mb-3')}>
                    National: Yes
                </div>
            ) : null

        const renderRegions = () =>
            regStates.length ? (
                <div className={'paragraph inline'}>
                    Regional: {}
                    {regStates.map((state, i) => (
                        <p
                            className={util.joinClasses(
                                i + 1 === regStates.length ? 'config-end' : 'config-comma'
                            )}
                            key={i}
                        >
                            {util.getRegionByCode(state)}
                        </p>
                    ))}
                </div>
            ) : null

        return (
            <div className={'partial-content__body__audience'}>
                {renderNational()}
                {renderRegions()}
            </div>
        )
    }

    const _getManageContent = configurations => {
        const completedConfigs = configurations.filter(({ status }) => status === 'complete').length
        const totalConfigs = configurations.length
        return (
            <p className={'paragraph'}>
                {completedConfigs} {completedConfigs === totalConfigs && `of ${totalConfigs}`}{' '}
                Content Configurations completed
            </p>
        )
    }

    const _getPrioritizeContent = priority => {
        const category = constants.prioritizationCategoriesList.filter(
            category => category.tier === priority
        )[0]
        return (
            <div className={'partial-content__body__prioritizeContent'}>
                <p>Tier: {priority} </p>
                <p className={'mt-4'}>Category: {category.label}</p>
            </div>
        )
    }

    /**
     * based on the step, partial content will be returned
     */
    switch (step) {
        case 0:
            return _getAppPlacements(configurations)
        case 1:
            return _getSchedule(schedule)
        case 2:
            return _getAudience(configurations)
        case 3:
            return _getPrioritizeContent(priority)
        case 4:
            return _getManageContent(configurations)
        default:
            return null
    }
}

export default memo(PartialContent)
