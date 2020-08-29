import React from 'react'
import { mount } from 'enzyme'
import ToastMessage from '../ToastMessage'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<ToastMessage {...props} />)
}

describe('Testing ToastMessage component', () => {
    let component
    const message = 'Promo is successfully deleted'
    beforeEach(() => {
        const props = {
            message,
        }
        component = SetUp(props)
    })

    test('Should render toast message component', () => {
        const wrapper = findByClassName(component, '.toast_msg')
        expect(wrapper.length).toBe(1)
    })

    test('Should render circle icon', () => {
        const wrapper = component.find('svg')
        expect(wrapper.length).toBe(1)
    })

    test('Should render message', () => {
        const wrapper = findByClassName(component, '.msg')
        expect(wrapper.length).toBe(1)
    })

    test('Should render correct message passed as prop', () => {
        const wrapper = findByClassName(component, '.msg')
        expect(wrapper.text()).toBe(message)
    })
})
