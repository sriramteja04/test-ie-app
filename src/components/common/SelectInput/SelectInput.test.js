import React from 'react'
import { mount } from 'enzyme'

import SelectInput from './SelectInput'
import { findByClassName } from '../../../util/testUtil'
import { util } from '../../../util'

const SetUp = (props = {}) => {
    return mount(<SelectInput {...props} />)
}

describe('Testing Select Input', () => {
    let component
    const props = {
        onChange: jest.fn(),
        name: 'Select',
        options: [1, 2, 3, 4, 5],
        value: 1,
        placeholder: 'show select',
        error: 'select error',
        inputProps: { end: util.AccessTimeIcon },
        inputType: 'number',
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Select Input', () => {
        const wrapper = findByClassName(component, '.select-input')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Select input container', () => {
        const wrapper = findByClassName(component, '.select-container')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Select drop down', () => {
        const wrapper = findByClassName(component, '.select-container')
        wrapper.simulate('click')
        const optsWrapper = findByClassName(component, '.select-input__dropdown')
        expect(optsWrapper.length).toBe(1)
    })

    test('Should render Select drop down options', () => {
        const wrapper = findByClassName(component, '.select-container')
        wrapper.simulate('click')
        const optsWrapper = findByClassName(component, '.option')
        expect(optsWrapper.length).toBe(props.options.length)
    })

    test('on Clicking option should unmount the selected options', () => {
        const wrapper = findByClassName(component, '.select-container')
        wrapper.simulate('click')
        const optsWrapper = findByClassName(component, '.option').at(0)
        optsWrapper.simulate('click')
        const selectWrapper = findByClassName(component, '.select-input__dropdown')
        expect(selectWrapper.length).toBe(0)
    })

    test('Should render Select Input Value', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().value).toBe(props.value)
    })

    test('Should render Select input name', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().name).toBe(props.name)
    })

    test('Should render Select input container', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().placeholder).toBe(props.placeholder)
    })

    test('Should render Select input with read only', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().readOnly).toBeTruthy()
    })

    test('Should render Select input with input type', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().type).toBe(props.inputType)
    })

    test('Should render Select input Error', () => {
        const wrapper = findByClassName(component, '.select-input__error')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Select Input Error text', () => {
        const wrapper = findByClassName(component, '.select-input__error')
        expect(wrapper.text()).toBe(props.error)
    })

    test('Should render Select Input Icons', () => {
        const wrapper = findByClassName(component, '.select-container__icons')
        expect(wrapper.length).toBe(1)
    })

    test('Should render default Select Input drop icon', () => {
        const props = {
            selectHandler: jest.fn(),
            name: 'Select',
            options: [1, 2, 3, 4, 5],
            value: 1,
            placeholder: 'show select',
            error: 'select error',
            inputType: 'number',
        }
        const wrapper = findByClassName(SetUp(props), '.svg-icon.select-container__drop-icon')
        expect(wrapper.length).toBe(1)
    })
})
