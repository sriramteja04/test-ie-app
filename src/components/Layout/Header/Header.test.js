import React from 'react'
import { mount } from 'enzyme'

import Header from './Header'
import { findByClassName, findById } from '../../../util/testUtil'
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'

/**
 * Function to create a ShallowWrapper for the Header component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {DeepWrapper of a component}
 */
const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Header {...props} />
        </Provider>
    )
}

describe('Testing Header Component', () => {
    let component

    beforeEach(() => {
        const props = {
            isUserAuth: false,
            userDetails: {
                name: 'Chris, Jones',
                email: 'chris.jones@7-11.com',
            },
        }
        component = setUp(props)
    })

    describe('Testing header component static values', () => {
        test('Should render Header without errors', () => {
            const wrapper = findByClassName(component, '.header')
            expect(wrapper.length).toBe(1)
        })

        test('Should render header-top bar', () => {
            const wrapper = findByClassName(component, '.header__top-bar')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Admin Portal logo', () => {
            const wrapper = findByClassName(component, '.sevenNowLogo')
            expect(wrapper.length).toBe(1)
        })

        test('Should render hamburger menu', () => {
            const wrapper = component.find({ className: 'menu-icon' })
            expect(wrapper.length).toBe(1)
        })

        test('Should render Admin-Portal heading', () => {
            const wrapper = findByClassName(component, '.toolbar__heading')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Add-Button', () => {
            const wrapper = component.find({ className: 'add-button' })
            expect(wrapper.length).toBe(1)
        })
    })

    describe('Testing user account details', () => {
        test('Should render account icon', () => {
            const wrapper = findByClassName(component, '.accountIcon')
            expect(wrapper.length).toBe(1)
        })

        test('Should open account info modal on click of account icon', () => {
            const wrapper = findByClassName(component, '.userIcon')
            wrapper.simulate('click')
            const accountInfoWrapper = findByClassName(component, '.account_info')
            expect(accountInfoWrapper.length).toBe(1)
        })
    })

    describe('Testing Create New drop down component', () => {
        beforeEach(() => {
            findByClassName(component, '.add-button')
                .at(1)
                .simulate('click')
        })

        test('Should render Drop Down component', () => {
            const wrapper = findByClassName(component, '.menu')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Drop Down Content', () => {
            const wrapper = findByClassName(component, '.menu__content')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Drop Down list after on Click drop down content', () => {
            const wrapper = findByClassName(component, '.menu__list')
            expect(wrapper.length).toBe(1)
        })
    })
})
