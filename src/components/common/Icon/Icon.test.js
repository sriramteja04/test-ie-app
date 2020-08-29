import React from 'react'
import { mount } from 'enzyme'
import Icon from './Icon'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Icon {...props} />)
}

describe('Testing ', () => {
    let component
    const props = {
        renderIcon: jest.fn(),
        size: 'lg',
        color: 'success',
        display: 'inline',
        pointer: true,
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Icon Component', () => {
        const wrapper = findByClassName(component, '.svg-icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should invoke renderIcon callback', () => {
        expect(props.renderIcon).toHaveBeenCalled()
    })

    test('Should render with lg size', () => {
        const wrapper = findByClassName(component, '.svg-icon.lg')
        expect(wrapper.length).toBe(1)
    })

    test('Should render with sm size', () => {
        const currProps = { ...props, size: 'sm' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render with xxs size', () => {
        const currProps = { ...props, size: 'xxs' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })
    test('Should render with xs size', () => {
        const currProps = { ...props, size: 'xs' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })
    test('Should render with md size', () => {
        const currProps = { ...props, size: 'md' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })
    test('Should render with xxxs size', () => {
        const currProps = { ...props, size: 'xxxs' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })
    test('Should render with xl size', () => {
        const currProps = { ...props, size: 'xl' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })
    test('Should render with xxl size', () => {
        const currProps = { ...props, size: 'xxl' }
        const component = SetUp(currProps)
        const wrapper = findByClassName(component, `.svg-icon.${currProps.size}`)
        expect(wrapper.length).toBe(1)
    })

    test('Should render with success color', () => {
        const wrapper = findByClassName(component, '.svg-icon.success')
        expect(wrapper.length).toBe(1)
    })

    test('Should render with lg size', () => {
        const wrapper = findByClassName(component, '.svg-icon.inline')
        expect(wrapper.length).toBe(1)
    })
})
