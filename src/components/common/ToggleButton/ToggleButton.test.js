import React from 'react'
import { mount } from 'enzyme'
import ToggleButton from './ToggleButton'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<ToggleButton {...props} />)
}

describe('Test ToggleButton component', () => {
    let component
    const props = {
        checked: false,
        onChange: jest.fn(),
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Toggle Button component', () => {
        const wrapper = component.find('label')
        expect(wrapper.length).toBe(1)
    })

    test('Should render toggle button with margin top 2 rem', () => {
        const component = SetUp({
            className: 'mt-2',
        })
        const wrapper = findByClassName(component, '.switch.mt-2')
        expect(wrapper.length).toBe(1)
    })

    test('Should render toggle button checked', () => {
        const component = SetUp({
            ...props,
            checked: true,
        })
        const wrapper = component.find('input')
        expect(wrapper.instance().checked).toBeTruthy()
    })

    test('Should call callback function on change of toggle button', () => {
        const wrapper = component.find('input')
        wrapper.simulate('change')
        expect(props.onChange).toHaveBeenCalled()
    })

    test('Should render toggle button label', () => {
        const component = SetUp({
            label: 'Marketing',
            ...props,
        })
        const wrapper = findByClassName(component, '.switch.text')
        expect(wrapper.length).toBe(1)
    })

    test('Should render toggle button label text', () => {
        const component = SetUp({
            label: 'Marketing',
            ...props,
        })
        const wrapper = findByClassName(component, '.switch.text')
        expect(wrapper.text()).toBe('Marketing')
    })
})
