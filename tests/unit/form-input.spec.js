/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import FormInput from '../../src/components/form-input.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('FormInput.vue', () => {
    describe('.id', () => {
        it('is set on the input element', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('id')).to.equal('my-form-input')
        })
    })
    describe('.name', () => {
        it('is set on the input element', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('name')).to.equal('test-input')
        })
    })
    describe('.required', () => {
        it('is true by default', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter'
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('required')).to.equal('')
        })
        it('can be set to true', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                    required: true
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('required')).to.equal('')
        })
        it('can be disabled', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                    required: false
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('required')).to.be.undefined
        })
    })
    describe('.disabled', () => {
        it('is false by default', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter'
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('disabled')).to.be.undefined
        })
        it('can be set to false', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                    disabled: false
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('disabled')).to.be.undefined
        })
        it('causes inputs to be disabled', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Peter',
                    disabled: true
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.attributes('disabled')).to.equal('')
        })
    })
    describe('.modelValue', () => {
        it('defines the initial value of the input element', () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Hello World'
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            expect(input.element.value).to.equal('Hello World')
        })
        it('updates the model if input was changed', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                },
                attachTo: document.body
            })
            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.trigger('change')

            expect(wrapper.props('modelValue')).to.equal('Thanks!')
        })
        it('updates the model only if the input was valid', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    pattern: '^[0-9].*$',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                }
            })
            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.trigger('change')

            expect(wrapper.props('modelValue')).to.equal('Hello World')
        })
    })
    describe('.pattern', () => {
        it('defaults to wildcard and validates all values', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                },
                attachTo: document.body
            })

            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.element.focus()
            await input.trigger('change')
            await input.element.blur()

            const error = wrapper.find('.dsq-form-element-error-message')
            expect(error.exists()).to.be.false
        })
        it('invalidates the value if it does not match the pattern', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    pattern: '^[0-9].*$',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                },
                attachTo: document.body
            })

            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.element.focus()
            await input.trigger('change')
            await input.element.blur()

            const error = wrapper.find('.dsq-form-element-error-message')
            expect(error.exists()).to.be.true
        })
    })
    describe('.allowedCharactersSupersetPattern', () => {
        it('defaults to wildcard and validates all values', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                },
                attachTo: document.body
            })

            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.element.focus()
            await input.trigger('change')
            await input.element.blur()

            const error = wrapper.find('.dsq-form-element-error-message')
            expect(error.exists()).to.be.false
        })
        it('invalidates the value if it does not match the pattern', async () => {
            const wrapper = mount(FormInput, {
                props: {
                    id: 'my-form-input',
                    name: 'test-input',
                    label: 'Name',
                    pattern: '^[0-9].*$',
                    allowedCharactersSupersetPattern: '0-9',
                    modelValue: 'Hello World',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
                },
                attachTo: document.body
            })

            const input = wrapper.find('input.dsq-form-input')
            await input.setValue('Thanks!')
            await input.element.focus()
            await input.trigger('change')
            await input.element.blur()

            const error = wrapper.find('.dsq-form-element-error-message')
            expect(error.exists()).to.be.true

            const errorMessage = error.text()
            expect(errorMessage).to.equal('Sorry, the following characters are not allowed here: T, h, a, n, k, s, !')
        })
    })
})
