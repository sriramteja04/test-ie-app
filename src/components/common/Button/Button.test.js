import React from 'react'
import { mount } from 'enzyme'

import Button from './Button'
import { findByClassName } from '../../../util/testUtil'
import { util } from '../../../util'

const SetUp = (props = {}) => {
    return mount(<Button {...props}>Button Clicked</Button>)
}

describe('Testing Button Component', () => {
    describe('Testing Basic Button UI', () => {
        let component
        beforeEach(() => {
            component = SetUp()
        })

        test('Should render Button Component', () => {
            const btnWrapper = findByClassName(component, '.btn')
            expect(btnWrapper.length).toBe(1)
        })

        test('Should render button text', () => {
            const btnWrapper = findByClassName(component, '.btn')
            expect(btnWrapper.text()).toEqual('Button Clicked')
        })

        test('Should render a dark button with lg width', () => {
            const component = SetUp({
                color: 'dark',
                size: 'lg',
            })

            const btnWrapper = findByClassName(component, '.btn.btn-dark.lg')
            expect(btnWrapper.length).toBe(1)
        })

        test('Should render Button with Icon', () => {
            const component = SetUp({
                inputProps: {
                    start: util.TuneIcon,
                },
            })
            const btnWrapper = component.find('svg')
            expect(btnWrapper.length).toBe(1)
        })
        test('Should render Icon before text', () => {
            const component = SetUp({
                inputProps: {
                    start: util.TuneIcon,
                },
            })
            const btnWrapper = findByClassName(component, '.btn__start')
            expect(btnWrapper.length).toBe(1)
        })
        test('Should render Icon After text', () => {
            const component = SetUp({
                inputProps: {
                    end: util.TuneIcon,
                },
            })
            const btnWrapper = findByClassName(component, '.btn__end')
            expect(btnWrapper.length).toBe(1)
        })
    })

    describe('Testing Button Click event functionality', () => {
        let component
        const clickHandler = jest.fn()
        beforeEach(() => {
            const props = {
                onClick: clickHandler,
                color: 'dark',
                width: 'xxl',
            }
            component = SetUp(props)
        })

        test('clickHandler should have been called after clicking Button', () => {
            const btnWrapper = findByClassName(component, '.btn')
            btnWrapper.simulate('click')
            expect(clickHandler).toHaveBeenCalled()
        })
    })

    describe('Testing disabled Button functionality', () => {
        let component
        const clickHandler = jest.fn()
        beforeEach(() => {
            const props = {
                onClick: clickHandler,
                color: 'dark',
                width: 'xxl',
                disabled: true,
            }
            component = SetUp(props)
        })

        test('Should render disabled button', () => {
            const btnWrapper = findByClassName(component, '.btn.btn-disabled')
            expect(btnWrapper.length).toBe(1)
        })

        test('clickHandler should not have been called after click', () => {
            const btnWrapper = findByClassName(component, '.btn.btn-disabled')
            btnWrapper.simulate('click')
            expect(clickHandler).toHaveBeenCalledTimes(0)
        })
    })
})
