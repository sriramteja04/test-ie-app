import React from 'react'
import { mount } from 'enzyme'
import InputField from './InputField'
import { util } from '../../../util'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<InputField {...props} />)
}

describe('Testing ', () => {
    let component
    const props = {
        onChange: jest.fn(),
        label: 'input-label',
        name: 'input-name',
        inputProps: {
            end: util.SearchIcon,
        },
        value: 'promo',
        size: 'lg',
        error: 'input-error',
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Input field component', () => {
        const wrapper = findByClassName(component, '.input-container')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Input Field component with label', () => {
        const wrapper = findByClassName(component, '.label')
        expect(wrapper.text()).toBe(props.label)
    })
    test('Should render Input Field component with name', () => {
        const wrapper = findByClassName(component, '.input__control')
        expect(wrapper.props().name).toBe(props.name)
    })
    test('Should render Input Field component with lg size', () => {
        const wrapper = findByClassName(component, `.input-container.${props.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render InputField with error', () => {
        const wrapper = findByClassName(component, '.input-container__error-label')
        expect(wrapper.length).toBe(1)
    })

    test('Should render InputField with error message', () => {
        const wrapper = findByClassName(component, '.input-container__error-label')
        expect(wrapper.text()).toBe(props.error)
    })

    test('simulate Input field on Change event handler', () => {
        const wrapper = findByClassName(component, '.input__control')
        wrapper.simulate('change')
        expect(props.onChange).toHaveBeenCalled()
    })

    test('Should render with InputField value', () => {
        const wrapper = findByClassName(component, '.input__control')
        expect(wrapper.props().value).toBe(props.value)
    })

    test('Should render Input Field component with xs size', () => {
        const currProps = { ...props, size: 'xs' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.input-container.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render Input Field component with sm size', () => {
        const currProps = { ...props, size: 'sm' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.input-container.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render Input Field component with md size', () => {
        const currProps = { ...props, size: 'md' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.input-container.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render Input Field component with xl size', () => {
        const currProps = { ...props, size: 'xl' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.input-container.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render Input Field with auto complete off', () => {
        const wrapper = findByClassName(component, '.input__control')
        expect(wrapper.props().autoComplete).toBe('off')
    })
})
