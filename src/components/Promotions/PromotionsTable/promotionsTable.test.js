import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { Router } from 'react-router-dom'
import history from '../../../util/history'
import { findByClassName, findByName } from '../../../util/testUtil'
import PromotionsTable from './PromotionsTable'
import { store } from '../../../config/redux'
import { Provider } from 'react-redux'
import * as actions from '../../../modules/Promotions/actions'

/**
 * Function to create a ShallowWrapper for the Header component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={history}>
                <PromotionsTable {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing Promotions Component', () => {
    let component
    const props = {
        promotions_list: [
            {
                configurations: [
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'CA',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'TX',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'FL',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Homepage Carousel',
                        region: 'all',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'all',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'NY',
                    },
                    {
                        status: 'incomplete',
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'NJ',
                    },
                    {
                        status: 'incomplete',
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
                    start_date: '2020-04-23T03:00:00.000Z',
                    end_date: '2020-04-23T04:00:00.000Z',
                    all_day: false,
                },
                status: 'incomplete',
                type: ['marketing'],
                updated: '2020-04-23T02:56:13.000Z',
                updated_by: 'john.doe@7-11.com',
                _id: '7fbe22e4ca5357b570f5ffceb0dff47e',
            },
        ],
        promo_loading: false,
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
        pageNo: 1,
        display_promo_alert: '',
        actions: {
            ...actions,
            clearPromoAlert: jest.fn(),
            fetchPromos: jest.fn(),
            bulkDeletePromos: jest.fn(),
            publishContent: jest.fn(),
            updateInlineEdit: jest.fn(),
        },
        sort_order: 'start_date',
        sort_orderBy: 'asc',
        promotions_head_cells: [
            { id: 'name', label: 'Content Title', draggable: false, width: '13%' },
            { id: 'show_at', label: 'Placements', draggable: true, width: '13%' },
            { id: 'start_date', label: 'Date', draggable: true, width: '12%', sortable: true },
            { id: 'state', label: 'Audience', draggable: true, width: '10%' },
            { id: 'status', label: 'Status', draggable: true, width: '12%', sortable: true },
            {
                id: 'qa_is_live',
                label: 'QA Testing',
                draggable: true,
                width: '10%',
                sortable: true,
            },
            { id: 'is_live', label: 'Prod', draggable: true, width: '4%', sortable: true },
            { id: 'action', label: 'Action', draggable: false, width: '4%' },
        ],
    }
    beforeEach(() => {
        component = setUp(props)
    })

    describe('Testing Promotions Table component', () => {
        beforeEach(() => {
            component = findByClassName(component, '.table')
        })

        test('Should call fetch promos saga ', () => {
            expect(props.actions.fetchPromos).toHaveBeenCalled()
        })

        test('Should render Table', () => {
            expect(component.length).toBe(1)
        })

        test('Should render Table Head', () => {
            const wrapper = findByClassName(component, '.table__head')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Table Routes', () => {
            const wrapper = findByClassName(component, '.table__body')
            expect(wrapper.length).toBe(1)
        })

        test('Should render table head row', () => {
            const tableHeadWrapper = findByClassName(component, '.table__head')
            const wrapper = findByClassName(tableHeadWrapper, '.table-row')
            expect(wrapper.length).toBe(1)
        })

        test('Should render table head checkbox', () => {
            const tableHeadWrapper = findByClassName(component, '.table__head')
            const wrapper = findByClassName(tableHeadWrapper, '.checkbox')
            expect(wrapper.length).toBe(1)
        })

        test('Should render table cells of table cell', () => {
            const tableHeadWrapper = findByClassName(component, '.table__head')
            const wrapper = findByClassName(tableHeadWrapper, '.table-row__cell')
            expect(wrapper.length).toBe(10)
        })
    })

    describe('Testing Inplace Editing', () => {
        let wrapper, inplaceComponent, editWrapper
        beforeEach(() => {
            inplaceComponent = findByClassName(component, '.toggle-inplace-edit')
            wrapper = inplaceComponent.find('input')
            wrapper.simulate('change', { target: { checked: true } })
            const editIcon = findByClassName(component, '.flex-cell__edit-icon')
            editWrapper = findByClassName(editIcon, '.svg-icon')
        })

        test('Should render inplace editing toggle button', () => {
            expect(inplaceComponent.length).toBe(1)
        })

        test('Should render toggled state button by simulating it', () => {
            expect(wrapper.instance().value).toBeTruthy()
        })

        test('should render edit icon beside promo name', () => {
            expect(editWrapper.length).toBe(1)
        })

        describe('Test editing promo name', () => {
            let inputWrapper
            beforeEach(() => {
                editWrapper.simulate('click')
                inputWrapper = findByClassName(component, '.flex-cell__inline-input')
            })

            test('open text box on click of edit icon', () => {
                expect(inputWrapper.length).toBe(1)
            })

            test('render inline edit accept action', () => {
                const actionWrapper = findByClassName(component, '.color-check')
                expect(actionWrapper.length).toBe(1)
            })

            test('render inline edit danger action', () => {
                const actionWrapper = findByClassName(component, '.danger')
                expect(actionWrapper.length).toBe(1)
            })

            test('should close the input if accept action is clicked', () => {
                const actionWrapper = findByClassName(component, '.color-check')
                actionWrapper.simulate('click')
                inputWrapper = findByClassName(component, '.flex-cell__inline-input')
                expect(inputWrapper.length).toBe(0)
            })

            test('should close the input if danger action is clicked', () => {
                const actionWrapper = findByClassName(component, '.color-check')
                actionWrapper.simulate('click')
                inputWrapper = findByClassName(component, '.flex-cell__inline-input')
                expect(inputWrapper.length).toBe(0)
            })
        })
    })

    describe('Testing table row actions', () => {
        let rowWrapper
        beforeEach(() => {
            const wrapper = findByClassName(component, '.table__body')
            rowWrapper = findByClassName(wrapper, '.table-row').at(0)
            const menuContent = findByClassName(rowWrapper, '.menu__content')
            menuContent.simulate('click')
        })

        test('Should render table row actions', () => {
            const menuWrapper = findByClassName(rowWrapper, '.menu')
            expect(menuWrapper.length).toBe(1)
        })

        test('Should render 2 Menu items with status incomplete', () => {
            const menuItems = findByClassName(component, '.menu__list--item')
            expect(menuItems.length).toBe(2)
        })

        test('Should render Edit menu item', () => {
            const menuItems = findByClassName(component, '.menu__list--item').at(0)
            expect(menuItems.text()).toBe('Edit')
        })

        test('Should render Delete menu item', () => {
            const menuItems = findByClassName(component, '.menu__list--item').at(1)
            expect(menuItems.text()).toBe('Delete')
        })

        describe('Testing Delete Modal Component', () => {
            beforeEach(() => {
                findByClassName(component, '.menu__list--item')
                    .at(1)
                    .simulate('click')
            })
            const modalRoot = global.document.createElement('div')
            modalRoot.setAttribute('id', 'modal')
            const body = global.document.querySelector('body')
            body.appendChild(modalRoot)

            test('should render Delete promo component by clicking on delete menu item', () => {
                const modalWrapper = findByClassName(component, '.modal__background')
                expect(modalWrapper.length).toBe(1)
            })

            test('shoudld render delete promo title', () => {
                const promoHeadingWrapper = findByClassName(component, '.modal__heading')
                expect(promoHeadingWrapper.length).toBe(1)
            })

            test('Should render delete Confirmation content', () => {
                const contentWrapper = findByClassName(component, '.confirmation-content')
                expect(contentWrapper.length).toBe(1)
            })

            test('Should render delete Confirmation item text', () => {
                const contentWrapper = findByClassName(component, '.confirmation-content')
                const item = contentWrapper.find('li').at(0)
                expect(item.text()).toBe(props.promotions_list[0].name)
            })

            test('Should render Delete Modal Actions', () => {
                const modalActionsWrapper = findByClassName(component, '.modal__actions')
                expect(modalActionsWrapper.length).toBe(1)
            })

            test('Should call saga delete method after clicking save button', () => {
                const modalActionsWrapper = findByClassName(component, '.modal__actions')
                const saveButton = findByClassName(modalActionsWrapper, '.btn').at(1)
                saveButton.simulate('click')
                expect(props.actions.bulkDeletePromos).toHaveBeenCalled()
            })

            test('Should unmount modal after clicking cancel button', () => {
                const modalActionsWrapper = findByClassName(component, '.modal__actions')
                const saveButton = findByClassName(modalActionsWrapper, '.btn').at(0)
                saveButton.simulate('click')
                const modal = findByClassName(component, '.modal__background')
                expect(modal.length).toBe(0)
            })
        })
    })
    describe('Should render tool tip component', () => {
        let stateCell
        beforeEach(() => {
            const tableHeadWrapper = findByClassName(component, '.table__body')
            const rowWrapper = findByClassName(tableHeadWrapper, '.table-row')
            stateCell = findByClassName(rowWrapper, '.table-row__cell').at(4)
        })

        test('Should render State cell', () => {
            expect(stateCell.length).toBe(1)
        })

        test('Should render tool tip component', () => {
            const toolTipWrapper = findByClassName(stateCell, '.tool-tip')
            expect(toolTipWrapper.length).toBe(1)
        })

        // test('Should render tool tip wrapper', async () => {
        //     const wrapper = findByClassName(stateCell, '.tool-tip__main').children()
        //     await act(async () => {
        //         await wrapper.props().onMouseOver()
        //         const tableHeadWrapper = findByClassName(component, '.table__body')
        //         const rowWrapper = findByClassName(tableHeadWrapper, '.table-row')
        //         const updatedStateCell = findByClassName(rowWrapper, '.table-row__cell').at(4)
        //         console.log('updatedStateCell',updatedStateCell.debug())
        //     })
        //     // expect(findByClassName(updatedStateCell, '.tool-tip__wrapper').length).toBe(1)
        // })
    })
})
