import React from 'react'
import { mount } from 'enzyme'

import { findByClassName } from '../../../util/testUtil'
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'
import { Router } from 'react-router-dom'
import Navigation from '../../../util/history'
import * as actions from '../../../modules/Promotions/actions'
import { ProgressBar } from '../../common'
import Marketing from '../../../pages/Marketing/Marketing'

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

describe('Testing Manage Content Component', () => {
    window.scrollTo = jest.fn()
    let component
    let props
    const filterActionsNode = component => findByClassName(component, '.filter_actions')
    const toolBarNode = component => findByClassName(component, '.table-toolbar__pill-list')
    const checkBoxNode = component => findByClassName(component, '.checkbox-input')
    const tableHeadNode = component => findByClassName(component, '.table__head')
    const tableBodyNode = component => findByClassName(component, '.table__body')
    const tableRowNode = component => findByClassName(tableBodyNode(component), '.table-row')
    beforeEach(() => {
        props = {
            actions,
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
                        region: 'CA',
                    },
                    {
                        app: '7Now',
                        placement_location: 'Deal Tile',
                        region: 'CA',
                    },
                ],
                schedule: {
                    all_day: true,
                    start_date: '2020-04-23T05:00:00.000Z',
                    end_date: '2020-04-28T04:59:00.000Z',
                },
                priority: 3,
            },
            content_filters: [
                {
                    type: 'list',
                    key: 'placement_location',
                    display_name: 'Placement',
                    display_value: [],
                    post_value: [],
                },
                {
                    type: 'list',
                    key: 'state',
                    display_name: 'Region',
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
            ],
            match: {
                params: {
                    promoId: '1234',
                },
            },
            history: {
                location: {
                    state: {
                        fromPromoDetails: true,
                    },
                },
                replace: jest.fn(),
            },
            dispatchFetchPromo: jest.fn(),
        }
        component = setUp(props)
    })

    describe('Testing manage content inital components', () => {
        test('Should render Manage Content Component', () => {
            const wrapper = findByClassName(component, '.manage-content')
            expect(wrapper.length).toBe(1)
        })

        test('Should render progress bar', () => {
            const wrapper = findByClassName(component, '.progress-bar')
            expect(wrapper.length).toBe(1)
        })

        test('Should render 0% in progress bar if all configurations has status incomplete', () => {
            expect(component.find(ProgressBar).props().percentage).toBe(0)
        })

        test('Should render Table tool bar', () => {
            const wrapper = findByClassName(component, '.table-toolbar').at(0)
            expect(wrapper.length).toBe(1)
        })
    })
    describe('Testing Manage Content Table', () => {
        test('Should render Table component', () => {
            const wrapper = findByClassName(component, '.table')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Table head', () => {
            const wrapper = tableHeadNode(component)
            expect(wrapper.length).toBe(1)
        })

        test('Should render all 9 Table heads', () => {
            const wrapper = tableHeadNode(component)
            const cellWrapper = findByClassName(wrapper, '.table-row__cell')
            expect(cellWrapper.length).toBe(8)
        })

        test('Should render 4 body rows with current configurations', () => {
            const cellWrapper = tableRowNode(component)
            expect(cellWrapper.length).toBe(4)
        })
    })

    describe('Testing Edit Configuration component', () => {
        let editConfigWrapper
        const editConfigHeadingNode = editConfigWrapper =>
            findByClassName(editConfigWrapper, '.edit-configuration__item.heading')
        beforeEach(() => {
            const cellWrapper = tableRowNode(component).at(0)
            findByClassName(cellWrapper, '.table__cell.edit-action.highlight')
                .at(1)
                .simulate('click')
            editConfigWrapper = findByClassName(component, '.edit-configuration')
        })

        test('Should render side menu', () => {
            const wrapper = findByClassName(component, '.side-menu.open')
            expect(wrapper.length).toBe(1)
        })

        test('Should render edit configurations component', () => {
            expect(editConfigWrapper.length).toBe(1)
        })

        test('Should render side menu with title and close icon', () => {
            const wrapper = editConfigHeadingNode(editConfigWrapper)
            expect(wrapper.length).toBe(1)
        })

        test('Should render Title as Edit Configuration by selecting one edit configuration', () => {
            const wrapper = editConfigHeadingNode(editConfigWrapper)
            const titleWrapper = findByClassName(wrapper, '.heading-secondary')
            expect(titleWrapper.text()).toBe('Edit Configuration')
        })

        test('Should render close icon', () => {
            const wrapper = editConfigHeadingNode(editConfigWrapper)
            const iconWrapper = findByClassName(wrapper, '.svg-icon')
            expect(iconWrapper.length).toBe(1)
        })

        test('Should close side menu after clicking close icon', () => {
            const wrapper = editConfigHeadingNode(editConfigWrapper)
            const iconWrapper = findByClassName(wrapper, '.svg-icon')
            iconWrapper.simulate('click')
            const editComp = findByClassName(component, '.edit-configuration')
            expect(editComp.length).toBe(0)
        })

        test('Should render Copy input field', () => {
            const wrapper = findByClassName(editConfigWrapper, '.edit-configuration__item.copy')
            expect(wrapper.length).toBe(1)
        })

        test('Should render legal disclaimer input field', () => {
            const wrapper = findByClassName(editConfigWrapper, '.edit-configuration__item.legal')
            expect(wrapper.length).toBe(1)
        })

        test('Should render landing components', () => {
            const wrapper = findByClassName(editConfigWrapper, '.landing')
            expect(wrapper.length).toBe(1)
        })

        test('Should render SelectInput landing type', () => {
            const wrapper = findByClassName(editConfigWrapper, '.select-input.select-lp')
            expect(wrapper.length).toBe(1)
        })

        test('Should render edit configuration actions', () => {
            const wrapper = findByClassName(component, '.actions')
            const btns = findByClassName(wrapper, '.btn')
            expect(btns.length).toBe(2)
        })
    })

    describe('Testing Bulk edit configuration', () => {
        let bulkWrapper
        beforeEach(() => {
            const wrapper = tableHeadNode(component)
            const inputCheckbox = checkBoxNode(wrapper)
            inputCheckbox.simulate('change', { target: { checked: true } })
            bulkWrapper = findByClassName(component, '.bulk-edit')
        })

        test('Should render bulk edit banner after clicking on header checkbox', () => {
            expect(bulkWrapper.length).toBe(1)
        })

        test('Should render selected configurations length ', () => {
            const wrapper = findByClassName(bulkWrapper, '.bulk-edit__records')
            expect(wrapper.text()).toBe(
                `${props.promo_details.configurations.length} item(s) selected`
            )
        })

        test('Should render clear button', () => {
            const btnWrapper = findByClassName(bulkWrapper, '.btn').at(0)
            expect(btnWrapper.text()).toBe('Clear')
        })

        test('Should render clear bulk edit banner after clicking clear button', () => {
            const btnWrapper = findByClassName(bulkWrapper, '.btn').at(0)
            btnWrapper.simulate('click')
            const wrapper = findByClassName(component, '.bulk-edit')
            expect(wrapper.length).toBe(0)
        })

        test('Should render Edit button', () => {
            const btnWrapper = findByClassName(bulkWrapper, '.btn').at(1)
            expect(btnWrapper.text()).toBe('Edit')
        })

        test('Should render side menu after clicking on edit button', () => {
            const btnWrapper = findByClassName(bulkWrapper, '.btn').at(1)
            btnWrapper.simulate('click')
            const sideMenuWrapper = findByClassName(component, '.side-menu.open')
            expect(sideMenuWrapper.length).toBe(1)
        })
    })

    describe('Testing upload image component', () => {
        beforeEach(() => {
            const cellWrapper = tableRowNode(component).at(0)
            findByClassName(cellWrapper, '.table__cell.edit-action.highlight')
                .at(1)
                .simulate('click')
            component = findByClassName(component, '.side-menu.open')
        })

        test('Should render Upload image component', () => {
            const wrapper = findByClassName(component, '.upload-image')
            expect(wrapper.length).toBe(1)
        })

        test('Should render upload input file', () => {
            const wrapper = findByClassName(component, '.upload-image__input-file')
            expect(wrapper.length).toBe(1)
        })

        test('Should render upload image requirements', () => {
            const wrapper = findByClassName(component, '.requirements')
            expect(wrapper.length).toBe(1)
        })
    })

    describe('Testing Manage Content table tool bar', () => {
        test('Should render Filter Component', () => {
            const wrapper = findByClassName(component, '.filter-table')
            expect(wrapper.length).toBe(1)
        })

        test('Should not render table pill component if there is no filter', () => {
            expect(toolBarNode(component).length).toBe(0)
        })
    })

    describe('Testing Manage Content Filter', () => {
        let filterWrapper
        const filterContainerNode = component => findByClassName(component, '.filter-container')
        beforeEach(() => {
            const wrapper = findByClassName(component, '.filter-btn').at(0)
            wrapper.simulate('click')
            filterWrapper = filterContainerNode(component)
        })
        test('Test filter side menu should open', () => {
            expect(filterWrapper.length).toBe(1)
        })

        describe('Render filter header', () => {
            test('Render Filter By text', () => {
                const filterByWrapper = findByClassName(filterWrapper, '.filterBy')
                expect(filterByWrapper.length).toBe(1)
            })
            test('should not render Clear All inside side menu if no filters are applied', () => {
                const clearAllWrapper = findByClassName(filterWrapper, '.clearAllBtn')
                expect(clearAllWrapper.length).toBe(0)
            })
            test('should render close icon', () => {
                const closeIconWrapper = findByClassName(filterWrapper, '.filterCloseIcon')
                expect(closeIconWrapper.exists()).toBeTruthy()
            })
        })

        describe('Render filter body', () => {
            const filterMenuNode = component => findByClassName(component, '.filter-menu__item')
            test('should render 3 types of filters', () => {
                expect(filterMenuNode(filterWrapper).length).toBe(3)
            })
            test('should dynamically render the placements based on configurations', () => {
                const filterItemsWrapper = filterMenuNode(filterWrapper).at(0)
                const placementCheckbox = findByClassName(filterItemsWrapper, '.checkbox')
                expect(placementCheckbox.length).toBe(2)
            })
            test('should dynamically render the regions based on configurations', () => {
                const filterItemsWrapper = filterMenuNode(filterWrapper).at(1)
                const regionCheckbox = findByClassName(filterItemsWrapper, '.checkbox')
                expect(regionCheckbox.length).toBe(2)
            })
            test('should render status fields Complete/Incomplete', () => {
                const filterItemsWrapper = filterMenuNode(filterWrapper).at(2)
                const statusCheckbox = findByClassName(filterItemsWrapper, '.checkbox')
                expect(statusCheckbox.length).toBe(2)
            })
        })

        describe('Render filter actions', () => {
            let buttonWrapper
            beforeEach(() => {
                buttonWrapper = findByClassName(filterActionsNode(component), '.btn')
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
            let placementCheckbox
            beforeEach(() => {
                placementCheckbox = checkBoxNode(component).at(0)
                placementCheckbox.simulate('change', {
                    target: { checked: true, name: 'placement_location', id: 'Homepage Carousel' },
                })
                placementCheckbox = checkBoxNode(component).at(0)
            })
            test('should select the placement checkbox', () => {
                expect(placementCheckbox.props().checked).toBeTruthy()
            })
            test('should enable apply button', () => {
                const buttonWrapper = findByClassName(filterActionsNode(component), '.btn')
                expect(buttonWrapper.at(1).props().disabled).toBeFalsy()
            })
        })

        describe('Test if filters are applied', () => {
            let placementCheckbox, applyBtn, filterPill
            beforeEach(() => {
                placementCheckbox = checkBoxNode(component).at(0)
                placementCheckbox.simulate('change', {
                    target: { checked: true, name: 'placement_location', id: 'Homepage Carousel' },
                })
                applyBtn = filterActionsNode(component)
                    .find('button')
                    .at(1)
                applyBtn.simulate('click')
                filterPill = toolBarNode(component).at(0)
            })
            test('should close filter side menu', () => {
                const filterWrapper = filterContainerNode(component)
                expect(filterWrapper.length).toBe(0)
            })
            test('should render filter pill', () => {
                expect(filterPill.length).toBe(1)
            })
            test('should display filter pill label', () => {
                const label = findByClassName(filterPill, '.filter-name')
                expect(label.text()).toEqual('Placement')
            })
            test('should render x icon in filter pill', () => {
                const closePill = findByClassName(filterPill, '.svg-icon')
                expect(closePill.length).toBe(1)
            })
            test('should filter table rows', () => {
                const cellWrapper = tableRowNode(component)
                expect(cellWrapper.length).toBe(2)
            })

            describe('should enable clear all button inside side menu if filters are applied', () => {
                let clearAllWrapper
                beforeEach(() => {
                    const wrapper = findByClassName(component, '.filter-btn').at(0)
                    wrapper.simulate('click')
                    filterWrapper = filterContainerNode(component)
                    clearAllWrapper = findByClassName(filterWrapper, '.clearAllBtn').at(0)
                })
                test('render clear all button', () => {
                    expect(clearAllWrapper.length).toBe(1)
                })
                test('clear all applied fields if clear all button is clicked', () => {
                    clearAllWrapper.simulate('click')
                    placementCheckbox = checkBoxNode(component).at(0)
                    expect(placementCheckbox.props().checked).toBeFalsy()
                })
                test('should enable apply button', () => {
                    const buttonWrapper = findByClassName(filterActionsNode(component), '.btn')
                    expect(buttonWrapper.at(1).props().disabled).toBeFalsy()
                })
            })

            describe('Test remove a filter pill', () => {
                beforeEach(() => {
                    const closePill = findByClassName(filterPill, '.svg-icon')
                    closePill.simulate('click')
                })
                test('should not render filter pills', () => {
                    const filterPillList = toolBarNode(component)
                    expect(filterPillList.length).toBe(0)
                })
                test('should filter table rows', () => {
                    const cellWrapper = tableRowNode(component)
                    expect(cellWrapper.length).toBe(4)
                })
            })
        })
    })
})
