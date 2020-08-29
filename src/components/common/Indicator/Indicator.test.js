import React from 'react'
import { mount } from 'enzyme'
import Indicator from './Indicator'
import { util } from '../../../util'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Indicator {...props} />)
}

describe('Testing ', () => {
    let component
    const props = {
        size: 'sm',
        color: 'success',
        img: util.FiberManualRecordIcon,
        label: 'marketing',
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Indicator Component', () => {
        const wrapper = findByClassName(component, '.indicator')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Indicator icon', () => {
        const wrapper = findByClassName(component, '.svg-icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Indicator label', () => {
        const wrapper = findByClassName(component, '.indicator__label')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Indicator label text', () => {
        const wrapper = findByClassName(component, '.indicator__label')
        expect(wrapper.text()).toBe(props.label)
    })

    test('Should render Indicator icon with success color', () => {
        const wrapper = findByClassName(component, '.svg-icon.success')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Indicator icon with small size', () => {
        const wrapper = findByClassName(component, '.svg-icon.sm')
        expect(wrapper.length).toBe(1)
    })
})
