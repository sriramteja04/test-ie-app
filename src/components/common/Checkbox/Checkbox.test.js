import React from 'react'
import { mount } from 'enzyme'

import Checkbox from './Checkbox'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<Checkbox {...props} />)
}

describe('Testing Checkbox Component', () => {
    describe('Testing Checkbox UI', () => {
        let component
        const onChange = jest.fn()
        const label = 'checkbox-label'
        beforeEach(() => {
            const props = {
                checked: false,
                onChange: onChange,
                label: label,
            }
            component = SetUp(props)
        })

        test('Should render Checkbox', () => {
            const wrapper = findByClassName(component, '.checkbox')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Checkbox label', () => {
            const wrapper = findByClassName(component, '.checkbox-label')
            expect(wrapper.text()).toBe(label)
        })
    })
})
