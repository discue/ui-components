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

    describe('@focus and @blur', () => {
        it('updates inputFocussed state', async () => {
            const wrapper = mount(FormInputTextArea, {
                props: {
                    id: 'my-text-area',
                    name: 'test-textarea',
                    label: 'Label',
                    modelValue: '',
                }
            })
            const textarea = wrapper.find('textarea')

            await textarea.trigger('focus')
            expect(wrapper.vm.inputFocussed).toBe(true)

            await textarea.trigger('blur')
            expect(wrapper.vm.inputFocussed).toBe(false)
        })
    })
})