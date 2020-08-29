import React from 'react'
import { mount } from 'enzyme'
import DoubleChevron from './DoubleChevron'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<DoubleChevron {...props} />)
}

describe('Testing DoubleChevron component ', () => {
    let component
    const compClassName = '.double-chevron'
    const props = {
        backwardClickHandler: jest.fn(),
        forwardClickHandler: jest.fn(),
        forwardDisabled: false,
        backwardDisabled: false,
        renderContent: () => <div className={'content'}>Double Chevron</div>,
        display: 'inline',
        gap: 'md',
        className: 'test-class-name',
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render DoubleChevron component', () => {
        const wrapper = findByClassName(component, compClassName)
        expect(wrapper.length).toBe(1)
    })

    test('Should render with prop class name', () => {
        const wrapper = findByClassName(component, compClassName + `.${props.className}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render back ward icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__backward-icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should render forward icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__forward-icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should render double chevron content', () => {
        const wrapper = findByClassName(component, '.double-chevron__content')
        expect(wrapper.length).toBe(1)
    })

    test('Should call forward onclick when clicking forward chevron icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__forward-icon')
        wrapper.simulate('click')
        expect(props.forwardClickHandler).toHaveBeenCalled()
    })

    test('Should call backward onclick when clicking backward chevron icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__backward-icon')
        wrapper.simulate('click')
        expect(props.backwardClickHandler).toHaveBeenCalled()
    })

    test('Should render with forward icon disabled is props is sending disabled prop value', () => {
        const component = SetUp({ ...props, forwardDisabled: true })
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__forward-icon')
        wrapper.simulate('click')
        expect(props.forwardClickHandler).toHaveReturned(undefined)
    })

    test('Should render with backward icon disabled is props is sending disabled prop value', () => {
        const component = SetUp({ ...props, backwardDisabled: true })
        const wrapper = findByClassName(component, '.svg-icon.double-chevron__backward-icon')
        wrapper.simulate('click')
        expect(props.backwardClickHandler).toHaveReturned(undefined)
    })
})
