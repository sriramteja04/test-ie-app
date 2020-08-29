import React from 'react'
import { mount } from 'enzyme'
import BulkEdit from './BulkEdit'
import { findByClassName } from '../../../util/testUtil'
import Button from '../Button'

const SetUp = (props = {}) => {
    return mount(<BulkEdit {...props} />)
}

const Delete = () => {
    return (
        <Button className={'delete mr-4'} color={'transparent'} onClick={() => jest.fn()}>
            Delete
        </Button>
    )
}

const selectedRecords = [
    {
        configurations: [],
        created: '2020-04-23T03:16:09.000Z',
        created_by: 'john.doe@7-11.com',
        is_live: false,
        name: 'Free Pizza Delivery',
        promo: 'promo detail',
        qa_is_live: false,
        schedule: {
            start_date: '2020-04-23T03:30:00.000Z',
            end_date: '2020-04-23T04:30:00.000Z',
            all_day: false,
        },
        status: 'incomplete',
        type: ['marketing'],
        updated: '2020-04-23T03:16:09.000Z',
        updated_by: 'john.doe@7-11.com',
        _id: 'ac3e46c54f92788154f0a96623b16362',
        promo_loading: false,
    },
]

describe('Testing BulkEdit component', () => {
    let component
    const clearSelection = jest.fn()
    const selectAll = selectedRecords
    const children = Delete()
    beforeEach(() => {
        const props = {
            clearSelection,
            selectAll,
            children,
        }
        component = SetUp(props)
    })

    test('Should render BulkEdit component', () => {
        const wrapper = findByClassName(component, '.bulk-edit')
        expect(wrapper.length).toBe(1)
    })

    test('Should render BulkEdit records', () => {
        const wrapper = findByClassName(component, '.bulk-edit__records')
        expect(wrapper.length).toBe(1)
    })

    test('Should render BulkEdit records with number of records selected', () => {
        const wrapper = findByClassName(component, '.bulk-edit__records')
        expect(wrapper.text()).toBe('1 item(s) selected')
    })

    test('Should render BulkEdit actions', () => {
        const wrapper = findByClassName(component, '.bulk-edit__actions')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Clear button', () => {
        const wrapper = findByClassName(component, '.clear').at(0)
        expect(wrapper.length).toBe(1)
    })

    test('Should trigger callback function on click of clear button', () => {
        const wrapper = findByClassName(component, '.clear').at(0)
        wrapper.simulate('click')
        expect(clearSelection).toHaveBeenCalled()
    })

    test('Should render children', () => {
        const wrapper = findByClassName(component, '.delete').at(0)
        expect(wrapper.length).toBe(1)
    })
})
