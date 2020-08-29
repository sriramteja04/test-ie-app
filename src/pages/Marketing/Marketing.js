import React, { memo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
    AppPlacements,
    Audience,
    ManageContent,
    PartialContent,
    Schedule,
    Prioritization,
} from '../../components/Marketing'
import { constants } from '../../constants'
import PromoLink from '../../components/PromoDetails/PromoLink'
import { RuleCompleteModal, Spinner, Stepper, WarningModal } from '../../components/common'
import { usePrevious, useToggle } from '../../components/Custom Hooks/useCustomHooks'
import { util } from '../../util'

const Marketing = ({
    actions,
    match,
    id_editing_completed_promo,
    promo_details,
    promo_loading,
    promo_error,
}) => {
    const [activeStep, setActiveStep] = useState(null)
    const [isEditing, toggleIsEditing] = useState(false)
    const [isSavingConfigurations, toggleIsSavingConfigurations] = useState(false)
    const [promoDetails, setPromoDetails] = useState(promo_details || {})
    const [showCompleteModal, toggleCompleteModal] = useToggle(false)
    const [showEditWarning, setEditWarning] = useToggle(false)
    const editCompletedPromo = useRef(false)
    const prevPromo = usePrevious(promo_details)

    useEffect(() => {
        actions.fetchPromoById(match.params.promoId)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.promoId])

    useEffect(() => {
        const updatedStep = _getDefaultStep()
        activeStep !== updatedStep && setActiveStep(updatedStep)
        if (promo_details) {
            setPromoDetails(promo_details)
        }

        if (
            prevPromo &&
            prevPromo.status === 'incomplete' &&
            promo_details.status === 'scheduled'
        ) {
            toggleCompleteModal()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promo_details])

    useEffect(() => {
        isSavingConfigurations && saveClickHandler()
        return () => toggleIsSavingConfigurations(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSavingConfigurations])

    const _isHavingAudience = configurations =>
        configurations.some(
            ({ app, placement_location, region }) => app && placement_location && !region
        )

    const _isHavingManageConfig = configurations =>
        configurations.some(
            ({ app, placement_location, region, status }) =>
                app && placement_location && region && (!status || status !== 'complete')
        )

    const _getDefaultStep = () => {
        let defaultStep = 0
        const { configurations, schedule, priority } = promo_details || {}

        if (!configurations || !promo_details) {
            defaultStep = 0
        } else if (configurations && configurations.length === 0) {
            // No Configs, Open App placements
        } else if (!schedule && configurations.length > 0) {
            // Configs were there but not scheduled, Open Schedule Component
            defaultStep = 1
        } else if (_isHavingAudience(configurations)) {
            // if No States are configured in marketing configurations, Open Audience
            defaultStep = 2
        } else if (!_isHavingAudience(configurations) && !priority) {
            // Open Prioritization
            defaultStep = 3
        } else if (!_isHavingAudience(configurations) && _isHavingManageConfig(configurations)) {
            // Open Manage Content
            defaultStep = 4
        } else {
            defaultStep = 5
        }
        return defaultStep
    }

    const _checkEditWarning = updatedConfigs => {
        const { status, configurations } = promo_details

        if (status === 'incomplete' && activeStep !== 1 && activeStep !== 3) {
            return false
        }

        const configKey = activeStep === 0 ? 'placement_location' : 'region'
        const updated = util.findUniqueValues(updatedConfigs, configKey)
        const current = util.findUniqueValues(configurations, configKey)

        return updated.filter(currVal => !current.includes(currVal)).length > 0
    }

    /**
     * This function is responsible to update the promo details configurations
     * @param configurations {Array} configuration that has been received from different sections
     * @param isUpdatingConfig
     * @private
     */
    const _setConfigurations = (configurations, isUpdatingConfig = false) => {
        /**
         * Edit Warning Modal should pop up only when a user adds up new configuration from
         * App Placement or Audience. If the user removes a configuration then we don't need to popup
         * the edit warning modal.
         */
        editCompletedPromo.current = _checkEditWarning(configurations)
        const updatedPromoDetails = { ...promoDetails }
        updatedPromoDetails['configurations'] = configurations
        setPromoDetails(updatedPromoDetails)
        isUpdatingConfig && toggleIsSavingConfigurations(true)
    }

    /**
     * This function is responsible to update the promo details schedule
     * @param schedule {Object} updated object received from the schedule component
     * @private
     */
    const _setSchedule = schedule => {
        const updatedPromoDetails = { ...promoDetails }
        updatedPromoDetails['schedule'] = schedule
        setPromoDetails(updatedPromoDetails)
    }

    const saveClickHandler = () => {
        // if a user adds new configurations for a completed promo then show edit warning modal.
        if (editCompletedPromo.current) {
            setEditWarning()
        } else {
            const updatePromoDetails = {}
            updatePromoDetails['promo'] = promoDetails
            actions.updateMarketing(updatePromoDetails)
        }
    }

    const cancelWarningModalHandler = () => {
        setPromoDetails(promo_details)
        setEditWarning()
    }

    const proceedWarningHandler = () => {
        editCompletedPromo.current = false
        setEditWarning()
        saveClickHandler()
    }

    const cancelClickHandler = () => {
        editCompletedPromo.current = editCompletedPromo.current ? false : editCompletedPromo.current
        setPromoDetails(promo_details)
        setActiveStep(_getDefaultStep())
        toggleIsEditing(false)
    }

    const editHandler = step => {
        editCompletedPromo.current = editCompletedPromo.current ? false : editCompletedPromo.current
        setActiveStep(step)
        toggleIsEditing(true)
        setPromoDetails(promo_details)
    }

    /**
     * This function is responsible to update the promo details priority
     * @param priority {String} updated string received from the prioritization component
     * @private
     */
    const _setPriority = priority => {
        const updatedPromoDetails = { ...promoDetails }
        updatedPromoDetails['priority'] = priority
        setPromoDetails(updatedPromoDetails)
    }

    //Checking for content in current state.
    const _isContentExists = (step, value, details) => {
        const { configurations = [], schedule = {}, priority } = details
        if (
            step === 0 &&
            configurations.length &&
            configurations.some(config => config && config[value])
        ) {
            return true
        } else if (step === 1 && schedule && schedule.start_date && schedule.end_date) {
            return true
        } else if (step === 2 && configurations.length && configurations[0][value]) {
            return true
        } else if (step === 3 && configurations.length && priority) {
            return true
        } else if (
            step === 4 &&
            configurations.length &&
            configurations.some(({ status }) => status === 'complete')
        ) {
            return true
        } else if (step === 5 && process.env.REACT_APP_ENV !== 'QA') {
            return true
        }

        return false
    }

    const _renderMarketingSteps = step => {
        const { configurations, schedule, qa_is_live, is_live, priority } = promoDetails || {}
        const isPublished = qa_is_live || is_live
        const scheduledDates = promo_details.schedule || null
        switch (step) {
            case 0:
                return (
                    <AppPlacements
                        configurations={configurations}
                        setConfigurations={_setConfigurations}
                    />
                )
            case 1:
                return (
                    <Schedule
                        schedule={schedule}
                        setSchedule={_setSchedule}
                        scheduledDates={scheduledDates}
                    />
                )
            case 2:
                return (
                    <Audience
                        configurations={configurations}
                        setConfigurations={_setConfigurations}
                    />
                )
            case 3:
                return <Prioritization priority={priority} setPriority={_setPriority} />
            case 4:
                return (
                    <ManageContent
                        configurations={configurations}
                        setConfigurations={_setConfigurations}
                        isEditingCompletedPromo={id_editing_completed_promo}
                        isPublished={isPublished}
                        schedule={schedule}
                    />
                )
            case 5:
                return null
            default:
                return null
        }
    }

    const _renderPartialContent = step => {
        const { configurations, schedule, status, priority } = promo_details || {}
        return (
            <PartialContent
                configurations={configurations}
                schedule={schedule}
                step={step}
                status={status}
                priority={priority}
            />
        )
    }

    const renderStepper = () => {
        return (
            <div className={'marketing__stepper'}>
                <Stepper activeStep={activeStep}>
                    {constants.marketingSteps.map(({ step, title, value }) => {
                        const isPartial = _isContentExists(step, value, promo_details)
                        const isEnable = _isContentExists(step, value, promoDetails)
                        const isPublished =
                            promo_details && (promo_details.qa_is_live || promo_details.is_live)
                        return (
                            <Stepper.Step
                                key={step}
                                isPartial={isPartial}
                                isEditingCompletedPromo={id_editing_completed_promo}
                            >
                                <Stepper.Header isPartial={isPartial}>{title}</Stepper.Header>
                                <Stepper.Content
                                    renderPartialContent={_renderPartialContent}
                                    editHandler={editHandler}
                                    isPartial={isPartial}
                                    status={promo_details && promo_details.status}
                                >
                                    {_renderMarketingSteps(step)}
                                </Stepper.Content>
                                {step === activeStep ? (
                                    <Stepper.Actions
                                        saveClickHandler={saveClickHandler}
                                        cancelClickHandler={cancelClickHandler}
                                        isEnable={isEnable}
                                        isEditing={isEditing}
                                        isPublished={isPublished}
                                    />
                                ) : null}
                            </Stepper.Step>
                        )
                    })}
                </Stepper>
            </div>
        )
    }

    const renderEditWarning = () =>
        showEditWarning ? (
            <WarningModal
                title={'Are you sure you want to save?'}
                description={util.editConfigWarningMsg(constants.marketingSteps[activeStep].title)}
                cancelHandler={cancelWarningModalHandler}
                proceedHandler={proceedWarningHandler}
            />
        ) : null

    if (!promo_details || promo_error) {
        return null
    }

    return (
        <div className={'marketing'}>
            <Spinner loading={promo_loading} />
            {renderEditWarning()}
            {showCompleteModal && <RuleCompleteModal close={toggleCompleteModal} />}
            <PromoLink
                title={'Marketing / Content'}
                open={true}
                status={promoDetails.status}
                id={promoDetails._id}
            />
            {promo_details ? renderStepper() : null}
        </div>
    )
}

Marketing.propTypes = {
    /* actions {Object} -> An action object which bind with all promotion actions. */
    actions: PropTypes.object,
    /* match {Object} -> promo id which is passed from promo detail page to marketing page, which is used to fetch a promo. */
    match: PropTypes.shape({
        params: PropTypes.shape({
            promoId: PropTypes.string,
        }),
    }),
    /* id_editing_completed_promo {Boolean} -> if true shows an alert warning at manage content and prioritize content section. */
    id_editing_completed_promo: PropTypes.bool,
    /* promo_details {Object} -> current promo details */
    promo_details: constants.promoPropType,
    /* promo_loading {Boolean} -> if true shows a spinner */
    promo_loading: PropTypes.bool,
    /* promo_error {String} */
    promo_error: PropTypes.string,
}

export default memo(Marketing)
