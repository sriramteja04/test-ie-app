import React from 'react'
import { mount } from 'enzyme'
import { findByClassName } from '../../util/testUtil'
import { Router } from 'react-router-dom'
import Navigation from '../../util/history'
import PromoDetails from './PromoDetails'
import { Provider } from 'react-redux'
import { store } from '../../config/redux'
import { Indicator, InputField, Icon } from '../../components/common'
import { util } from '../../util'
import * as actions from '../../modules/Promotions/actions'

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
            <Router history={Navigation}>
                <PromoDetails {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing PromoDetails Component', () => {
    const promoDetails = {
        configurations: [],
        created: '2020-04-23T03:16:09.000Z',
        created_by: 'john.doe@7-11.com',
        is_live: false,
        name: 'Free Pizza Delivery',
        promo: 'promo detail',
        qa_is_live: false,
        schedule: {
            start_date: '2020-04-23T03:30:00.000Z',
            end_date: '2020-04-23T04:30:00.000Z',
            all_day: false,
        },
        status: 'incomplete',
        type: ['marketing'],
        updated: '2020-04-23T03:16:09.000Z',
        updated_by: 'john.doe@7-11.com',
        _id: 'ac3e46c54f92788154f0a96623b16362',
    }

    const promoActions = {
        ...actions,
        fetchPromoById: jest.fn(),
        deletePromo: jest.fn(),
        clearUpdatePromoError: jest.fn(),
    }
    describe('should render spinner when promo loading is true or promo details object is null', () => {
        let component
        const props = {
            match: {
                params: {
                    promoId: '1234',
                },
            },
            actions: promoActions,
            promo_loading: true,
            promo_details: {},
        }
        beforeEach(() => {
            component = setUp(props)
        })

        test('should render spinner when promo loading is true', () => {
            const wrapper = findByClassName(component, '.spinner')
            expect(wrapper.length).toBe(1)
        })

        test('should not render promo heading without promo details', () => {
            const wrapper = findByClassName(component, '.promo-heading_name')
            expect(wrapper.length).toBe(0)
        })

        test('Should dispatch fetch promo action', () => {
            expect(props.actions.fetchPromoById).toHaveBeenCalled()
        })
    })

    describe('Testing promo detail pages', () => {
        let component
        beforeEach(() => {
            const props = {
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
                actions: promoActions,
                promo_details: promoDetails,
                promo_loading: false,
            }
            component = setUp(props)
        })

        test('Should render Promo Heading Component Title', () => {
            const wrapper = findByClassName(component, '.promo-heading__name')
            expect(wrapper.length).toBe(1)
        })

        test('Should render promo title', () => {
            component = findByClassName(component, '.promo-heading__name')
            const wrapper = findByClassName(component, '.promo-title')
            expect(wrapper.text()).toBe('Free Pizza Delivery')
        })

        test('Should render Promo actions', () => {
            const wrapper = findByClassName(component, '.menu')
            expect(wrapper.length).toBe(1)
        })

        test('Should render Edit and delete actions in menu with status incomplete', () => {
            findByClassName(component, '.menu__content').simulate('click')
            const wrapper = findByClassName(component, '.menu__list--item')
            expect(wrapper.length).toBe(2)
        })

        test('Should render Edit menu item', () => {
            findByClassName(component, '.menu__content').simulate('click')
            const wrapper = findByClassName(component, '.menu__list--item').at(0)
            expect(wrapper.text()).toBe('Edit')
        })

        test('Should render Delete menu item', () => {
            findByClassName(component, '.menu__content').simulate('click')
            const wrapper = findByClassName(component, '.menu__list--item').at(1)
            expect(wrapper.text()).toBe('Delete')
        })
    })

    describe('Testing edit promo component by clicking edit beside to promo title', () => {
        let promoDetailComponent
        let props
        beforeEach(() => {
            props = {
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
                promo_loading: false,
                actions: promoActions,
                promo_details: promoDetails,
            }
            promoDetailComponent = setUp(props)
            findByClassName(promoDetailComponent, '.menu__content').simulate('click')
            let wrapper = findByClassName(promoDetailComponent, '.menu__list--item')
            findByClassName(wrapper, '.menu__list--item')
                .at(0)
                .simulate('click')
        })

        // add a div with #modal id to the global body
        const modalRoot = global.document.createElement('div')
        modalRoot.setAttribute('id', 'modal')
        const body = global.document.querySelector('body')
        body.appendChild(modalRoot)

        test('should render edit promo component by clicking on edit', () => {
            const modalWrapper = findByClassName(promoDetailComponent, '.modal__background')
            expect(modalWrapper.length).toBe(1)
        })

        test('shoudld render edit promo title', () => {
            const promoHeadingWrapper = findByClassName(promoDetailComponent, '.modal__heading')
            expect(promoHeadingWrapper.length).toBe(1)
        })

        test('should render edit promo input', () => {
            const editPromoInputWrapper = findByClassName(promoDetailComponent, '.input')
            expect(editPromoInputWrapper.length).toBe(1)
        })

        test('should render the input value with promo title', () => {
            const editPromoInputWrapper = promoDetailComponent.find(InputField)
            expect(editPromoInputWrapper.props().value).toEqual(props.promo_details.name)
        })

        test('Should render Name this promo label to input field', () => {
            const editPromoInputWrapper = promoDetailComponent.find(InputField)
            expect(editPromoInputWrapper.props().label).toEqual('Name this promo')
        })

        test('shoudld render edit Action Button', () => {
            const modalActionsWrapper = findByClassName(promoDetailComponent, '.modal__actions')
            expect(modalActionsWrapper.length).toBe(1)
        })

        test('should unmount the edit promo component by clicking on cancel Button', () => {
            const modalActionsWrapper = findByClassName(promoDetailComponent, '.modal__actions')
            const btns = findByClassName(modalActionsWrapper, '.btn')
            btns.at(0).simulate('click')
            const modalWrapper = findByClassName(promoDetailComponent, '.modal__background')
            expect(modalWrapper.length).toBe(0)
        })

        test('inital state of the save button should be disabled', () => {
            const modalActionsWrapper = findByClassName(promoDetailComponent, '.modal__actions')
            const btns = findByClassName(modalActionsWrapper, '.btn')
            expect(btns.at(1).props().disabled).toBeTruthy()
        })
    })

    describe('Testing Promo Initials Component and toggles', () => {
        let component
        let props
        beforeEach(() => {
            props = {
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
                promo_loading: false,
                actions: promoActions,
                promo_details: promoDetails,
            }
            component = setUp(props)
        })
        test('should render Promo Initials Component', () => {
            const wrapper = findByClassName(component, '.promo-initials')
            expect(wrapper.length).toBe(1)
        })

        test('should render all the promo initials', () => {
            const promoInitialswrapper = findByClassName(
                component,
                '.promo-initials__list__heading'
            )
            expect(promoInitialswrapper.length).toBe(3)
        })

        test('Should render id value', () => {
            const promoInitialswrapper = findByClassName(
                component,
                '.promo-initials__list--value'
            ).at(0)
            expect(promoInitialswrapper.text()).toBe(props.promo_details._id)
        })

        test('Should render created time', () => {
            const promoInitialswrapper = findByClassName(
                component,
                '.promo-initials__list--value'
            ).at(1)
            expect(promoInitialswrapper.text()).toBe(
                `${util.getFormattedDate(props.promo_details.created, 'MM/DD/yyyy')} - ${
                    props.promo_details.created_by
                }`
            )
        })

        test('Should render updated time', () => {
            const promoInitialswrapper = findByClassName(
                component,
                '.promo-initials__list--value'
            ).at(2)
            expect(promoInitialswrapper.text()).toBe(
                `${util.getFormattedDate(props.promo_details.updated, 'MM/DD/yyyy')} - ${
                    props.promo_details.updated_by
                }`
            )
        })

        describe('Testing promo toggles', () => {
            test('Should render promo toggles button', () => {
                const wrapper = findByClassName(component, '.promo-toggles')
                expect(wrapper.length).toBe(1)
            })

            test('Should render marketing and production toggles', () => {
                const wrapper = findByClassName(component, '.indicator')
                expect(wrapper.length).toBe(2)
            })

            test('Should render Marketing Toggle', () => {
                const wrapper = findByClassName(component, '.type_indicator')
                expect(wrapper.find(Indicator).props().label).toBe('Marketing')
            })

            test('Should render Marketing Toggle with success', () => {
                const wrapper = findByClassName(component, '.type_indicator')
                expect(wrapper.find(Indicator).props().color).toBe('success')
            })

            test('Should render Production toggle', () => {
                component = findByClassName(component, '.promo-toggles')
                const wrapper = component.find(Indicator).at(1)
                expect(wrapper.props().label).toBe('Production')
            })

            test('Should render production toggle with disabled color', () => {
                component = findByClassName(component, '.promo-toggles')
                const wrapper = component.find(Indicator).at(1)
                expect(wrapper.props().color).toBe('disable')
            })

            test('Should not render QA toggle', () => {
                const wrapper = findByClassName(component, '.indicator')
                expect(wrapper.length !== 3).toBeTruthy()
            })
        })

        describe('Testing Promo Detail links component', () => {
            test('Should render three promo links [Notification,Merchandising,Funding]', () => {
                const promoInitialItems = findByClassName(component, '.link-item')
                expect(promoInitialItems.length).toBe(1)
            })

            test('Should render PromoDetails status', () => {
                component = findByClassName(component, '.link-item').at(0)
                const wrapper = findByClassName(component, '.link-item__status')
                const statusWrapper = findByClassName(wrapper, '.paragraph.italic')
                expect(statusWrapper.text()).toBe(props.promo_details.status)
            })

            test('Should render PromoDetails link title', () => {
                component = findByClassName(component, '.link-item').at(0)
                const statusWrapper = findByClassName(component, '.paragraph.secondary')
                expect(statusWrapper.text()).toBe('marketing')
            })

            test('Should render disabled color with incomplete status', () => {
                component = findByClassName(component, '.link-item').at(0)
                const wrapper = findByClassName(component, '.link-item__status')
                const statusWrapper = wrapper.find(Icon)
                expect(statusWrapper.props().color).toBe('disable')
            })
        })
    })

    describe('Testing the promo details component with status above incomplete', () => {
        let component
        let props
        let wrapper
        beforeEach(() => {
            props = {
                match: {
                    params: {
                        promoId: '1234',
                    },
                },
                promo_loading: false,
                actions: promoActions,
                promo_details: {
                    ...promoDetails,
                    status: 'scheduled',
                },
            }
            component = setUp(props)
            const linkWrapper = findByClassName(component, '.link-item').at(0)
            wrapper = findByClassName(linkWrapper, '.link-item__status')
        })
        test('Should render PromoDetails status with complete status', () => {
            const statusWrapper = findByClassName(wrapper, '.paragraph.italic')
            expect(statusWrapper.text()).toBe('complete')
        })

        test('Should render disabled color with incomplete status', () => {
            const statusWrapper = wrapper.find(Icon)
            expect(statusWrapper.props().color).toBe('success')
        })
    })
})
