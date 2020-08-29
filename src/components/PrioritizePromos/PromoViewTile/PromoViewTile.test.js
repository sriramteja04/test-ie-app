import React from 'react'
import { mount } from 'enzyme'
import PromoViewTile from './PromoViewTile'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<PromoViewTile {...props} />)
}

describe('Testing PromoViewTile component ', () => {
    let component
    const props = {
        name: 'Free Pizza',
        isRegional: true,
        isNational: true,
        color: '#ddd',
        priority: 1,
    }

    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render PromoViewTile component', () => {
        const wrapper = findByClassName(component, '.promo-view-tile')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Promo name element', () => {
        const wrapper = findByClassName(component, '.promo-view-tile__name')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Promo name element', () => {
        const wrapper = findByClassName(component, '.promo-view-tile__name')
        expect(wrapper.text()).toBe(props.name)
    })

    test('Should render regions element', () => {
        const wrapper = findByClassName(component, '.promo-view-tile__details--regions')
        expect(wrapper.length).toBe(1)
    })

    test('Should render both national and regional indicator', () => {
        const wrapper = findByClassName(component, '.region')
        expect(wrapper.length).toBe(2)
    })

    test('Should render only national region', () => {
        const component = SetUp({ ...props, isNational: false })
        const wrapper = findByClassName(component, '.region')
        expect(wrapper.length).toBe(1)
    })

    test('Should render priority element', () => {
        const wrapper = findByClassName(component, '.promo-view-tile__details--priority')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Priority icon', () => {
        const wrapper = findByClassName(component, '.svg-icon.priority-icon')
        expect(wrapper.length).toBe(1)
    })

    test('Should render priority value', () => {
        const wrapper = findByClassName(component, '.promo-view-tile__details--priority')
        const priorityValue = wrapper.find('p')
        expect(priorityValue.text()).toBe(props.priority.toString())
    })

    test('Should render priority if props is of homepage carosel tile', () => {
        const updatedProps = { ...props }
        delete updatedProps.priority
        const component = SetUp(updatedProps)
        const wrapper = findByClassName(component, '.promo-view-tile__details--priority')
        expect(wrapper.length).toBe(0)
    })

    test('Should render tile with color', () => {
        const wrapper = findByClassName(component, '.promo-view-tile')
        expect(wrapper.props().style.borderLeft).toMatch(props.color)
    })
})
