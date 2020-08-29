import React from 'react'
import { mount } from 'enzyme'

import { findByClassName } from '../../../util/testUtil'
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'
import { Router } from 'react-router-dom'
import Navigation from '../../../util/history'
import Marketing from '../../../pages/Marketing/Marketing'
import { util } from '../../../util'
import * as actions from '../../../modules/Promotions/actions'

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

const propsConfig = updatedConfigs => {
    const props = {
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
        actions: actions,
        match: {
            params: {
                promoId: '1234',
            },
        },
    }
    let updatedProps
    if (updatedConfigs) {
        updatedProps = util.deepShallowHelper(
            props,
            'promo_details',
            'configurations',
            updatedConfigs
        )
    } else {
        updatedProps = props
    }
    return updatedProps
}

describe('Testing Audience Component', () => {
    window.scrollTo = jest.fn()
    const findRegNode = component => component.find('[id="audience_regional"]').find('input')
    const findSearchInputNode = component => findByClassName(component, '.search-input')
    describe('Configuring Audience Section', () => {
        let component
        beforeEach(() => {
            const props = propsConfig()
            component = setUp(props)
        })

        describe('Rendering Audience tiles', () => {
            test('should render National checkbox', () => {
                const wrapper = component.find('[id="audience_national"]').find('input')
                expect(wrapper.length).toBe(1)
            })

            test('should render Regional checkbox', () => {
                const wrapper = findRegNode(component)
                expect(wrapper.length).toBe(1)
            })

            test('Should not render SearchInput Input without checking regional checkboxes', () => {
                component = findByClassName(component, '.audience')
                const checkAppTiles = findSearchInputNode(component)
                expect(checkAppTiles.length).toBe(0)
            })

            test('should render search input when Regional checkbox is checked', async () => {
                const wrapper = findRegNode(component)
                wrapper.simulate('change', { target: { checked: true } })
                const checkAppTiles = findSearchInputNode(component)
                expect(checkAppTiles.length).toBe(1)
            })

            test('Should not render search input after checking and un checking the regional input', () => {
                const wrapper = findRegNode(component)
                wrapper.simulate('change', { target: { checked: true } })
                wrapper.simulate('change', { target: { checked: false } })
                const checkAppTiles = findSearchInputNode(component)
                expect(checkAppTiles.length).toBe(0)
            })
        })

        describe('Testing Audience save button enable', () => {
            const actionsNode = component => findByClassName(component, '.step-container__actions')
            test('should not enable save if no selection is made', () => {
                const btnWrapper = findByClassName(actionsNode(component), '.btn')
                expect(btnWrapper.props().disabled).toBeTruthy()
            })

            test('should enable save if National is selected', () => {
                const wrapper = component.find('[id="audience_national"]').find('input')
                wrapper.simulate('change', { target: { checked: true } })
                const btnWrapper = findByClassName(actionsNode(component), '.btn')
                expect(btnWrapper.at(0).props().disabled).toBeFalsy()
            })

            test('should not enable save if Regional is selected and no states are entered', () => {
                const wrapper = component.find('[id="audience_regional"]').find('input')
                wrapper.simulate('change', { target: { checked: true } })
                const btnWrapper = findByClassName(actionsNode(component), '.btn')
                expect(btnWrapper.at(0).props().disabled).toBeTruthy()
            })
        })
    })
})
