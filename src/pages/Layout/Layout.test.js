import React from 'react'
import { mount } from 'enzyme'
import Layout from './Layout'
import { Provider } from 'react-redux'
import { store } from '../../config/redux'
import { findByClassName } from '../../util/testUtil'
import Navigation from '../../util/history'
import { Router } from 'react-router-dom'

/**
 * Function to create a ShallowWrapper for the Header component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {DeepWrapper of a component}
 */
const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <Layout {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing ', () => {
    let component
    beforeEach(() => {
        component = setUp({
            pathname: '/dashboard/promotions',
        })
    })

    test('Should render Header Component', () => {
        const header = findByClassName(component, '.header')
        expect(header.length).toBe(1)
    })

    test('Should render Breadcrumbs', () => {
        const breadcrumb = findByClassName(component, '.breadCrumb__outline')
        expect(breadcrumb.length).toBe(1)
    })

    test('Should render Side Menu Bar', () => {
        const breadcrumb = findByClassName(component, '.side-menu')
        expect(breadcrumb.length).toBe(1)
    })

    test('Should render Container Component', () => {
        const breadcrumb = findByClassName(component, '.container')
        expect(breadcrumb.length).toBe(1)
    })
})
