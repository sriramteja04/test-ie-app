import React from 'react'
import { mount } from 'enzyme'
import Backdrop from './Backdrop'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Backdrop {...props} />)
}

describe('Testing Back drop component', () => {
    let component
    const props = {
        showOpacity: false,
        closeBackdrop: jest.fn(),
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Backdrop', () => {
        const wrapper = findByClassName(component, '.backdrop')
        expect(wrapper.length).toBe(1)
    })

    test('Should not render with opacity', () => {
        const wrapper = findByClassName(component, '.backdrop.showOpacity')
        expect(wrapper.length).toBe(0)
    })

    test('Should call click handler on clicking div backdrop', () => {
        const wrapper = findByClassName(component, '.backdrop')
        wrapper.simulate('click')
        expect(props.closeBackdrop).toHaveBeenCalled()
    })

    test('Should render with opacity', () => {
        const component = SetUp({ ...props, showOpacity: true })
        const wrapper = findByClassName(component, '.backdrop.showOpacity')
        expect(wrapper.length).toBe(1)
    })
})
