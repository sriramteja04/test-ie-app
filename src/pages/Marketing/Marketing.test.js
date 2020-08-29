import React from 'react'
import { mount } from 'enzyme'
import { findByClassName } from '../../util/testUtil'
import Marketing from './Marketing'
import Navigation from '../../util/history'
import { Router } from 'react-router-dom'
import { store } from '../../config/redux'
import { Provider } from 'react-redux'
import * as actions from '../../modules/Promotions/actions'

/**
 * Function to create a ShallowWrapper for the Header component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {Mount}
 */
const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <Marketing {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing MArketing Component', () => {
    window.scrollTo = jest.fn()
    describe('Testing Spinner in marketing page', () => {
        let component
        const props = {
            actions: {
                ...actions,
                updateMarketing: jest.fn(),
                fetchPromoById: jest.fn(),
            },
            promo_loading: true,
            promo_details: {},
            match: {
                params: {
                    promoId: '1234',
                },
            },
        }
        beforeEach(() => {
            component = setUp(props)
        })

        test('Should render Spinner if promo loading is true', () => {
            const wrapper = findByClassName(component, '.spinner')
            expect(wrapper.length).toBe(1)
        })

        test('Should not render marketing sections', () => {
            const wrapper = findByClassName(component, '.marketing')
            expect(wrapper.length).toBe(1)
        })

        test('Should not render promo link', () => {
            const wrapper = findByClassName(component, '.link-item')
            expect(wrapper.length).toBe(1)
        })

        test('Should not render marketing if promo details are null', () => {
            component = setUp({ ...props, promo_details: null })
            const wrapper = findByClassName(component, '.marketing')
            expect(wrapper.length).toBe(0)
        })

        test('Should not render Marketing stepper with no promo details', () => {
            component = setUp({ ...props, promo_details: null })
            const wrapper = findByClassName(component, '.marketing__stepper')
            expect(wrapper.length).toBe(0)
        })
    })

    describe('Testing App Placements Marketing Section', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    configurations: [],
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })

        test('Should render promo link', () => {
            const wrapper = findByClassName(component, '.link-item')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Promo-details page after clicking expand less icon', () => {
            const wrapper = findByClassName(component, '.link-item__expand-icon')
            expect(wrapper)
        })

        test('Should render app placements step number', () => {
            const wrapper = findByClassName(component, '.progress__step')
            expect(wrapper.at(0).text()).toBe('1')
        })

        test('Should render app placements header', () => {
            const wrapper = findByClassName(component, '.step-container__heading')
            expect(wrapper.at(0).text()).toBe('App Placements')
        })

        test('Should render 0 partial content', () => {
            const wrapper = findByClassName(component, '.partial-content')
            expect(wrapper.length).toBe(0)
        })

        test('Should render 0 edit button', () => {
            const wrapper = findByClassName(component, '.partial-content__editable')
            expect(wrapper.length).toBe(0)
        })

        test('Should render App placements', () => {
            const wrapper = findByClassName(component, '.app-placements')
            expect(wrapper.length).toBe(1)
        })

        test('Should render section actions', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            expect(wrapper.length).toBe(1)
        })

        test('Should render only save and continue button', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            const btn = findByClassName(wrapper, '.btn')
            expect(btn.length).toBe(1)
        })
    })

    describe('Testing Schedule Marketing Section', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    configurations: [
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                        },
                    ],
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })

        test('Should render schedule step number', () => {
            const wrapper = findByClassName(component, '.progress__step')
            expect(wrapper.at(1).text()).toBe('2')
        })

        test('Should render app placements header', () => {
            const wrapper = findByClassName(component, '.step-container__heading')
            expect(wrapper.at(1).text()).toBe('Schedule')
        })

        test('Should render [App Placements] partial content', () => {
            console.log('wrapper', component)
            const wrapper = findByClassName(component, '.partial-content')
            expect(wrapper.length).toBe(1)
        })

        test('Should render [App Placements] edit button', () => {
            const wrapper = findByClassName(component, '.partial-content__editable')
            expect(wrapper.length).toBe(1)
        })

        test('Should render App placements after clicking edit button at section 1', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(0).simulate('click')
            const wrapper = findByClassName(component, '.app-placements')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Schedule Section', () => {
            const wrapper = findByClassName(component, '.schedule')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Schedule section actions', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            expect(wrapper.length).toBe(1)
        })

        test('Should render only save and continue button', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            const btn = findByClassName(wrapper, '.btn')
            expect(btn.length).toBe(1)
        })
    })

    describe('Testing Audience Section', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    configurations: [
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Deal Tile',
                        },
                    ],
                    schedule: {
                        all_day: true,
                        start_date: '2020-04-23T05:00:00.000Z',
                        end_date: '2020-04-28T04:59:00.000Z',
                    },
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })
        test('Should render schedule step number', () => {
            const wrapper = findByClassName(component, '.progress__step')
            expect(wrapper.at(2).text()).toBe('3')
        })

        test('Should render app placements header', () => {
            const wrapper = findByClassName(component, '.step-container__heading')
            expect(wrapper.at(2).text()).toBe('Audience')
        })

        test('Should render [App Placements, Schedule] partial contents', () => {
            const wrapper = findByClassName(component, '.partial-content')
            expect(wrapper.length).toBe(2)
        })

        test('Should render [App Placements, Schedule] edit buttons', () => {
            const wrapper = findByClassName(component, '.partial-content__editable')
            expect(wrapper.length).toBe(2)
        })

        test('Should render App placements after clicking edit button at section 1', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(0).simulate('click')
            const wrapper = findByClassName(component, '.app-placements')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Schedule after clicking edit button at section 2', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(1).simulate('click')
            const wrapper = findByClassName(component, '.schedule')
            expect(wrapper.length).toBe(1)
        })

        test('Should render App placements', () => {
            const wrapper = findByClassName(component, '.audience')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Audience section actions', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            expect(wrapper.length).toBe(1)
        })

        test('Should render only save and continue button', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            const btn = findByClassName(wrapper, '.btn')
            expect(btn.length).toBe(1)
        })
    })

    describe('Testing Manage Content Section', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    priority: 3,
                    status: 'incomplete',
                    configurations: [
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                            region: 'all',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Deal Tile',
                            region: 'all',
                        },
                    ],
                    schedule: {
                        all_day: true,
                        start_date: '2020-04-23T05:00:00.000Z',
                        end_date: '2020-04-28T04:59:00.000Z',
                    },
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })
        test('Should render Manage Content step number', () => {
            const wrapper = findByClassName(component, '.progress__step')
            expect(wrapper.at(4).text()).toBe('5')
        })

        test('Should render Manage Content header', () => {
            const wrapper = findByClassName(component, '.step-container__heading')
            expect(wrapper.at(4).text()).toBe('Manage Content')
        })

        test('Should render 3 partial contents', () => {
            const wrapper = findByClassName(component, '.partial-content')
            expect(wrapper.length).toBe(4)
        })

        test('Should render 3 edit buttons', () => {
            const wrapper = findByClassName(component, '.partial-content__editable')
            expect(wrapper.length).toBe(4)
        })

        test('Should render Manage Content Component', () => {
            const wrapper = findByClassName(component, '.manage-content')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Manage Content actions', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            expect(wrapper.length).toBe(1)
        })

        test('Should render only save and continue button', () => {
            const wrapper = findByClassName(component, '.step-container__actions')
            const btn = findByClassName(wrapper, '.btn')
            expect(btn.length).toBe(1)
        })

        test('Should render App placements after clicking edit button at section 1', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(0).simulate('click')
            const wrapper = findByClassName(component, '.app-placements')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Schedule after clicking edit button at section 2', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(1).simulate('click')
            const wrapper = findByClassName(component, '.schedule')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Audience after clicking edit button at section 3', () => {
            const editWrapper = findByClassName(component, '.partial-content__editable')
            editWrapper.at(2).simulate('click')
            const wrapper = findByClassName(component, '.audience')
            expect(wrapper.length).toBe(1)
        })
    })

    describe('Testing Partial Content of Marketing Section', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    configurations: [
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                            region: 'all',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Deal Tile',
                            region: 'all',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                            region: 'California',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Deal Tile',
                            region: 'California',
                        },
                    ],
                    schedule: {
                        all_day: true,
                        start_date: '2020-04-23T05:00:00.000Z',
                        end_date: '2020-04-28T04:59:00.000Z',
                    },
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })

        test('Should render App placements partial content', () => {
            const wrapper = findByClassName(component, '.partial-content__body__app-placements')
            expect(wrapper.length).toBe(1)
        })

        test('Should render two placement location', () => {
            const partialWrapper = findByClassName(
                component,
                '.partial-content__body__app-placements'
            )
            const wrapper = findByClassName(partialWrapper, '.paragraph.block')
            expect(wrapper.length).toBe(2)
        })

        test('Should render schedule partial content', () => {
            const wrapper = findByClassName(component, '.partial-content__body__schedule')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Audience partial content', () => {
            const wrapper = findByClassName(component, '.partial-content__body__audience')
            expect(wrapper.length).toBe(1)
        })

        test('Should render National and Regional Partial Content data', () => {
            const audienceWrapper = findByClassName(component, '.partial-content__body__audience')
            const wrapper = findByClassName(audienceWrapper, '.paragraph')
            expect(wrapper.length).toBe(2)
        })
    })

    describe('Testing promo link', () => {
        let component
        beforeEach(() => {
            const props = {
                actions: {
                    ...actions,
                    updateMarketing: jest.fn(),
                    fetchPromoById: jest.fn(),
                },
                promo_loading: false,
                promo_details: {
                    configurations: [
                        {
                            app: '7Now',
                            placement_location: 'Homepage Carousel',
                            region: 'all',
                        },
                        {
                            app: '7Now',
                            placement_location: 'Deal Tile',
                            region: 'all',
                        },
                    ],
                    status: 'incomplete',
                },
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
            component = findByClassName(component, '.link-item')
        })

        test('Should render promo link', () => {
            expect(component.length).toBe(1)
        })

        test('Should render Promo-details page after clicking expand less icon', () => {
            const wrapper = findByClassName(component, '.link-item__expand-icon').at(1)
            expect(wrapper.length).toBe(1)
        })

        test('Should render Marketing Content', () => {
            const titleWrapper = findByClassName(component, '.paragraph.primary')
            expect(titleWrapper.length).toBe(1)
            expect(titleWrapper.text()).toBe('Marketing / Content')
        })

        test('Should render incomplete status of promo-link', () => {
            const wrapper = findByClassName(component, '.paragraph.italic')
            expect(wrapper.length).toBe(1)
            expect(wrapper.text()).toBe('incomplete')
        })
    })
})
