import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { util } from '../../../util'
import { Button, Icon } from '../index'

/**
 *
 * @param activeStep {Number} current active step among all content.
 * @param children {JSX} an array of Step component jsx objects
 * @returns {JSX}
 */
const Stepper = ({ activeStep, children }) => {
    return (
        <div className={'stepper'}>
            {React.Children.toArray(children).map((child, i) =>
                React.cloneElement(child, {
                    active_step: activeStep,
                    step: i,
                    isopen: activeStep === i, // used to resist re-rendering.
                })
            )}
        </div>
    )
}

Stepper.propTypes = {
    activeStep: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
}

/**
 *Step component will create the section layout along with step number and it state(active, partial, disabled)
 *
 * @param step {Number} step value received from Stepper component
 * @param active_step {Number} active step among all content
 * @param children {JSX} All the components (Heading, Content, Actions) wrapped in between Step
 * @param isPartial {Boolean} determines whether the sections is configured or not.
 * @returns {JSX}
 */
const Step = ({ step, active_step, children, isPartial, isEditingCompletedPromo }) => {
    const isOpen = active_step === step

    const progressClass = util.joinClasses(
        'progress__step',
        !isOpen && 'close',
        isPartial && !isOpen && 'partial'
    )

    const renderStepState = () =>
        isEditingCompletedPromo && step === 3 ? (
            <Icon size={'md'} color={'danger'} renderIcon={util.ReportProblemIcon} />
        ) : (
            <div className={progressClass}>
                {!isPartial || isOpen ? step + 1 : <div className={'progress-checkmark'} />}
            </div>
        )

    return (
        <div className={'stepper__step'}>
            <div className={'progress'}>
                {renderStepState()}
                <div className={util.joinClasses('progress__bar', step >= 3 && 'last')} />
            </div>
            <div className={'step-container'}>
                {React.Children.toArray(children).map((child, i) =>
                    React.cloneElement(child, {
                        step: step,
                        active_step: active_step,
                    })
                )}
            </div>
        </div>
    )
}

Step.propTypes = {
    step: PropTypes.number,
    active_step: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
    isPartial: PropTypes.bool,
    isEditingCompletedPromo: PropTypes.bool,
}

/**
 *
 * @param step {Number} step value received from Stepper component
 * @param active_step {Number} active step among all content
 * @param children {JSX} Section Heading
 * @param isPartial {Boolean} determines whether the sections is configured or not.
 * @returns {JSX}
 */
const Header = ({ children }) => {
    return <div className={'step-container__heading'}>{children}</div>
}

Header.propTypes = {
    children: PropTypes.string,
}

/**
 * Content component will determine whether to display a partial content, no content or content
 *
 * @param step {Number} step value received from Stepper component
 * @param active_step {Number} active step among all content
 * @param children {JSX} Different sections body (placements, schedule, audience, manage content, prioritization)
 * @param renderPartialContent {callback} renders the partial content of the sections
 * @param editHandler {callback} changes the step and opens the component.
 * @param isPartial {Boolean} determines whether the sections is configured or not.
 * @returns {null|JSX}
 */
const Content = ({ step, active_step, children, renderPartialContent, editHandler, isPartial }) => {
    useEffect(() => {
        if (step === active_step) {
            window.scrollTo({
                top: active_step * 270,
                behavior: 'smooth',
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active_step])

    if (step !== active_step && isPartial) {
        return (
            <div className={'step-container__children partial'}>
                <div className={'partial-content'}>
                    <div className={'partial-content__body'}>{renderPartialContent(step)}</div>
                    <div className={'partial-content__editable'} onClick={() => editHandler(step)}>
                        <p className={'paragraph mr-1'}>Edit</p>
                        <Icon size={'xs'} renderIcon={util.EditIcon} />
                    </div>
                </div>
            </div>
        )
    } else if (step !== active_step) {
        return null
    } else {
        return <div className={'step-container__children'}>{children}</div>
    }
}

Content.propTypes = {
    step: PropTypes.number,
    active_step: PropTypes.number,
    children: PropTypes.node,
    renderPartialContent: PropTypes.func,
    editHandler: PropTypes.func,
    isPartial: PropTypes.bool,
}

/**
 * Actions component renders the save and cancel button.
 *
 * @param saveClickHandler {callback} post the configuration to resource server.
 * @param cancelClickHandler {callback} closes the current content.
 * @param isEnable {Boolean} determines whether to display a active or inactive save button
 * @param isEditing {Boolean}
 * @returns {*}
 */
const Actions = ({ saveClickHandler, cancelClickHandler, isEnable, isEditing, isPublished }) => (
    <div className={'step-container__actions'}>
        <Button
            onClick={saveClickHandler}
            color={'dark'}
            size={'lg'}
            disabled={!isEnable || isPublished}
        >
            SAVE & CONTINUE
        </Button>
        {isEditing && (
            <Button onClick={cancelClickHandler} color={'light'} size={'lg'} className={'ml-6'}>
                CANCEL
            </Button>
        )}
    </div>
)

Actions.propTypes = {
    saveClickHandler: PropTypes.func,
    cancelClickHandler: PropTypes.func,
    isEnable: PropTypes.bool,
    isEditing: PropTypes.bool,
    isPublished: PropTypes.bool,
}

Stepper.Step = memo(Step)
Stepper.Header = memo(Header, () => true)
Stepper.Content = memo(Content)
Stepper.Actions = memo(Actions)

export default Stepper
