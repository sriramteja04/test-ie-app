import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { findByClassName, findById, findByName } from '../../../util/testUtil'
import Header from '../../Layout/Header'

import { store } from '../../../config/redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Navigation from '../../../util/history'

/**
 * Function to create a ShallowWrapper for the CreatePromo component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setUp = (props = {}, state = null) => {
    return mount(
        <Provider store={store}>
            <Router history={Navigation}>
                <Header {...props} />
            </Router>
        </Provider>
    )
}

describe('Testing Create Promo Modal component', () => {
    let component, dropDown, addButton

    beforeEach(() => {
        const props = {
            isAuth: false,
            userDetails: {
                name: 'Chris, Jones',
                email: 'chris.jones@7-11.com',
            },
        }
        component = setUp(props)

        addButton = findByClassName(component, '.add-button').at(1)
        addButton.simulate('click')

        dropDown = findByClassName(component, '.menu__list')
        dropDown = findByClassName(component, '.menu__list--item')

        //Simulating to view the modal
        dropDown.at(0).simulate('click')

        //component variable has the create promo modal component
        component = findByClassName(component, '.modal__background')
    })

    const modalRoot = global.document.createElement('div')
    modalRoot.setAttribute('id', 'modal')
    const body = global.document.querySelector('body')
    body.appendChild(modalRoot)

    test('Should render Modal Background', () => {
        const wrapper = findByClassName(component, '.modal__background')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Create Promo heading', () => {
        const wrapper = findByClassName(component, '.heading')
        expect(wrapper.length).toBe(1)
    })

    test('Should render close icon', () => {
        const wrapper = findById(component, 'close-icon')
        expect(wrapper.at(0).props().id).toEqual('close-icon')
    })

    test('Should render marketing toggle button', () => {
        const wrapper = findByClassName(component, '.details__toggles')
        expect(wrapper.props().children.props.label).toEqual('Marketing')
    })

    describe('Testing Modal Actions', () => {
        let ModalActionComponent
        beforeEach(() => {
            ModalActionComponent = findByClassName(component, '.modal__actions')
        })
        test('Should render modal actions component', () => {
            expect(ModalActionComponent.length).toBe(1)
        })

        test('Should render both the cancel and save buttons', () => {
            const wrapper = findByClassName(ModalActionComponent, '.btn')
            expect(wrapper.length).toBe(2)
        })

        test('Should render disabled save button when the input field is empty', () => {
            const wrapper = findByClassName(ModalActionComponent, '.btn')
            expect(wrapper.at(1).props().disabled).toBeTruthy()
        })

        test('Should render a clickable save button when the input field has value', async () => {
            let wrapper
            await act(async () => {
                const inputComponent = findByName(component, 'create promo').at(1)
                await inputComponent.props().onChange({ target: { value: 'free' } })
                wrapper = await findByClassName(ModalActionComponent, '.btn')
            })
            expect(wrapper.at(1).instance().disabled).toBeFalsy()
        })

        test('Should unmount the modal when clicking the cancel button', () => {
            ModalActionComponent.at(0).simulate('click')
            const modalWrapper = findByClassName(component, '.modal__background')
            expect(modalWrapper.length).toBe(1)
        })
    })

    describe('Testing Create Promo input text field', () => {
        let inputComponent
        beforeEach(() => {
            inputComponent = findByName(component, 'create promo').at(1)
        })
        test('Should render Modal Content', () => {
            const wrapper = findByClassName(component, '.content')
            expect(wrapper.length).toBe(1)
        })

        test('Should render input text field', () => {
            expect(inputComponent.props().name).toEqual('create promo')
        })

        test('create promo input field should have empty value', () => {
            expect(inputComponent.props().value).toEqual('')
        })

        test('testing create promo input field while providing input', async () => {
            await act(async () => {
                await inputComponent.props().onChange({ target: { value: 'free' } })
            })
            expect(inputComponent.instance().value).toEqual('free')
        })
    })
})
