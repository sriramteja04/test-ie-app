import React from 'react'
import { mount } from 'enzyme'
import Layout from '../../../pages/Layout'
import { findByClassName } from '../../../util/testUtil'
import { Router } from 'react-router-dom'
import history from '../../../util/history'
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'

const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={history}>
                <Layout {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing the SideMenu Component', () => {
    let component
    beforeEach(() => {
        const props = {
            toggleSideMenu: jest.fn(),
            pathname: '/',
        }
        component = setUp(props)
    })
    describe('Testing SideMenu', () => {
        test('Should render Menu Icon', () => {
            const wrapper = component.find({ className: 'menu-icon' })
            expect(wrapper.length).toBe(1)
        })

        test('Should render Side menu bar after clicking on the menu-con', () => {
            const wrapper = findByClassName(component, '.menu-icon').at(1)
            wrapper.simulate('click')
            const sideWrapper = findByClassName(component, '.side-drawer')
            expect(sideWrapper.length).toBe(1)
        })
    })

    // describe('Testing side menu bar component', () => {
    //     beforeEach(() => {
    //         findByClassName(component, '.menu-icon')
    //             .at(1)
    //             .simulate('click')
    //     })
    //
    //     test('Should render menu bar component', () => {
    //         const wrapper = findByClassName(component, '.menu-bar')
    //         expect(wrapper.length).toBe(1)
    //     })
    //
    //     test('Should render all the menus in side bar', () => {
    //         const wrapper = findByClassName(component, '.menu-bar__item')
    //         expect(wrapper.length).toBe(2)
    //     })
    // })
})
