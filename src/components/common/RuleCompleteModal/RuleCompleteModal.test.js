import React from 'react'
import { mount } from 'enzyme'
import RuleCompleteModal from './RuleCompleteModal'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<RuleCompleteModal {...props} />)
}

describe('Test RuleCompleteModal component', () => {
    let component
    const close = jest.fn()
    beforeEach(() => {
        component = SetUp({ close })
    })

    test('Should render RuleCompleteModal component', () => {
        const wrapper = findByClassName(component, '.modal__background')
        expect(wrapper.length).toBe(1)
    })

    describe('Test RuleComplete Modal content', () => {
        let wrapper
        beforeEach(() => {
            wrapper = findByClassName(component, '.rule_complete_content')
        })

        test('Should render modal content', () => {
            expect(wrapper.length).toBe(1)
        })

        test('Should render circle icon', () => {
            const icon = wrapper.find('svg')
            expect(icon.length).toBe(1)
        })

        test('Should render content text', () => {
            const content = wrapper.find('p')
            expect(content.text()).toBe('MARKETING RULE COMPLETED')
        })
    })

    describe('Test Confirmation Modal actions', () => {
        let ActionWrapper
        beforeEach(() => {
            ActionWrapper = findByClassName(component, '.modal__actions')
        })

        test('Should render modal actions', () => {
            expect(ActionWrapper.length).toBe(1)
        })

        test('Should render close button', () => {
            const closeBtn = ActionWrapper.find('button')
            expect(closeBtn.length).toBe(1)
        })

        test('Should render close button text', () => {
            const closeBtn = ActionWrapper.find('button')
            expect(closeBtn.text()).toBe('CLOSE')
        })

        test('Should trigger callback function on click of close button', () => {
            const closeBtn = ActionWrapper.find('button')
            closeBtn.simulate('click')
            expect(close).toHaveBeenCalled()
        })
    })
})
