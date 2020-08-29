import React from 'react'
import { mount } from 'enzyme'
import Radio from './Radio'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Radio {...props} />)
}

describe('Testing Radio Component', () => {
    let component
    let inputWrapper
    const props = {
        id: 'radio-id',
        onChange: jest.fn(),
        checked: false,
        label: 'Radio-Button',
        name: 'Radio-name',
    }
    beforeEach(() => {
        component = SetUp(props)
        inputWrapper = component.find('input')
    })

    test('Should render Radio component', () => {
        const wrapper = findByClassName(component, '.radioButton')
        expect(wrapper.length).toBe(1)
    })

    test('Should render input element', () => {
        expect(inputWrapper.length).toBe(1)
    })

    test('Should render radio label text', () => {
        const wrapper = component.find('label')
        expect(wrapper.text()).toBe(props.label)
    })

    test('Should call props onChange callback on changing radio components radio button ', () => {
        inputWrapper.simulate('change')
        expect(props.onChange).toHaveBeenCalled()
    })
})
