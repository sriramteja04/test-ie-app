import React from 'react'
import { mount } from 'enzyme'
import DatePicker from './DatePicker'
import { findByClassName, findByName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<DatePicker {...props} />)
}

describe('Testing DatePicker component', () => {
    let component
    const selectedDate = '07/11/2020'
    const handleDateChange = jest.fn()
    const name = 'start_date'
    const label = 'Start Date'
    const error = 'The selected date is a past date. Please select any date starting from today'
    const size = 'sm'
    beforeEach(() => {
        const props = {
            selectedDate,
            handleDateChange,
            name,
            label,
            error,
            size,
        }
        component = SetUp(props)
    })

    test('Should render Datepicker component', () => {
        const wrapper = findByClassName(component, '.picker')
        expect(wrapper.length).toBe(1)
    })

    test('Should render datepicker with selected date', () => {
        const wrapper = findByName(component, 'start_date').at(0)
        expect(wrapper.props().selectedDate).toBe('07/11/2020')
    })

    test('Should render datepicker with name', () => {
        const wrapper = findByName(component, 'start_date').at(0)
        expect(wrapper.props().name).toBe('start_date')
    })

    test('Should render datepicker with label', () => {
        const wrapper = findByName(component, 'start_date').at(0)
        expect(wrapper.props().label).toBe('Start Date')
    })

    test('Should render datepicker with error', () => {
        const wrapper = findByClassName(component, '.picker__error')
        expect(wrapper.length).toBe(1)
    })

    test('Should render datepicker with error message', () => {
        const wrapper = findByClassName(component, '.picker__error')
        expect(wrapper.text()).toBe(
            'The selected date is a past date. Please select any date starting from today'
        )
    })

    test('Should render datepicker with size', () => {
        const wrapper = findByClassName(component, '.picker.sm')
        expect(wrapper.length).toBe(1)
    })
})
