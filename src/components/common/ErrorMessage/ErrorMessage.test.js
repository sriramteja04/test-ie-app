import React from 'react'
import { mount } from 'enzyme'
import ErrorMessage from './ErrorMessage'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<ErrorMessage {...props} />)
}

describe('Testing ErrorMessage component ', () => {
    let component
    const props = {
        messages: ['first-line', 'second-line'],
        className: 'test-error-class',
        type: 'warning',
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render ErrorMessage component', () => {
        const wrapper = findByClassName(component, '.error-message')
        expect(wrapper.length).toBe(1)
    })

    test('Should render warning icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.error-message__icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should render error messages test div', () => {
        const wrapper = findByClassName(component, '.error-message__text')
        expect(wrapper.length).toBe(1)
    })

    test('Should render 2 lines of error messages', () => {
        const wrapper = findByClassName(component, '.error-message__text')
        const messages = wrapper.find('p')
        expect(messages.length).toBe(2)
    })
})
