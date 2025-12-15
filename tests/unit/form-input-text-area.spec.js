/**
* @jest-environment jsdom
*/

import { mount } from '@vue/test-utils'
import FormInputTextArea from '../../src/components/form-input-text-area.vue'

describe('FormInputTextArea.vue', () => {
    describe('.id', () => {
        it('is set on form element container and textarea', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                }
            })
            expect(wrapper.find('#my-text-area').exists()).toBe(true)
            expect(wrapper.find('textarea#my-text-area').exists()).toBe(true)
        })
    })

    describe('.required', () => {
        it('is true by default', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                }
            })
            expect(wrapper.find('textarea').attributes('required')).toBe('')
        })

        it('can be set to false', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                    required: false,
                }
            })
            expect(wrapper.find('textarea').attributes('required')).toBeUndefined()
        })
    })

    describe('.disabled', () => {
        it('is false by default', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                }
            })
            expect(wrapper.find('textarea').attributes('disabled')).toBeUndefined()
        })

        it('can be set to true', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                    disabled: true,
                }
            })
            expect(wrapper.find('textarea').attributes('disabled')).toBe('')
        })
    })

    describe('.modelValue', () => {
        it('updates the textarea value', async () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: 'Initial value',
                }
            })
            const textarea = wrapper.find('textarea')
            expect(textarea.element.value).toBe('Initial value')

            await wrapper.setProps({ modelValue: 'Updated value' })
            expect(textarea.element.value).toBe('Updated value')
        })
    })

    describe('.placeholder', () => {
        it('is rendered correctly', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                    placeholder: 'Enter text here',
                }
            })
            expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text here')
        })
    })

    describe('focus, classes and computed values', () => {
        it('includes cursor-text by default and cursor-not-allowed when disabled', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'ta1',
                    name: 'n',
                    label: 'L',
                    modelValue: ''
                }
            })
            const cls = wrapper.find('textarea').classes()
            expect(cls).toContain('cursor-text')

            const wrapperDisabled = mount(FormInputTextArea, {
                props: {
                    id: 'ta2',
                    name: 'n',
                    label: 'L',
                    modelValue: '',
                    disabled: true
                }
            })
            expect(wrapperDisabled.find('textarea').classes()).toContain('cursor-not-allowed')
        })

        it('focusInput calls focus on the textarea element', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'ta3',
                    name: 'n',
                    label: 'L',
                    modelValue: ''
                }
            })

            const ta = wrapper.find('textarea')
            const spy = jest.spyOn(ta.element, 'focus')
            ta.element.focus()
            expect(spy).toHaveBeenCalled()
            spy.mockRestore()
        })

        it('toggles inputFocussed on focusin/focusout', async () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'ta4',
                    name: 'n',
                    label: 'L',
                    modelValue: ''
                }
                , attachTo: document.body
            })
            const ta = wrapper.find('textarea')
            // use element.focus() / blur() which sets document.activeElement in jsdom
            ta.element.focus()
            expect(document.activeElement).toBe(ta.element)
            ta.element.blur()
            expect(document.activeElement).not.toBe(ta.element)
        })

        it('computes error from invalidMessage or description and forceContainerShowError from invalid', () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'ta5',
                    name: 'n',
                    label: 'L',
                    modelValue: '',
                    description: 'desc'
                }
            })
            // description provided but not invalid -> error message should not be shown
            const err = wrapper.find('.dsq-form-element-error-message')
            expect(err.exists()).toBe(false)

            const wrapper2 = mount(FormInputTextArea, {
                props: {
                    id: 'ta6',
                    name: 'n',
                    label: 'L',
                    modelValue: '',
                    invalidMessage: 'bad',
                    invalid: true
                }
                , attachTo: document.body
            })
            const err2 = wrapper2.find('.dsq-form-element-error-message')
            expect(err2.exists()).toBe(true)
            expect(err2.text()).toBe('bad')
        })
    })
})