import React from 'react'
import { mount } from 'enzyme'
import Calendar from './Calendar'
import moment from 'moment'
import { findByClassName } from '../../../util/testUtil'
import { util } from '../../../util'

const SetUp = (props = {}) => {
    return mount(<Calendar {...props} />)
}

const dayWrapper = (component, day) => {
    const wrapper = findByClassName(component, '.cell.grid-date').at(day)
    return findByClassName(wrapper, '.grid-date__day')
}

describe('Testing Calendar component ', () => {
    let component
    const props = {
        currWeek: moment().week(),
        selectedYear: moment().year(),
        renderPlacements: jest.fn(),
        cellClickHandler: jest.fn(),
    }
    const firstDayOfWeek = moment()
        .year(props.selectedYear)
        .week(props.currWeek)
        .day(0)

    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Calendar component', () => {
        const wrapper = findByClassName(component, '.calendar')
        expect(wrapper.length).toBe(1)
    })

    test('Should render 7 days columns', () => {
        const wrapper = findByClassName(component, '.calendar__column')
        expect(wrapper.length).toBe(7)
    })

    test('Should invoke renderPlacements callback', () => {
        expect(props.renderPlacements).toHaveBeenCalled()
    })

    test('Should invoke on column cell click handler', () => {
        const wrapper = findByClassName(component, '.calendar__column')
        wrapper.at(0).simulate('click')
        expect(props.cellClickHandler).toHaveBeenCalled()
    })

    test('Should render first cell with Sunday', () => {
        const day = 0
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render second cell with Monday', () => {
        const day = 1
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render the thrid cell with Tuesday', () => {
        const day = 2
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render the fourth cell with Wednesday', () => {
        const day = 3
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render the fifth cell with Thusday', () => {
        const day = 4
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render the sixth cell with Friday', () => {
        const day = 5
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render the seventh cell with Saturday', () => {
        const day = 6
        const wrapper = dayWrapper(component, day)
        expect(wrapper.text()).toEqual(util.weeks[day])
    })

    test('Should render sunday cell with date', () => {
        const formattedDate = firstDayOfWeek.format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(0)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render monday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(1, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(1)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render tuesday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(2, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(2)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render wednesday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(3, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(3)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render thursday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(4, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(4)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render friday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(5, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(5)
        expect(dateWrapper.text()).toBe(formattedDate)
    })

    test('Should render saturday cell with date', () => {
        const formattedDate = firstDayOfWeek
            .clone()
            .add(6, 'day')
            .format('D')
        const dateWrapper = findByClassName(component, '.grid-date__date').at(6)
        expect(dateWrapper.text()).toBe(formattedDate)
    })
})
