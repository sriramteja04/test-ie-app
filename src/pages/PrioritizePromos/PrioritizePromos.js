import React, { memo, useEffect, useState, useRef, useCallback, Fragment } from 'react'
import * as actions from '../../modules/Promotions/actions'
import moment from 'moment'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SideMenu from '../../components/HOC/SideMenu/SideMenu'
import { Button, DoubleChevron, Spinner } from '../../components/common'
import { Calendar } from '../../components/PrioritizePromos/Calendar'
import { constants } from '../../constants'
import { EditPrioritization } from '../../components/PrioritizePromos/EditPrioritization'
import { PriorityViewTile } from '../../components/PrioritizePromos/PromoViewTile'
import { useLayoutThrottle } from '../../components/Custom Hooks/useCustomHooks'
import { util } from '../../util'

const PrioritizePromos = ({ promotions_list, promo_loading, actions }) => {
    const currentWeek = moment().week()
    const [selectedWeek, setSelectedWeek] = useState(currentWeek)
    const [selectedYear] = useState(moment().year())
    const [clickedDate, setClickedDate] = useState(null)
    const isMounted = useRef(false)
    const cellRef = useRef({})
    const HPRef = useRef({})

    useEffect(() => {
        !clickedDate && _fetchPromos(selectedWeek)
        return () => {
            cellRef.current = {}
            HPRef.current = {}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWeek, clickedDate])

    useLayoutThrottle(
        () => {
            _responsiveCalendarCells()
        },
        [promotions_list],
        200
    )

    const _fetchPromos = selectedWeek => {
        const momentFromDate = util.getDateFromWeekAndDayNumber(selectedYear, selectedWeek, 0)
        const fromDate = momentFromDate.format('YYYY-MM-DDT00:00:00.000[Z]')
        const toDate = momentFromDate.endOf('week').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        isMounted.current = true
        actions.fetchPromos(util.prioritizePromosPayload(fromDate, toDate))
    }

    const _responsiveCalendarCells = () => {
        const keys = Object.keys(cellRef.current) || null

        if (cellRef && keys && keys.length && promotions_list && HPRef) {
            const heights = keys.map(ref => {
                return cellRef.current[ref] ? cellRef.current[ref].offsetHeight : 0
            })
            const maxHeight = Math.max(...heights)

            Object.keys(HPRef.current).forEach(node => {
                if (HPRef.current[node]) {
                    HPRef.current[node].style.height = `${maxHeight}px`
                }
            })
        }
    }

    const nextWeekHandler = useCallback(
        () => setSelectedWeek(selectedWeek => selectedWeek + 1),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedWeek]
    )
    const prevWeekHandler = useCallback(
        () => setSelectedWeek(selectedWeek => selectedWeek - 1),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedWeek]
    )

    const todayClickHandler = useCallback(
        () => setSelectedWeek(currentWeek),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const renderMonth = () => {
        const weekStart = util.getDateFromWeekAndDayNumber(selectedYear, selectedWeek, 0)
        const weekEnd = util.getDateFromWeekAndDayNumber(selectedYear, selectedWeek, 6)

        return weekStart.month() === weekEnd.month()
            ? weekStart.format('MMMM YYYY')
            : `${weekStart.format('MMMM YYYY')} - ${weekEnd.format('MMMM YYYY')}`
    }

    const renderPriorityViews = (promos, title, rest) => {
        return (
            <div className={'cell'} {...rest}>
                <p className={'title'}>{title}</p>
                {promos.length ? (
                    util
                        .prioritizingPromos(promos)
                        .map((promo, i) => <PriorityViewTile {...promo} key={i} />)
                ) : (
                    <span>None</span>
                )}
            </div>
        )
    }

    const _isFullyConfigured = (...args) =>
        args.reduce(
            (acc, elm) => (!acc ? acc : (elm && elm.isNational && elm.isRegional) || false),
            true
        )

    const _setPlacementConfigs = (region, config, priority) => {
        const isNational = region === 'all' || false
        const updatedConfig = priority ? { ...config, priority } : { ...config }

        return isNational
            ? { ...updatedConfig, isNational: true }
            : { ...updatedConfig, isRegional: true }
    }

    const renderPlacements = colCellDate => {
        let HPPromos = []
        let DTPromos = []
        const currentDate = moment(colCellDate.format('MM/DD/YYYY'))
        if (isMounted.current && promotions_list && promotions_list.length) {
            promotions_list.forEach(({ schedule, configurations, name, priority }, index) => {
                if (!schedule || !priority) {
                    return
                }

                /** The following actions are for single promo */
                /** If the column cell date is in between start date and end date then continue */

                const { start_date, end_date } = schedule
                if (util.betweenIN(colCellDate, start_date, end_date)) {
                    /** _shouldPromoAppear function will check for promo schedule repeat conditions */
                    if (!util.isPromoExisted(schedule, currentDate)) {
                        return null
                    }

                    const promoColorsLength = constants.PROMO_COLORS.length
                    const color = constants.PROMO_COLORS[index % promoColorsLength]
                    let HPConfig = null
                    let DTConfig = null

                    for (let i = 0; i < configurations.length; i++) {
                        /** following condition is to check whether current config is a homepage
                         * placement config or deal tiles config */
                        const { placement_location, region } = configurations[i]

                        if (placement_location === constants.sevenAppPlacementTiles[0].name) {
                            /** checking if the home page config contains both national and regional set to true
                             * If both set to true then we don't need to continue to configure the home page configs
                             */
                            if (_isFullyConfigured(HPConfig)) {
                                continue
                            }
                            HPConfig = !HPConfig ? { name, color } : HPConfig
                            HPConfig = _setPlacementConfigs(region, HPConfig, 0)
                        } else {
                            /** checking if the deal tiles config contains both national and regional set to true
                             * If both set to true then we don't need to continue to configure the deal tiles configs
                             */
                            if (_isFullyConfigured(DTConfig)) {
                                continue
                            }
                            DTConfig = !DTConfig ? { name, color } : DTConfig
                            DTConfig = _setPlacementConfigs(region, DTConfig, priority)
                        }
                        /** if both Homepage config and deal tiles config meets all conditions then exist from current promo*/
                        if (_isFullyConfigured(HPConfig, DTConfig)) {
                            break
                        }
                    }

                    HPPromos = HPConfig && HPConfig.name ? HPPromos.concat(HPConfig) : HPPromos
                    DTPromos = DTConfig && DTConfig.name ? DTPromos.concat(DTConfig) : DTPromos
                }
            })
        }

        return (
            <Fragment>
                <div
                    className={'cell-wrapper'}
                    ref={ref => (HPRef.current[colCellDate.format('MM/DD/YYYY')] = ref)}
                >
                    {renderPriorityViews(HPPromos, 'Homepage Carousel', {
                        ref: ref => (cellRef.current[colCellDate.format('MM/DD/YYYY')] = ref),
                    })}
                </div>
                {renderPriorityViews(DTPromos, 'Deals Tiles')}
            </Fragment>
        )
    }

    const cellClickHandler = currDate => setClickedDate(currDate)
    const closeEditPrioritization = () => setClickedDate(null)

    const renderEditPrioritization = () => (
        <SideMenu
            open={clickedDate && true}
            toggleMenu={closeEditPrioritization}
            width={'xl'}
            direction={'right'}
        >
            <EditPrioritization
                selectedDate={clickedDate}
                toggleSideMenu={closeEditPrioritization}
            />
        </SideMenu>
    )

    const renderCalendarActions = () => (
        <div className={'actions'}>
            <Button onClick={todayClickHandler}>Today</Button>
            <DoubleChevron
                gap={'md'}
                iconSize={'xxs'}
                backwardClickHandler={prevWeekHandler}
                forwardClickHandler={nextWeekHandler}
            />
            <p className={'actions__selected-month'}>{renderMonth()}</p>
        </div>
    )

    return (
        <div className={'prioritize-promos'}>
            <Spinner loading={promo_loading && !clickedDate} />
            <p className={'prioritize-promos__title'}>Promo Prioritization</p>
            <div className={'prioritize-promos__calendar'}>
                {renderEditPrioritization()}
                {renderCalendarActions()}
                <Calendar
                    currWeek={selectedWeek}
                    selectedYear={selectedYear}
                    renderPlacements={renderPlacements}
                    cellClickHandler={cellClickHandler}
                />
            </div>
        </div>
    )
}

PrioritizePromos.propTypes = {
    promotions_list: PropTypes.array,
    promo_loading: PropTypes.bool,
    actions: PropTypes.object,
}

const mapStateToProps = ({ promotions }) => {
    return {
        promo_loading: promotions.promo_loading,
        promotions_list: promotions.promotions_list,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrioritizePromos)
