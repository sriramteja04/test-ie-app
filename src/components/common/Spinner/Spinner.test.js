import React from 'react'
import { mount } from 'enzyme'
import Spinner from './Spinner'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Spinner {...props} />)
}

describe('Testing Spinner component ', () => {
    let component
    const props = {
        loading: true,
        isInline: true,
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Spinner with modal specs', () => {
        const component = SetUp({ ...props, modal: true })
        const wrapper = findByClassName(component, '.modal-spinner')
        expect(wrapper.length).toBe(1)
    })

    test('Should render default spinner', () => {
        const wrapper = findByClassName(component, '.spinner')
        expect(wrapper.length).toBe(1)
    })

    test('Should not render spinner if loading is false', () => {
        const component = SetUp({
            ...props,
            loading: false,
        })
        const wrapper = findByClassName(component, '.spinner')
        expect(wrapper.length).toBe(0)
    })

    test('Should render inline spinner view', () => {
        const wrapper = findByClassName(component, '.spinner.in-line-loading')
        expect(wrapper.length).toBe(1)
    })
})
