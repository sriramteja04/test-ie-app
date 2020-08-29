import React from 'react'
import { Router } from 'react-router-dom'
import { mount, shallow } from 'enzyme'
import BreadCrumb from './BreadCrumb'
import { findByClassName } from '../../../util/testUtil'
import { Provider } from 'react-redux'
import Navigation from '../../../util/history'
import { store } from '../../../config/redux'

const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <BreadCrumb {...props} />
            </Router>
        </Provider>
    )
}

describe('BreadCrumb Component default path', () => {
    let wrapper

    beforeEach(() => {
        const props = {
            paths: '/',
            promo_details: {},
        }
        wrapper = setUp(props)
    })

    test('should render Dashboard pages', () => {
        const currentPage = findByClassName(wrapper, '.breadCrumb__currentPage')
        expect(currentPage.length).toBe(1)
        // expect(currentPage.text().includes('Dashboard')).toBe(true)
    })

    test('should not render previous pages', () => {
        const prevPage = findByClassName(wrapper, '.breadCrumb__prevPage')
        expect(prevPage.length).toBe(0)
    })
})

describe('BreadCrumb Component Promotions pages', () => {
    let wrapper

    beforeEach(() => {
        const props = {
            paths: '/dashboard/promotions',
        }
        wrapper = setUp(props)
    })

    test('should render forward icon', () => {
        const forwardIcon = findByClassName(wrapper, '.breadCrumb__arrow')
        expect(forwardIcon.exists).toBeTruthy()
    })

    test('should not render Promotion pages', () => {
        const currentPage = findByClassName(wrapper, '.breadCrumb__currentPage')
        expect(currentPage.length).toBe(1)
        expect(currentPage.text().includes('promotions')).toBe(true)
    })
})
