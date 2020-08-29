import React from 'react'
import { mount } from 'enzyme'

import { findByClassName } from '../../../util/testUtil'
import Alert from './Alert'

const SetUp = (props = {}) => {
    return mount(<Alert {...props} />)
}

describe('Testing Alert Component', () => {
    let component
    const closeAlertHandler = jest.fn()
    const description = 'Alert Description'
    const title = 'Alert Title'
    beforeEach(() => {
        const props = {
            closeAlertHandler,
            description,
            type: 'warning',
            title,
        }
        component = SetUp(props)
    })

    test('Should render Alert Component', () => {
        const wrapper = findByClassName(component, '.alert')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Alert indicator Icon', () => {
        const wrapper = findByClassName(component, '.alert__icon')
        expect(wrapper.exists()).toBe(true)
    })

    test('Should render Alert close Icon', () => {
        const wrapper = findByClassName(component, '.alert__close-icon')
        expect(wrapper.exists()).toBe(true)
    })

    test('Should render Alert Content', () => {
        const wrapper = findByClassName(component, '.alert__content')
        expect(wrapper.exists()).toBe(true)
    })

    test('Should render Alert title', () => {
        const wrapper = findByClassName(component, '.alert__content--title')
        expect(wrapper.text()).toBe(title)
    })

    test('Should render Alert description', () => {
        const wrapper = findByClassName(component, '.alert__content--description')
        expect(wrapper.text()).toBe(description)
    })

    test('testing close icon click handler', () => {
        const wrapper = findByClassName(component, '.svg-icon.alert__close-icon')
        wrapper.simulate('click')
        expect(closeAlertHandler).toHaveBeenCalled()
    })
})
