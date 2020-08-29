import React from 'react'
import { mount } from 'enzyme'
import { ProgressBar } from '../index'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<ProgressBar {...props} />)
}

describe('Testing Progress Bar Component', () => {
    let component
    const props = {
        percentage: 80,
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render progress-bar', () => {
        const wrapper = findByClassName(component, '.progress-bar')
        expect(wrapper.length).toBe(1)
    })

    test('Should render progress bar status', () => {
        const wrapper = findByClassName(component, '.progress-bar__status')
        expect(wrapper.length).toBe(1)
    })
})
