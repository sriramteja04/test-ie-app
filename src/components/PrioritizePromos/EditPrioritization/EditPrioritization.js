import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import EditPrioritizationToolBar from './EditPrioritizationToolBar'
import LeaveConfirmationModal from './LeaveConfirmationModal'
import PlacementCards from './PlacementCards'
import { Alert, Button, Icon, Loader } from '../../common'
import { strings } from '../../../strings'
import { util } from '../../../util'
import * as actions from '../../../modules/Promotions/actions'
import { constants } from '../../../constants'

const EditPrioritization = ({
    selectedDate,
    toggleSideMenu,
    actions,
    prioritize_promos,
    promo_loading,
    update_prioritization_failed,
    update_prioritization_success,
    sideMenuRef,
}) => {
    const [currDate, setCurrDate] = useState(selectedDate)
    /** Homepage Carousel Promos State */
    const [HPPromos, setHPPromos] = useState(null)
    /** Deal Tiles Promos State */
    const [DTPromos, setDTPromos] = useState(null)
    const [isSaveBtnEnable, setSaveBtnEnable] = useState(false)
    const [showLeaveAlert, setLeaveAlert] = useState(false)
    const [leaveDateTo, setLeaveDateTo] = useState(null)
    const isMounted = useRef(false)
    const initialDTPromos = useRef(null)
    const isSaveClicked = useRef(false)
    const scrollRef = useRef({})

    useEffect(() => {
        const start = util.toISOStartOfDate(currDate)
        const end = util.toISOEndOfDate(currDate)
        actions.fetchPrioritizePromos(util.prioritizePromosPayload(start, end))

        isMounted.current = true
        isSaveClicked.current = false
        setSaveBtnEnable(false)
        initialDTPromos.current = null

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currDate])

    useEffect(() => {
        initialDTPromos.current = null
        isMounted.current && _setPlacements(prioritize_promos)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prioritize_promos])

    useEffect(() => {
        if (
            initialDTPromos.current &&
            _comparePromos(initialDTPromos.current, _mapIdToPriority(DTPromos))
        ) {
            setSaveBtnEnable(true)
        } else {
            setSaveBtnEnable(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DTPromos, initialDTPromos])

    React.useLayoutEffect(() => {
        sideMenuRef.current.style.overflow = promo_loading ? 'hidden' : 'auto'

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promo_loading])

    const toggleAlerts = () => {
        if (update_prioritization_success) {
            actions.clearPrioritizationSuccess()
        }
        if (update_prioritization_failed) {
            actions.clearPrioritizationFailed()
        }
    }

    const _comparePromos = (initialPromo, updatedPromo) => {
        let isEqual = false
        for (let id in initialPromo) {
            if (initialPromo[id] !== updatedPromo[id]) {
                isEqual = true
                break
            }
        }
        return isEqual
    }

    const _mapIdToPriority = arr => {
        const mapIdToPriority = {}
        arr.forEach(({ _id, priority }) => (mapIdToPriority[_id] = priority))
        return mapIdToPriority
    }

    const _setPlacements = promos => {
        let updatedHPPromos = []
        let updatedDTPromos = []

        promos.forEach(({ priority, schedule, configurations, name, _id, status }, i) => {
            if (!schedule || !priority) {
                return
            }

            if (!util.isPromoExisted(schedule, currDate)) {
                return
            }
            const promoColorsLength = constants.PROMO_COLORS.length
            const color = constants.PROMO_COLORS[i % promoColorsLength]
            const promoConfig = {
                name,
                startDate: schedule.start_date,
                endDate: schedule.end_date,
                status,
                _id,
                color,
                regions: util.findUniqueValues(configurations, 'region'),
            }
            if (
                configurations.find(
                    ({ placement_location }) => placement_location === constants.placements[0]
                )
            ) {
                updatedHPPromos = updatedHPPromos.concat({ ...promoConfig })
            }
            if (
                configurations.find(
                    ({ placement_location }) => placement_location === constants.placements[1]
                )
            ) {
                updatedDTPromos = updatedDTPromos.concat({ ...promoConfig, priority })
            }
        })

        setHPPromos(util.prioritizingPromos(updatedHPPromos))
        setDTPromos(util.prioritizingPromos(updatedDTPromos))
    }

    const cancelSideMenuHandler = () => {
        toggleAlerts()
        toggleSideMenu()
    }

    const prevDateHandler = useCallback(
        () => {
            const date = currDate.clone().subtract(1, 'day')
            if (!isSaveClicked.current && isSaveBtnEnable) {
                setLeaveAlert(true)
                setLeaveDateTo(date)
            } else {
                setCurrDate(date)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currDate, isSaveBtnEnable, isSaveClicked]
    )

    const nextDateHandler = useCallback(
        () => {
            const date = currDate.clone().add(1, 'day')
            if (!isSaveClicked.current && isSaveBtnEnable) {
                setLeaveAlert(true)
                setLeaveDateTo(date)
            } else {
                setCurrDate(date)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currDate, isSaveBtnEnable, isSaveClicked]
    )

    const priorityChangeHandler = (id, updatedPriority) => {
        toggleAlerts()
        if (!initialDTPromos.current) {
            initialDTPromos.current = _mapIdToPriority(DTPromos)
        }

        const updatedDTPromos = DTPromos.map(promo => {
            const updatedPromoConfig = { ...promo }
            if (updatedPromoConfig._id === id) {
                updatedPromoConfig.priority = updatedPriority
                updatedPromoConfig.promoUpdated = true
                if (updatedPromoConfig.status === 'live') {
                    updatedPromoConfig.warning = strings.editingLivePromoWarning
                }
            }
            return updatedPromoConfig
        })
        setDTPromos(util.prioritizingPromos(updatedDTPromos))
    }

    const onSaveClickHandler = () => {
        const updatedPromos = DTPromos.reduce((acc, promoConfig) => {
            if (promoConfig.promoUpdated) {
                prioritize_promos.forEach(promo => {
                    if (promo._id === promoConfig._id) {
                        promo['priority'] = promoConfig.priority
                        acc = acc.concat(promo)
                    }
                })
            }
            return acc
        }, [])
        isSaveClicked.current = true
        scrollRef.current.scrollIntoView({
            top: 0,
            behavior: 'smooth',
        })
        actions.updatePrioritizedPromos(updatedPromos)
    }

    const cancelLeaveModalHandler = () => {
        setLeaveAlert(false)
    }

    const leaveClickHandler = () => {
        setLeaveAlert(false)
        setCurrDate(leaveDateTo)
    }

    const memoizedDTPromos = useMemo(() => DTPromos, [DTPromos])
    const memoizedHPPromos = useMemo(() => HPPromos, [HPPromos])

    const renderActions = () => (
        <div className={'edit-prioritization__actions'}>
            <Button
                size={'lg'}
                color={'dark'}
                onClick={onSaveClickHandler}
                disabled={!isSaveBtnEnable}
            >
                SAVE
            </Button>
            <Button size={'lg'} className={'ml-6'} onClick={cancelSideMenuHandler}>
                CANCEL
            </Button>
        </div>
    )

    const renderAlerts = () => (
        <>
            <Alert
                show={update_prioritization_failed}
                className={'mt-6 mb-7'}
                title={'Unable to save changes. Please try again'}
                type={'danger'}
                variant={'fill'}
                renderIcon={util.ReportProblemIcon}
            />
            <Alert
                show={update_prioritization_success}
                className={'mt-6 mb-7'}
                title={'Changes have been saved successfully.'}
                type={'success'}
                variant={'fill'}
                renderIcon={util.CheckCircleIcon}
            />
        </>
    )

    const renderPlacementTiles = () => (
        <>
            <PlacementCards
                title={constants.placements[0]}
                description={strings.homePageEditDesc}
                promos={memoizedHPPromos}
            />
            <PlacementCards
                title={'Deals Tiles'}
                description={strings.dealTilesEditDesc}
                promos={memoizedDTPromos}
                priorityChangeHandler={priorityChangeHandler}
            />
        </>
    )

    return (
        <div className={'edit-prioritization'} ref={scrollRef}>
            <Loader loading={promo_loading} />
            <div className={'edit-prioritization__container'}>
                <LeaveConfirmationModal
                    show={showLeaveAlert}
                    cancelAlertModal={cancelLeaveModalHandler}
                    leaveClickHandler={leaveClickHandler}
                />
                <EditPrioritizationToolBar
                    selectedDate={currDate}
                    backwardClickHandler={prevDateHandler}
                    forwardClickHandler={nextDateHandler}
                />
                {renderAlerts()}
                {renderPlacementTiles()}
            </div>
            <Icon
                className={'edit-prioritization__close-icon'}
                renderIcon={util.CloseIcon}
                onClick={cancelSideMenuHandler}
                pointer
            />
            {renderActions()}
        </div>
    )
}

EditPrioritization.propTypes = {
    /* moment object */
    selectedDate: PropTypes.object,
    toggleSideMenu: PropTypes.func,
    actions: PropTypes.object,
    prioritize_promos: PropTypes.arrayOf(constants.promoPropType),
    promo_loading: PropTypes.bool,
    update_prioritization_success: PropTypes.bool,
    update_prioritization_failed: PropTypes.bool,
}

const mapStateToProps = ({ promotions }) => ({
    promo_loading: promotions.promo_loading,
    prioritize_promos: promotions.prioritize_promos,
    update_prioritization_success: promotions.update_prioritization_success,
    update_prioritization_failed: promotions.update_prioritization_failed,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(EditPrioritization))
