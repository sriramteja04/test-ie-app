import React from 'react'
import { mount } from 'enzyme'
import AccountInfo from './AccountInfo'
import { findByClassName } from '../../../util/testUtil'

const setUp = (props = {}) => {
    return mount(<AccountInfo {...props} />)
}

describe('AccountInfo Component', () => {
    let component

    beforeEach(() => {
        const props = {
            userDetails: {
                name: 'Chris, Jones',
                email: 'chris.jones@7-11.com',
            },
        }
        component = setUp(props)
        findByClassName(component, '.userIcon').simulate('click')
    })

    test('Render user initials', () => {
        const wrapper = findByClassName(component, '.account_info__userIcon')
        expect(wrapper.length).toBe(1)
        expect(wrapper.text()).toEqual('JC')
    })

    test('Render user name', () => {
        const wrapper = findByClassName(component, '.name')
        expect(wrapper.length).toBe(1)
        expect(wrapper.text()).toEqual('Chris, Jones')
    })

    test('Render user email', () => {
        const wrapper = findByClassName(component, '.email')
        expect(wrapper.length).toBe(1)
        expect(wrapper.text()).toEqual('chris.jones@7-11.com')
    })

    test('Render logout Icon', () => {
        const wrapper = findByClassName(component, '.account_info__logout__icon')
        expect(wrapper.length).toBe(1)
    })

    test('Render logout text', () => {
        const wrapper = findByClassName(component, '.account_info__logout__text')
        expect(wrapper.length).toBe(1)
    })
})
