import React from 'react'
import { mount } from 'enzyme'
import ConfirmationModal from './ConfirmationModal'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<ConfirmationModal {...props} />)
}

const renderList = () => (
    <ul>
        <li>{'Free Wings over 10$'}</li>
        <li>{'Free Pepsi on NBA Finals'}</li>
    </ul>
)

describe('Test ConfirmationModal component', () => {
    let component
    beforeEach(() => {
        component = SetUp({ renderList })
    })

    test('Should render Confirmation Modal', () => {
        const wrapper = findByClassName(component, '.modal__background')
        expect(wrapper.length).toBe(1)
    })

    describe('Test Confirmation Modal heading', () => {
        let component
        let headerWrapper
        const closeHandler = jest.fn()
        beforeEach(() => {
            component = SetUp({
                action: 'Delete',
                records: 'promos',
                close: closeHandler(),
                renderList,
            })
            headerWrapper = findByClassName(component, '.modal__heading')
        })

        test('Should render modal heading', () => {
            expect(headerWrapper.length).toBe(1)
        })

        test('Should render confirmation modal heading with action and records props', () => {
            const wrapper = findByClassName(headerWrapper, '.heading')
            expect(wrapper.text()).toBe('Are you sure you want to Delete the following promos?')
        })

        test('Should render close icon', () => {
            const wrapper = headerWrapper.find('svg')
            expect(wrapper.length).toBe(1)
        })

        test('Should call callback function on click of close icon', () => {
            const wrapper = headerWrapper.find('svg')
            wrapper.simulate('click')
            expect(closeHandler).toHaveBeenCalled()
        })
    })

    describe('Test Confirmation Modal content', () => {
        let wrapper
        beforeEach(() => {
            wrapper = findByClassName(component, '.confirmation-content')
        })

        test('Should render modal content', () => {
            expect(wrapper.length).toBe(1)
        })

        test('Should render content list', () => {
            const list = wrapper.find('li')
            expect(list.length).toBe(2)
        })
    })

    describe('Test Confirmation Modal actions', () => {
        let component
        let ActionWrapper
        const close = jest.fn()
        const submitHandler = jest.fn()
        beforeEach(() => {
            component = SetUp({
                close,
                submitHandler,
                renderList,
            })
            ActionWrapper = findByClassName(component, '.modal__actions')
        })

        test('Should render modal actions', () => {
            expect(ActionWrapper.length).toBe(1)
        })

        test('Should render cancel button', () => {
            const cancelBtn = ActionWrapper.find('button').at(0)
            expect(cancelBtn.length).toBe(1)
        })

        test('Should render cancel button text', () => {
            const cancelBtn = ActionWrapper.find('button').at(0)
            expect(cancelBtn.text()).toBe('NO, CANCEL')
        })

        test('Should call callback function on click of cancel button', () => {
            const cancelBtn = ActionWrapper.find('button').at(0)
            cancelBtn.simulate('click')
            expect(close).toHaveBeenCalled()
        })

        test('Should render submit button', () => {
            const submitBtn = ActionWrapper.find('button').at(1)
            expect(submitBtn.length).toBe(1)
        })

        test('Should render submit button text', () => {
            const submitBtn = ActionWrapper.find('button').at(1)
            expect(submitBtn.text()).toBe('YES, CONTINUE')
        })

        test('Should not disable submit button', () => {
            const submitBtn = ActionWrapper.find('button').at(1)
            expect(submitBtn.instance().disabled).toBeFalsy()
        })

        test('Should call callback function on click of submit button', () => {
            const submitBtn = ActionWrapper.find('button').at(1)
            submitBtn.simulate('click')
            expect(submitHandler).toHaveBeenCalled()
            expect(close).toHaveBeenCalled()
        })
    })
})
