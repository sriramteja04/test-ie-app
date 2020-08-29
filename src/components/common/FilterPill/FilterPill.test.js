import React from 'react'
import { mount } from 'enzyme'
import FilterPill from './FilterPill'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<FilterPill {...props} />)
}

const filterPillLabelComponent = component => findByClassName(component, '.filter-pill__label')
const filterNameComponent = component => findByClassName(component, '.filter-name')

describe('Test FilterPill component', () => {
    let component, clearPillHandler
    beforeEach(() => {
        const label = 'Search'
        const filterList = ['Free promo']
        clearPillHandler = jest.fn()
        const props = {
            label,
            filterList,
            clearPillHandler,
        }
        component = SetUp(props)
    })

    test('Render Filterpill', () => {
        const wrapper = findByClassName(component, '.filter-pill')
        expect(wrapper.length).toBe(1)
    })

    test('Render filterpill label', () => {
        const wrapper = filterPillLabelComponent(component)
        expect(wrapper.length).toBe(1)
    })

    test('Render filterPill label name', () => {
        const wrapper = filterNameComponent(component)
        expect(wrapper.text()).toBe('Search')
    })

    test('Render filterPill value', () => {
        const wrapper = filterPillLabelComponent(component)
            .find('span')
            .at(2)
        expect(wrapper.text()).toBe('Free promo')
    })

    test('Render clear pill icon', () => {
        const wrapper = component.find('svg')
        expect(wrapper.length).toBe(1)
    })

    test('Trigger callback function on click of clear icon', () => {
        const wrapper = component.find('svg')
        wrapper.simulate('click')
        expect(clearPillHandler).toHaveBeenCalled()
    })

    describe('Render filterpill type - list', () => {
        beforeEach(() => {
            const label = 'Region'
            const filterList = ['Texas, California']
            const type = 'list'
            const props = {
                label,
                filterList,
                type,
            }
            component = SetUp(props)
        })
        test('Render filterPill label name', () => {
            const wrapper = filterNameComponent(component)
            expect(wrapper.text()).toBe('Region')
        })

        test('Render filterPill value', () => {
            const wrapper = filterPillLabelComponent(component)
                .find('span')
                .at(2)
            expect(wrapper.text()).toBe('Texas, California')
        })
    })

    describe('Append 7Now text to placement location filter', () => {
        beforeEach(() => {
            const label = 'App Placement'
            const filterList = ['DealTile']
            const keyPill = 'placement_location'
            const props = {
                label,
                filterList,
                keyPill,
            }
            component = SetUp(props)
        })
        test('Render filterPill label name', () => {
            const wrapper = filterNameComponent(component)
            expect(wrapper.text()).toBe('App Placement')
        })

        test('Render filterPill value', () => {
            const wrapper = filterPillLabelComponent(component)
                .find('span')
                .at(2)
            expect(wrapper.text()).toBe('7Now DealTile')
        })
    })
})
