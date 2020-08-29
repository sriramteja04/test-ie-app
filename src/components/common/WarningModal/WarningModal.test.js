import React from 'react'
import { mount } from 'enzyme'
import WarningModal from './WarningModal'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<WarningModal {...props} />)
}

const warningActionsComponent = component =>
    findByClassName(component, '.warning-modal__actions').find('button')

describe('Test WarningModal component', () => {
    let component, wrapper, cancelHandler, proceedHandler
    beforeEach(() => {
        const title = 'Are you sure you want to save?'
        const description = 'This change will result in new Marketing Content Configurations'
        cancelHandler = jest.fn()
        proceedHandler = jest.fn()
        const props = {
            cancelHandler,
            proceedHandler,
            description,
            title,
        }
        component = SetUp(props)
        wrapper = findByClassName(component, '.warning-modal').at(1)
    })

    test('Render warning modal', () => {
        expect(wrapper.length).toBe(1)
    })

    test('Render warning modal heading', () => {
        const headingWrapper = findByClassName(component, '.warning-modal__heading')
        expect(headingWrapper.length).toBe(1)
    })

    test('Render warning modal icon', () => {
        const icon = findByClassName(component, '.warning-modal__heading').find('svg')
        expect(icon.length).toBe(1)
    })

    test('Render warning modal title', () => {
        const title = findByClassName(component, '.warning-text')
        expect(title.length).toBe(1)
    })

    test('Render warning modal title value', () => {
        const title = findByClassName(component, '.warning-text')
        expect(title.text()).toBe('Are you sure you want to save?')
    })

    test('Render warning modal content', () => {
        const content = findByClassName(component, '.warning-modal__content')
        expect(content.length).toBe(1)
    })

    test('Render warning modal content value', () => {
        const content = findByClassName(component, '.warning-modal__content')
        expect(content.text()).toBe(
            'This change will result in new Marketing Content Configurations'
        )
    })

    test('Render warning modal actions', () => {
        const actions = findByClassName(component, '.warning-modal__actions')
        expect(actions.length).toBe(1)
    })

    test('Render warning modal cancel button', () => {
        const cancelBtn = warningActionsComponent(component).at(0)
        expect(cancelBtn.length).toBe(1)
    })

    test('Render warning modal cancel button text', () => {
        const cancelBtn = warningActionsComponent(component).at(0)
        expect(cancelBtn.text()).toBe('Cancel')
    })

    test('Trigger callback function on click of cancel', () => {
        const cancelBtn = warningActionsComponent(component).at(0)
        cancelBtn.simulate('click')
        expect(cancelHandler).toHaveBeenCalled()
    })

    test('Render warning modal Save button', () => {
        const saveBtn = warningActionsComponent(component).at(1)
        expect(saveBtn.length).toBe(1)
    })

    test('Render warning modal Save button text', () => {
        const saveBtn = warningActionsComponent(component).at(1)
        expect(saveBtn.text()).toBe('Save & Continue')
    })

    test('Trigger callback function on click of save', () => {
        const saveBtn = warningActionsComponent(component).at(1)
        saveBtn.simulate('click')
        expect(proceedHandler).toHaveBeenCalled()
    })
})
