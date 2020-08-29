import React from 'react'
import { mount } from 'enzyme'
import Menu from './Menu'
import { findByClassName } from '../../../util/testUtil'

describe('Testing Menu Component', () => {
    let component
    const props = {
        option1Click: jest.fn(),
        option2Click: jest.fn(),
        option3Click: jest.fn(),
        option4Click: jest.fn(),
    }
    beforeEach(() => {
        component = mount(
            <Menu placement={'middle'} tipPlacement={'middle'} renderProps={() => <div>Menu</div>}>
                <Menu.MenuItem onClick={props.option1Click}>Option 1</Menu.MenuItem>
                <Menu.MenuItem onClick={props.option2Click}>Option 2</Menu.MenuItem>
                <Menu.MenuItem onClick={props.option3Click}>Option 3</Menu.MenuItem>
                <Menu.MenuItem onClick={props.option4Click}>Option 4</Menu.MenuItem>
            </Menu>
        )
    })

    test('Should render Menu Component', () => {
        const wrapper = findByClassName(component, '.menu')
        expect(wrapper.length).toBe(1)
    })

    test('Should render Menu Main Content', () => {
        const wrapper = findByClassName(component, '.menu__content')
        expect(wrapper.length).toBe(1)
    })

    describe('Testing Menu List Items', () => {
        let menuListWrapper
        beforeEach(() => {
            const wrapper = findByClassName(component, '.menu__content')
            wrapper.simulate('click')
            menuListWrapper = findByClassName(component, '.menu__list--item')
        })

        test('Should render middle placement', () => {
            const wrapper = findByClassName(component, '.menu__list.middle')
            expect(wrapper.length).toBe(1)
        })

        test('Should render middle tip placement', () => {
            const wrapper = findByClassName(component, '.menu__list.tip-middle')
            expect(wrapper.length).toBe(1)
        })

        test('Should render menu list on clicking menu content element', () => {
            const menuListWrapper = findByClassName(component, '.menu__wrapper')
            expect(menuListWrapper.length).toBe(1)
        })

        test('Should render All menu List options', () => {
            expect(menuListWrapper.length).toBe(4)
        })

        test('Should render option 1 children', () => {
            expect(menuListWrapper.at(0).text()).toBe('Option 1')
        })

        test('OnClicking option 1 should call option 1 click handler', () => {
            menuListWrapper.at(0).simulate('click')
            expect(props.option1Click).toHaveBeenCalled()
        })

        test('Should render option 2 children', () => {
            expect(menuListWrapper.at(1).text()).toBe('Option 2')
        })

        test('OnClicking option 2 should call option 1 click handler', () => {
            menuListWrapper.at(1).simulate('click')
            expect(props.option2Click).toHaveBeenCalled()
        })

        test('Should render option 3 children', () => {
            expect(menuListWrapper.at(2).text()).toBe('Option 3')
        })

        test('OnClicking option 4 should call option 3 click handler', () => {
            menuListWrapper.at(2).simulate('click')
            expect(props.option3Click).toHaveBeenCalled()
        })

        test('Should render option 4 children', () => {
            expect(menuListWrapper.at(3).text()).toBe('Option 4')
        })

        test('OnClicking option 4 should call option 4 click handler', () => {
            menuListWrapper.at(3).simulate('click')
            expect(props.option4Click).toHaveBeenCalled()
        })
    })
})
