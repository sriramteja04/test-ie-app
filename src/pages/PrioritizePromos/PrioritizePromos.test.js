import React from 'react'
import { mount } from 'enzyme'
import { store } from '../../config/redux'
import { Router } from 'react-router-dom'
import Navigation from '../../util/history'
import { Provider } from 'react-redux'

import PrioritizePromos from './PrioritizePromos'
import * as actions from '../../modules/Promotions/actions'
import { findByClassName } from '../../util/testUtil'
import moment from 'moment'
import { util } from '../../util'
import { Calendar } from '../../components/PrioritizePromos/Calendar'

const SetUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <PrioritizePromos {...props} />
            </Router>
        </Provider>
    )
}

const dayWrapper = (component, day) => {
    const wrapper = findByClassName(component, '.cell.grid-date').at(day)
    return findByClassName(wrapper, '.grid-date__day')
}

describe('Testing PrioritizePromos component ', () => {
    let component
    const currWeekStart = util.getDateFromWeekAndDayNumber(moment().year(), moment().week(), 0)
    const startDate = util.toISOStartOfDate(currWeekStart)
    const endDate = util.toISOEndOfDate(moment(startDate).add(7, 'days'))
    const props = {
        promotions_list: [
            {
                configurations: [
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'CA',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'TX',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'FL',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'all',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'all',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'NY',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'NJ',
                    },
                    {
                        status: 'complete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'CA',
                    },
                ],
                created: '2020-04-23T02:56:13.000Z',
                created_by: 'john.doe@7-11.com',
                is_live: false,
                name: 'free coffee 14',
                promo: 'free coffee 14',
                qa_is_live: false,
                schedule: {
                    start_date: startDate,
                    end_date: endDate,
                    all_day: false,
                },
                status: 'scheduled',
                type: ['marketing'],
                updated: '2020-04-23T02:56:13.000Z',
                updated_by: 'john.doe@7-11.com',
                _id: '7fbe22e4ca5357b570f5ffceb0dff47e',
                priority: 1,
            },
        ],
        promo_loading: false,
        actions: {
            ...actions,
            fetchPromos: jest.fn(),
        },
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    describe('Testing Spinner if promo loading is true', () => {
        test('Should render spinner', () => {
            const component = SetUp({ ...props, promo_loading: true })
            const wrapper = findByClassName(component, '.spinner')
            expect(wrapper.length).toBe(1)
        })
    })

    describe('Testing Prioritize promos component with promos and loading false', () => {
        test('Should render Prioritize promos', () => {
            const wrapper = findByClassName(component, '.prioritize-promos')
            expect(wrapper.length).toBe(1)
        })

        // test('fetchPromos action have been called', () => {
        //     expect(props.actions.fetchPromos).toHaveBeenCalled()
        // })

        test('Should render tile div', () => {
            const wrapper = findByClassName(component, '.prioritize-promos__title')
            expect(wrapper.length).toBe(1)
        })

        test('Should render title text', () => {
            const wrapper = findByClassName(component, '.prioritize-promos__title')
            expect(wrapper.text()).toBe('Promo Prioritization')
        })

        test('Should render calendar container', () => {
            const wrapper = findByClassName(component, '.prioritize-promos__calendar')
            expect(wrapper.length).toBe(1)
        })
    })

    describe('Testing Prioritize promos actions tool-bar', () => {
        test('Should render prioritize promos actions div', () => {
            const wrapper = findByClassName(component, '.actions')
            expect(wrapper.length).toBe(1)
        })

        test('Should render today button', () => {
            const wrapper = findByClassName(component, '.btn')
            expect(wrapper.length).toBe(1)
        })

        test('Should render today button with today text', () => {
            const wrapper = findByClassName(component, '.btn')
            expect(wrapper.text()).toBe('Today')
        })

        test('Should render Double Chevrons', () => {
            const wrapper = findByClassName(component, '.double-chevron')
            expect(wrapper.length).toBe(1)
        })

        test('Should render month representation div', () => {
            const wrapper = findByClassName(component, '.actions__selected-month')
            expect(wrapper.length).toBe(1)
        })

        test('Should render current month string', () => {
            const today = moment().format('MMMM')
            const wrapper = findByClassName(component, '.actions__selected-month')
            expect(wrapper.text()).toMatch(today)
        })
    })

    describe('Testing Prioritization calendar', () => {
        test('Should render Calendar component', () => {
            const wrapper = findByClassName(component, '.calendar')
            expect(wrapper.length).toBe(1)
        })

        test('Should render all 7 days columns', () => {
            const wrapper = findByClassName(component, '.calendar__column')
            expect(wrapper.length).toBe(7)
        })

        test('Should render all 21 calendar cells', () => {
            const wrapper = findByClassName(component, '.cell')
            expect(wrapper.length).toBe(21)
        })

        test('Should render first cell with Sunday', () => {
            const day = 0
            const wrapper = dayWrapper(component, day)
            expect(wrapper.text()).toEqual(util.weeks[day])
        })

        test('Should render Calendar component with current week', () => {
            const currWeek = moment().week()
            const weekProp = component.find(Calendar).props().currWeek
            expect(weekProp).toEqual(currWeek)
        })

        test('Should render Calendar component with current year', () => {
            const currYear = moment().year()
            const selectedYearProp = component.find(Calendar).props().selectedYear
            expect(selectedYearProp).toEqual(currYear)
        })
    })
})
