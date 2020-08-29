import React from 'react'
import { mount } from 'enzyme'
import { findByClassName } from '../../../util/testUtil'
import Schedule from './Schedule'
import { util } from '../../../util'
import { strings } from '../../../strings'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { store } from '../../../config/redux'
import Navigation from '../../../util/history'
import Marketing from '../../../pages/Marketing/Marketing'
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

describe('Testing Schedule Component', () => {
    let component
    beforeEach(() => {
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
            },
            sagaUpdateMarketing: jest.fn(),
            sagaFetchPromoById: jest.fn(),
            match: {
                params: {
                    promoId: 1234,
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
            actions,
        }
        component = setUp(props)
    })
    describe('Rendering the Schedule component', () => {
        test('rendering schedule component', () => {
            const wrapper = findByClassName(component, '.schedule__content')
            expect(wrapper.length).toBe(1)
        })
        test('rendering schedule component with no partial content', () => {
            const wrapper = findByClassName(component, '.partial-content__body__schedule')
            expect(wrapper.length).toBe(0)
        })
    })

    describe('Rendering the Schedule component with default values', () => {
        let currentDate = util.getFormattedDate(new Date(), 'MM/DD/yyyy')

        test('rendering start date', () => {
            const wrapper = component.find('[name="startDate"]')
            expect(wrapper.exists()).toBeTruthy()
        })

        test('test default start date to have current date value', () => {
            const wrapper = component.find('[name="startDate"]').at(0)
            expect(wrapper.props().selectedDate).toEqual(currentDate)
        })

        test('rendering start time', () => {
            const startTimeWrapper = component.find('[name="startTime"]')
            expect(startTimeWrapper.exists()).toBeTruthy()
        })

        test('rendering end date', () => {
            const wrapper = component.find('[name="endDate"]')
            expect(wrapper.exists()).toBeTruthy()
        })

        test('test default end date to have current date value', () => {
            const wrapper = component.find('[name="endDate"]').at(0)
            expect(wrapper.props().selectedDate).toEqual(currentDate)
        })

        test('rendering end time', () => {
            const wrapper = component.find('[name="endTime"]')
            expect(wrapper.exists()).toBeTruthy()
        })

        test('rendering All Day checkbox', () => {
            const wrapper = findByClassName(component, '.schedule__allDay')
            expect(wrapper.length).toBe(1)
        })

        test('rendering repeat dropdown', () => {
            const wrapper = findByClassName(component, '.schedule__repeat-setup').at(0)
            expect(wrapper.length).toBe(1)
        })

        test('test repeat dropdown default value', () => {
            const repeatOption = component.find('[label="Repeat"]')
            expect(repeatOption.props().value).toEqual('Does Not Repeat')
        })

        test('should enable Save button', () => {
            const actionsWrapper = findByClassName(component, '.step-container__actions')
            const btnWrapper = findByClassName(actionsWrapper, '.btn')
            expect(btnWrapper.props().disabled).toBeFalsy()
        })
    })

    describe('Test All Day toggle', () => {
        let allDayWrapper
        beforeEach(() => {
            allDayWrapper = component.find('[label="All day"]').find('input')
            allDayWrapper.simulate('change')
        })

        test('should hide start time if All Day checkbox is toggled on', () => {
            const hideStartTimeWrapper = component.find('[name="startTime"]').find('input')
            expect(hideStartTimeWrapper.length).toBe(0)
        })

        test('should hide end time if All Day checkbox is toggled on', () => {
            const hideEndTimeWrapper = component.find('[name="endTime"]').find('input')
            expect(hideEndTimeWrapper.length).toBe(0)
        })

        test('should display start time if All Day checkbox is toggled off', () => {
            allDayWrapper.simulate('change')
            const hideEndTimeWrapper = component.find('[name="startTime"]').find('input')
            expect(hideEndTimeWrapper.length).toBe(1)
        })

        test('should display end time if All Day checkbox is toggled off', () => {
            allDayWrapper.simulate('change')
            const hideEndTimeWrapper = component.find('[name="endTime"]').find('input')
            expect(hideEndTimeWrapper.length).toBe(1)
        })
    })

    describe('Test Repeat Dropdown', () => {
        let selectInput, optionDropdown, repeatDropDown, repeatEveryCounter
        beforeEach(() => {
            selectInput = findByClassName(component, '.select-container').at(2)
            selectInput.simulate('click')
            optionDropdown = findByClassName(component, '.select-input__dropdown')

            repeatDropDown = component.find('[label="Repeat"]')

            repeatEveryCounter = component.find('[name="Repeat Every"]')
        })
        describe('Test Does Not Repeat option', () => {
            test('should render Does not repeat by default', () => {
                expect(repeatDropDown.props().value).toEqual('Does Not Repeat')
            })
            test('should not display repeat every counter', () => {
                expect(repeatEveryCounter.length).toBe(0)
            })
        })

        describe('Test Daily option', () => {
            let dailyOption
            beforeEach(() => {
                dailyOption = optionDropdown.find('li').at(1)
                dailyOption.simulate('click')
            })

            test('Test repeat option should have daily selected', () => {
                repeatDropDown = component.find('[label="Repeat"]')
                expect(repeatDropDown.props().value).toEqual('Daily')
            })

            test('should render repeat every option', () => {
                repeatEveryCounter = component.find('[label="Repeat Every"]').find('input')
                expect(repeatEveryCounter.length).toBe(1)
            })
        })

        describe('Test repeat every counter', () => {
            let dailyOption, repeatEveryCounter
            beforeEach(() => {
                dailyOption = optionDropdown.find('li').at(1)
                dailyOption.simulate('click')
                repeatEveryCounter = component.find('[label="Repeat Every"]').find('input')
            })

            test('Should render repeat every option with default value', () => {
                expect(repeatEveryCounter.props().value).toBe(1)
            })

            test('Should trigger callback function on change of value', () => {
                repeatEveryCounter.simulate('change', { target: { value: 8, name: 'repeat' } })
                repeatEveryCounter = component.find('[label="Repeat Every"]').find('input')
                expect(repeatEveryCounter.props().value).toBe(8)
            })
        })
    })

    describe('Test validations', () => {
        describe('Test time format validations', () => {
            let timeError, startTimeWrapper, startTimeIcon
            beforeEach(() => {
                startTimeWrapper = findByClassName(component, '.select-container').at(0)
                startTimeIcon = findByClassName(startTimeWrapper, '.select-textfield__control')
                startTimeIcon.simulate('change', { target: { value: '' } })
                timeError = findByClassName(component, '.select-input__error')
            })
            test('should render error', () => {
                expect(timeError.length).toBe(1)
            })
            test('should display time format error', () => {
                expect(timeError.at(0).props().children).toEqual(strings.timeFormatError)
            })
            test('should disable save button', () => {
                const actionsWrapper = findByClassName(component, '.step-container__actions')
                const btnWrapper = findByClassName(actionsWrapper, '.btn')
                expect(btnWrapper.props().disabled).toBeTruthy()
            })
        })

        describe('Test date validations', () => {
            let errorWrapper
            beforeEach(() => {
                const wrapper = component.find('[name="endDate"]').find('input')
                wrapper.simulate('change', { target: { value: '08/06/2020', name: 'endDate' } })
                errorWrapper = findByClassName(component, '.picker__error').at(1)
            })

            test('Test selected date is a past date error validation', () => {
                expect(errorWrapper.text()).toBe(strings.pastDayError)
            })
        })

        describe('Should disable Save button if start/end date is not entered', () => {
            test('test save button', () => {
                const wrapper = component.find('[name="startDate"]').find('input')
                wrapper.simulate('change', { target: { value: '', name: 'startDate' } })
                const actionsWrapper = findByClassName(component, '.step-container__actions')
                const btnWrapper = findByClassName(actionsWrapper, '.btn')
                expect(btnWrapper.props().disabled).toBeTruthy()
            })
        })
    })
})
