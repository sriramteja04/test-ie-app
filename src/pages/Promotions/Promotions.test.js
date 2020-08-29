import React from 'react'
import { mount } from 'enzyme'

import { Router } from 'react-router-dom'
import history from '../../util/history'
import { findByClassName, findByName, findById } from '../../util/testUtil'
import { store } from '../../config/redux'
import { Provider } from 'react-redux'
import Promotions from './Promotions'
import * as actions from '../../modules/Filters/actions'

const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={history}>
                <Promotions {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing Promotions component', () => {
    let component, wrapper
    const props = {
        applied_filters: [
            {
                type: 'string',
                key: 'name',
                display_name: 'Search',
                display_value: '',
                post_value: '',
            },
            {
                type: 'range',
                key: 'date_range',
                display_name: 'Date Range',
                start_value: '',
                end_value: '',
                display_value: '',
            },
            {
                type: 'list',
                key: 'created_by',
                display_name: 'Created By',
                display_value: [],
                post_value: [],
            },
            {
                type: 'list',
                key: 'updated_by',
                display_name: 'Last Modified By',
                display_value: [],
                post_value: [],
            },
            {
                type: 'list',
                key: 'status',
                display_name: 'Status',
                display_value: [],
                post_value: [],
            },
            {
                type: 'list',
                key: 'is_live',
                display_name: 'Production Status',
                display_value: [],
                post_value: [],
            },
        ],
        count: 10,
        actions: {
            ...actions,
            updatePromotionFilters: jest.fn(),
            clearAllFilters: jest.fn(),
        },
    }
    beforeEach(() => {
        component = setUp(props)

        wrapper = findByClassName(component, '.promotions')
    })
    test('render promotions component', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    describe('Test Search functionality', () => {
        let searchInput, searchWrapper
        beforeEach(() => {
            searchWrapper = findByClassName(component, '.table-toolbar__search')
            searchInput = findByClassName(searchWrapper, '.input__control').at(0)
            searchInput.simulate('change', { target: { value: 'free' } })
        })
        test('render search icon', () => {
            expect(searchInput.length).toBe(1)
        })
        test('test search onChange', () => {
            searchWrapper = findByClassName(component, '.table-toolbar__search')
            searchInput = findByClassName(searchWrapper, '.search').at(0)
            expect(searchInput.props().value).toEqual('free')
        })
        test('test simulate search enter key', () => {
            searchInput.simulate('keyUp', { keyCode: 13 })
            expect(props.actions.updatePromotionFilters).toHaveBeenCalled()
        })

        describe('test execute search', () => {
            let filterPill
            const props = {
                applied_filters: [
                    {
                        type: 'string',
                        key: 'name',
                        display_name: 'Search',
                        display_value: 'free',
                        post_value: 'free',
                    },
                    {
                        type: 'range',
                        key: 'date_range',
                        display_name: 'Date Range',
                        start_value: '',
                        end_value: '',
                        display_value: '',
                    },
                    {
                        type: 'list',
                        key: 'created_by',
                        display_name: 'Created By',
                        display_value: [],
                        post_value: [],
                    },
                    {
                        type: 'list',
                        key: 'updated_by',
                        display_name: 'Last Modified By',
                        display_value: [],
                        post_value: [],
                    },
                    {
                        type: 'list',
                        key: 'status',
                        display_name: 'Status',
                        display_value: [],
                        post_value: [],
                    },
                    {
                        type: 'list',
                        key: 'is_live',
                        display_name: 'Production Status',
                        display_value: [],
                        post_value: [],
                    },
                ],
                count: 5,
                actions: {
                    ...actions,
                    updatePromotionFilters: jest.fn(),
                    clearAllFilters: jest.fn(),
                },
            }
            beforeEach(() => {
                component = setUp(props)

                wrapper = findByClassName(component, '.promotions')
                filterPill = findByClassName(component, '.filter-pill')
            })
            test('test render search pill', () => {
                expect(filterPill.length).toBe(1)
            })
            test('test filter pill', () => {
                const label = findByClassName(filterPill, '.filter-name')
                expect(label.text()).toEqual('Search')
            })
            test('test filter pill value', () => {
                const filterPillValue = findByClassName(filterPill, '.filter-pill__label')
                    .find('span')
                    .at(2)
                expect(filterPillValue.text()).toEqual('free')
            })
        })
    })
    describe('Test Promotions filter', () => {
        let buttonWrapper
        beforeEach(() => {
            buttonWrapper = findByClassName(component, '.filter-btn').at(1)
            buttonWrapper.simulate('click')
        })
        test('Should render Filter icon', () => {
            expect(buttonWrapper.length).toBe(1)
        })
        test('Should open side menu', () => {
            const wrapper = findByClassName(component, '.side-menu')
            expect(wrapper.length).toBe(1)
        })

        describe('Test filter header', () => {
            test('should render promotions filter', () => {
                const promotionsFilter = findByClassName(component, '.filter-menu')
                expect(promotionsFilter.length).toBe(1)
            })
            test('should render filter by text', () => {
                const filterBy = findByClassName(component, '.filterBy')
                expect(filterBy.length).toBe(1)
            })
            test('should not render Clear All button', () => {
                const filterClearAll = findByClassName(component, '.clearAllBtn').at(0)
                expect(filterClearAll.length).toBe(0)
            })
            test('should render close icon', () => {
                const filterCloseIcon = findByClassName(component, '.filterCloseIcon').at(0)
                expect(filterCloseIcon.length).toBe(1)
            })
        })

        describe('Test Filter Routes', () => {
            test('Render Date Range field', () => {
                const startDate = component.find('[name="startDate"]').find('input')
                expect(startDate.length).toBe(1)
                const endDate = component.find('[name="endDate"]').find('input')
                expect(endDate.length).toBe(1)
            })

            test('Render Created By field', () => {
                const createdBy = component.find('[name="created_by"]').find('input')
                expect(createdBy.length).toBe(1)
            })

            test('Render Last Modified By field', () => {
                const lastModifiedBy = component.find('[name="updated_by"]').find('input')
                expect(lastModifiedBy.length).toBe(1)
            })

            test('Render Marketing Status fields', () => {
                const marketingStatus = component.find('[name="status"]').find('input')
                expect(marketingStatus.length).toBe(4)
            })

            test('Render Published Status fields', () => {
                const publishedStatus = component.find('[name="is_live"]').find('input')
                expect(publishedStatus.length).toBe(2)
            })

            test('Render App Placements fields', () => {
                const placementFields = component.find('[name="placement_location"]').find('input')
                expect(placementFields.length).toBe(2)
            })

            test('Render Region search field', () => {
                const region = component
                    .find('[name="region"]')
                    .at(0)
                    .find('input')
                expect(region.length).toBe(1)
            })

            test('Render National field', () => {
                const region = component
                    .find('[name="region"]')
                    .at(1)
                    .find('input')
                expect(region.length).toBe(1)
            })

            test('Render QA Status fields', () => {
                const QAStatusFields = component.find('[name="qa_is_live"]').find('input')
                expect(QAStatusFields.length).toBe(2)
            })
        })

        describe('Render filter actions', () => {
            let filterActionsWrapper, buttonWrapper
            beforeEach(() => {
                filterActionsWrapper = findByClassName(component, '.filter_actions')
                buttonWrapper = findByClassName(filterActionsWrapper, '.btn')
            })
            test('should render cancel button', () => {
                expect(buttonWrapper.at(0).exists()).toBeTruthy()
            })
            test('should enable cancel button', () => {
                expect(buttonWrapper.at(0).props().disabled).toBeFalsy()
            })
            test('should render apply button', () => {
                expect(buttonWrapper.at(1).exists()).toBeTruthy()
            })
            test('should not enable apply button', () => {
                expect(buttonWrapper.at(1).props().disabled).toBeTruthy()
            })
        })

        describe('Test enable Apply button if a filter is selected', () => {
            let statusField, buttonWrapper
            beforeEach(() => {
                statusField = findById(component, 'scheduled').at(1)
                statusField.simulate('change', {
                    target: { checked: true, name: 'status' },
                })
                const filterActionsWrapper = findByClassName(component, '.filter_actions')
                buttonWrapper = findByClassName(filterActionsWrapper, '.btn').at(1)
            })
            test('should enable apply button', () => {
                expect(buttonWrapper.props().disabled).toBeFalsy()
            })
            test('simulate apply action', () => {
                buttonWrapper.simulate('click')
                expect(props.actions.updatePromotionFilters).toHaveBeenCalled()
            })
        })

        describe('Test if filters are applied', () => {
            let createdByField, filterPill
            const props = {
                applied_filters: [
                    {
                        type: 'string',
                        key: 'name',
                        display_name: 'Search',
                        display_value: '',
                        post_value: '',
                    },
                    {
                        type: 'range',
                        key: 'date_range',
                        display_name: 'Date Range',
                        start_value: '',
                        end_value: '',
                        display_value: '',
                    },
                    {
                        type: 'list',
                        key: 'created_by',
                        display_name: 'Created By',
                        display_value: ['John'],
                        post_value: ['John'],
                    },
                    {
                        type: 'list',
                        key: 'updated_by',
                        display_name: 'Last Modified By',
                        display_value: [],
                        post_value: [],
                    },
                    {
                        type: 'list',
                        key: 'status',
                        display_name: 'Status',
                        display_value: [],
                        post_value: [],
                    },
                    {
                        type: 'list',
                        key: 'is_live',
                        display_name: 'Production Status',
                        display_value: [],
                        post_value: [],
                    },
                ],
                count: 5,
                actions: {
                    ...actions,
                    updatePromotionFilters: jest.fn(),
                    clearAllFilters: jest.fn(),
                },
            }
            beforeEach(() => {
                component = setUp(props)

                wrapper = findByClassName(component, '.promotions')
                filterPill = findByClassName(component, '.filter-pill')
            })
            test('should render filter pill', () => {
                expect(filterPill.length).toBe(1)
            })
            test('should display filter pill label', () => {
                const label = findByClassName(filterPill, '.filter-name')
                expect(label.text()).toEqual('Created By')
            })
            test('should render x icon in filter pill', () => {
                const closePill = findByClassName(filterPill, '.svg-icon')
                expect(closePill.length).toBe(1)
            })
            test('should display filter pill value', () => {
                const filterPillValue = findByClassName(filterPill, '.filter-pill__label')
                    .find('span')
                    .at(2)
                expect(filterPillValue.text()).toEqual('John')
            })
            describe('should enable clear all button inside side menu if filters are applied', () => {
                let clearAllWrapper, filterWrapper
                beforeEach(() => {
                    const wrapper = findByClassName(component, '.filter-btn').at(0)
                    wrapper.simulate('click')
                    filterWrapper = findByClassName(component, '.filter-container')
                    clearAllWrapper = findByClassName(filterWrapper, '.clearAllBtn').at(0)
                })
                test('render clear all button', () => {
                    expect(clearAllWrapper.length).toBe(1)
                })
                test('clear all applied fields if clear all button is clicked', () => {
                    clearAllWrapper.simulate('click')
                    createdByField = findByName(component, 'created_by').at(1)
                    expect(createdByField.props().value).toEqual('')
                })
                test('should enable apply button', () => {
                    const filterActionsWrapper = findByClassName(component, '.filter_actions')
                    const buttonWrapper = findByClassName(filterActionsWrapper, '.btn')
                    expect(buttonWrapper.at(1).props().disabled).toBeFalsy()
                })
            })

            describe('Test remove a filter pill', () => {
                beforeEach(() => {
                    const closePill = findByClassName(filterPill, '.svg-icon')
                    closePill.simulate('click')
                })
                test('should dispatch action to update filters', () => {
                    expect(props.actions.updatePromotionFilters).toHaveBeenCalled()
                })
            })

            describe('Test Clear All pills,', () => {
                let clearAllBtn, filterPillList
                beforeEach(() => {
                    filterPillList = findByClassName(component, '.table-toolbar__pill-list')
                    clearAllBtn = filterPillList.find('button')
                    clearAllBtn.simulate('click')
                })
                test('render clear all button', () => {
                    expect(clearAllBtn.length).toBe(1)
                })
                test('should dispatch action to clear all filters', () => {
                    expect(props.actions.clearAllFilters).toHaveBeenCalled()
                })
            })
        })
    })
})
