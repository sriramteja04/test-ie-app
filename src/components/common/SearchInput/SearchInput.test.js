import React from 'react'
import { mount } from 'enzyme'
import SearchInput from './SearchInput'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<SearchInput {...props} />)
}

describe('Testing ', () => {
    let component
    const props = {
        label: 'search-label',
        size: 'lg',
        name: 'search-name',
        value: 'TX',
        searchList: ['CA', 'AZ', 'FL', 'TX', 'MO'],
        pillList: ['WA', 'NY'],
        onChange: jest.fn(),
        pillListHandler: jest.fn(),
        removeFilterList: jest.fn(),
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render Search Input Component', () => {
        const wrapper = findByClassName(component, '.search-input')
        expect(wrapper.length).toBe(1)
    })

    test('Should render search input wrapper', () => {
        const wrapper = findByClassName(component, '.search-input__wrapper')
        expect(wrapper.length).toBe(1)
    })

    test('Should render selected list', () => {
        const wrapper = findByClassName(component, '.selected-list')
        expect(wrapper.length).toBe(1)
    })

    test('Should render selected pill list items', () => {
        const wrapper = findByClassName(component, '.selected-list__pill')
        expect(wrapper.length).toBe(props.pillList.length)
    })

    test('Should render selected pill text', () => {
        const wrapper = findByClassName(component, '.selected-list__pill').at(0)
        const textWrapper = wrapper.find('span')
        expect(textWrapper.text()).toBe('WA')
    })

    test('Should render pill cancel icon', () => {
        const wrapper = findByClassName(component, '.selected-list__pill').at(0)
        const cancelIcon = findByClassName(wrapper, '.svg-icon.selected-list__cancel')
        expect(cancelIcon.length).toBe(1)
    })

    test('Should render Search input with name', () => {
        const wrapper = component.find('input')
        expect(wrapper.props().name).toBe(props.name)
    })

    test('Should render Search Input label', () => {
        const wrapper = findByClassName(component, '.label')
        expect(wrapper.text()).toBe(props.label)
    })
})
