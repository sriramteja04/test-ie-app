import React from 'react'
import { mount } from 'enzyme'
import TextArea from './TextArea'
import { findByClassName } from '../../../util/testUtil'

const SetUp = (props = {}) => {
    return mount(<TextArea {...props} />)
}

describe('Testing TextArea component ', () => {
    let component
    const props = {
        onChange: jest.fn(),
        value: 'This is Text Area Component',
        label: 'text area label',
        id: 'text-area-id',
    }
    let textAreaWrapper

    beforeEach(() => {
        component = SetUp(props)
        textAreaWrapper = component.find('textarea')
    })

    test('Should render Text Area component', () => {
        const wrapper = findByClassName(component, '.text-area')
        expect(wrapper.length).toBe(1)
    })

    test('Should render text area with value', () => {
        expect(textAreaWrapper.props().value).toBe(props.value)
    })

    test('Should call text area change handler', () => {
        textAreaWrapper.simulate('change')
        expect(props.onChange).toHaveBeenCalled()
    })

    test('Should render text area with provided prop id', () => {
        expect(textAreaWrapper.props().id).toBe(props.id)
    })

    test('Should render Text Area component with label', () => {
        const wrapper = findByClassName(component, '.text-area__label')
        expect(wrapper.text()).toBe(props.label)
    })
})
