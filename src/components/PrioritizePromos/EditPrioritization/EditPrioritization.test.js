import React from 'react'
import { mount } from 'enzyme'
import EditPrioritization from './EditPrioritization'
import moment from 'moment'
import * as actions from '../../../modules/Promotions/actions'
import { constants } from '../../../constants'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<EditPrioritization {...props} />)
}

describe('Testing EditPrioritization component ', () => {
    let component
    const props = {
        selectedDate: moment(),
        toggleSideMenu: jest.fn(),
        prioritize_promos: [
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
        update_prioritization_failed: false,
        update_prioritization_success: false,
    }
    beforeEach(() => {
        component = SetUp(props)
    })

    test('Should render EditPrioritization component', () => {
        const wrapper = findByClassName(component, '.edit-prioritization')
        expert(wrapper.length).toBe(1)
    })
})
