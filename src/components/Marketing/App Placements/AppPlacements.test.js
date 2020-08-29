import React from 'react'
import { mount } from 'enzyme'

import { findByClassName } from '../../../util/testUtil'
import Marketing from '../../../pages/Marketing/Marketing'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'
import Navigation from '../../../util/history'
import * as actions from '../../../modules/Promotions/actions'

const setUp = (props = {}) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <Marketing {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing App Placements Component', () => {
    window.scrollTo = jest.fn()
    const actionsNode = component => findByClassName(component, '.step-container__actions')
    const placementNode = component => component.find('[name="7Now"]').find('input')
    describe('Configuring to Render App Placements', () => {
        let component
        beforeEach(() => {
            const props = {
                promo_loading: false,
                promo_details: {
                    configurations: [],
                },
                actions: actions,
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
            }
            component = setUp(props)
        })
        describe('Testing the App Placements phases(No configuration/Partial-data/when it is opened)', () => {
            test('Should render closed App Placements with no partial data', () => {
                const wrapper = findByClassName(component, '.app-placements__apps')
                expect(wrapper.length).toBe(1)
            })

            test('Should rendering opened App Placements', () => {
                const wrapper = findByClassName(component, '.app-placements__apps')
                expect(wrapper.length).toBe(1)
            })
        })

        describe('Testing App Placement Checkboxes', () => {
            test('Should render 7-Now App checkbox', () => {
                const wrapper = placementNode(component)
                expect(wrapper.length).toBe(1)
            })

            test('Should render 7-Now App Tiles when 7-Now App checkbox is checked', () => {
                const wrapper = placementNode(component)
                wrapper.simulate('change')
                const checkAppTiles = findByClassName(component, '.app-placements__tiles')
                expect(checkAppTiles.length).toBe(1)
                wrapper.simulate('change')
                const unCheckAppTiles = findByClassName(component, '.app-placements__tiles')
                expect(unCheckAppTiles.length).toBe(0)
            })

            test('Should render all the app tiles', () => {
                const wrapper = placementNode(component)
                wrapper.simulate('change')
                const appTiles = findByClassName(component, '.app-placements__tile')
                expect(appTiles.length).toBe(2)
            })
        })

        describe('Testing the App Placements Actions (Save, cancel)', () => {
            let actionWrapper
            beforeEach(() => {
                actionWrapper = actionsNode(component)
            })

            test('Should render only save button if app placements section is not configured before ', () => {
                const btnWrapper = findByClassName(actionWrapper, '.btn')
                expect(btnWrapper.length).toBe(1)
            })

            test('Should render disabled save and continue if no app placements are selected', () => {
                const btnWrapper = findByClassName(actionWrapper, '.btn')
                expect(btnWrapper.props().disabled).toBeTruthy()
            })

            test('Should render both save and cancel button if app placement section is previously configured', () => {
                const props = {
                    promo_loading: false,
                    promo_details: {
                        configurations: [{ app: '7Now', placement_location: 'Homepage Carousel' }],
                    },
                    schedule: {
                        all_day: true,
                        start_date: '2020-04-23T05:00:00.000Z',
                        end_date: '2020-04-28T04:59:00.000Z',
                    },
                    actions: actions,
                    match: {
                        params: {
                            promoId: '1234',
                        },
                    },
                }
                component = setUp(props)
                const editWrapper = findByClassName(component, '.partial-content__editable')
                editWrapper.at(0).simulate('click')

                const wrapper = actionsNode(component)
                const btnWrapper = findByClassName(wrapper, '.btn')
                expect(btnWrapper.length).toBe(2)
            })
        })

        describe('Testing App Placement Tiles Component', () => {
            let wrapper
            let tileWrapper

            beforeEach(() => {
                wrapper = placementNode(component)
                wrapper.simulate('change')
                tileWrapper = findByClassName(component, '.app-placements__tile')
                tileWrapper.at(0).simulate('click')
            })

            test('Should render with app tile selected', () => {
                const selectedTileWrapper = findByClassName(
                    component,
                    '.app-placements__tile.selected'
                )
                expect(selectedTileWrapper.length).toBe(1)
            })

            test('Testing the app tile selected toggling', () => {
                tileWrapper.at(0).simulate('click')
                const selectedTileWrapper = findByClassName(
                    component,
                    '.app-placements__tile.selected'
                )
                expect(selectedTileWrapper.length).toBe(0)
            })

            test('Should render a clickable save and continue button when the app placement tiles are selected', () => {
                const actionsWrapper = actionsNode(component)
                const btnWrapper = findByClassName(actionsWrapper, '.btn')
                expect(btnWrapper.props().disabled).toBeFalsy()
            })
        })
    })
})
