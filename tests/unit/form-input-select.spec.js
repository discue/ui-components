/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { nextTick } from 'vue';
import FormInputSelect from '../../src/components/form-input-select.vue';
import { FORM_ELEMENT_SELECT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_SELECT_TEXT_COLOR_DEFAULT, FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT, getThemeProperty } from '../../src/theme.js';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('FormInputSelect.vue', () => {
    let wrapper

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('requires id prop', () => {
            const id = 'my-form-input-select'
            wrapper = mount(FormInputSelect, {
                props: { id, label: 'Test Label' }
            })
            expect(wrapper.vm.id).to.equal(id)
        })

        it('requires label prop', () => {
            const label = 'Select Label'
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label }
            })
            expect(wrapper.vm.label).to.equal(label)
        })

        it('has default disabled prop as false', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            expect(wrapper.vm.disabled).to.be.false
        })

        it('accepts disabled prop', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', disabled: true }
            })
            expect(wrapper.vm.disabled).to.be.true
        })

        it('accepts description prop', () => {
            const description = 'Helper text'
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', description }
            })
            expect(wrapper.vm.description).to.equal(description)
        })

        it('accepts elements prop', () => {
            const elements = [{ id: '1', name: 'Option 1' }]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements }
            })
            expect(wrapper.vm.elements).to.deep.equal(elements)
        })

        it('accepts modelValue prop', () => {
            const modelValue = 1
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', modelValue }
            })
            expect(wrapper.vm.modelValue).to.equal(modelValue)
        })

        it('has default forceShowErrorMessage prop as false', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            expect(wrapper.vm.forceShowErrorMessage).to.be.false
        })

        it('accepts forceShowErrorMessage prop', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', forceShowErrorMessage: true }
            })
            expect(wrapper.vm.forceShowErrorMessage).to.be.true
        })
    })

    describe('computed properties', () => {
        it('calculates inputValue based on modelValue', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', modelValue: 2 }
            })
            expect(wrapper.vm.inputValue).to.equal(2)
        })

        it('defaults inputValue to 0 when modelValue is not set', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            expect(wrapper.vm.inputValue).to.equal(0)
        })

        it('applies correct CSS classes to select element', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            const expectedClass = [
                'dsq-form-input-select px-2 pb-1 pt-4 border-none w-full bg-inherit opacity-100 focus:outline-hidden cursor-pointer',
                getThemeProperty(FORM_ELEMENT_SELECT_TEXT_COLOR_DEFAULT).value,
                getThemeProperty(FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT).value,
                getThemeProperty(FORM_ELEMENT_SELECT_FONT_WEIGHT_DEFAULT).value
            ].join(' ')
            
            expect(wrapper.vm.selectClazz).to.equal(expectedClass)
        })

        it('applies correct CSS classes to option elements', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            const expectedClass = [
                'w-24',
                getThemeProperty(FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT).value
            ].join(' ')
            
            expect(wrapper.vm.optionClazz).to.equal(expectedClass)
        })

        it('validates input when elements and modelValue are present', () => {
            const elements = [{ id: '1', name: 'Option 1' }, { id: '2', name: 'Option 2' }]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements, modelValue: 1 }
            })
            expect(wrapper.vm.isInvalid).to.be.false
        })

        it('marks as invalid when modelValue is out of range', () => {
            const elements = [{ id: '1', name: 'Option 1' }]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements, modelValue: 5 }
            })
            expect(wrapper.vm.isInvalid).to.be.true
        })
    })

    describe('methods', () => {
        it('sets focus state on focus', async () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            expect(wrapper.vm.isFocussed).to.be.false
            
            wrapper.vm.onFocus()
            await nextTick()
            
            expect(wrapper.vm.isFocussed).to.be.true
        })

        it('clears focus state on blur', async () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            wrapper.vm.isFocussed = true
            wrapper.vm.onBlur()
            await nextTick()
            
            expect(wrapper.vm.isFocussed).to.be.false
        })

        it('emits update:modelValue on input with parsed integer', async () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            // Mock the select element value
            wrapper.vm.$refs.select.value = '2'
            
            wrapper.vm.onInput()
            
            expect(wrapper.emitted('update:modelValue')).to.have.lengthOf(1)
            expect(wrapper.emitted('update:modelValue')[0][0]).to.equal(2)
        })

        it('focuses select element when focusSelect is called', () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            const mockEvent = new Event('focus')
            const dispatchSpy = jest.spyOn(wrapper.vm.$refs.select, 'dispatchEvent')
            
            wrapper.vm.focusSelect(mockEvent)
            
            expect(dispatchSpy.mock.calls.length).to.equal(1)
            expect(dispatchSpy.mock.calls[0][0]).to.equal(mockEvent)
        })
    })

    describe('.id', () => {
        it('is set on form element container', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select'
                }
            })
            expect(wrapper.attributes().id).to.equal('my-form-input-selectElementContainer')
        })
        it('is set on select element', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select'
                }
            })
            expect(wrapper.vm.$refs.select.attributes.id.value).to.equal('my-form-input-select')
        })
    })
    describe('.elements', () => {
        it('expects key value pairs with format {id, name}', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    elements: [
                        {
                            id: '1',
                            name: 'abc'
                        }
                    ]
                }
            })
            const option = wrapper.find('option')
            expect(option.text()).to.equal('abc')
        })
        it('expects key value pairs with format {id, alias}', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    elements: [
                        {
                            id: '1',
                            alias: 'abc'
                        }
                    ]
                }
            })
            const option = wrapper.find('option')
            expect(option.text()).to.equal('abc')
        })
        it('does not expect key value pairs with format {id, label} but renders anyways', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    elements: [
                        {
                            id: '1',
                            label: 'abc'
                        }
                    ]
                }
            })
            const option = wrapper.find('option')
            expect(option.text()).to.have.length(0)
        })

        it('renders option with alias when name is not provided', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    elements: [
                        {
                            id: '1',
                            alias: 'Alternative Name'
                        }
                    ]
                }
            })
            const option = wrapper.find('option')
            expect(option.text()).to.equal('Alternative Name')
        })

        it('prefers name over alias when both are provided', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    elements: [
                        {
                            id: '1',
                            name: 'Primary Name',
                            alias: 'Alternative Name'
                        }
                    ]
                }
            })
            const option = wrapper.find('option')
            expect(option.text()).to.equal('Primary Name')
        })
    })

    describe('event handling', () => {
        it('handles focus event', async () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            const select = wrapper.find('select')
            await select.trigger('focus')
            
            expect(wrapper.vm.isFocussed).to.be.true
        })

        it('handles blur event', async () => {
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label' }
            })
            
            wrapper.vm.isFocussed = true
            const select = wrapper.find('select')
            await select.trigger('blur')
            
            expect(wrapper.vm.isFocussed).to.be.false
        })

        it('handles input event and emits modelValue update', async () => {
            const elements = [
                { id: '1', name: 'Option 1' },
                { id: '2', name: 'Option 2' }
            ]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements }
            })
            
            const select = wrapper.find('select')
            await select.setValue('1')
            
            expect(wrapper.emitted('update:modelValue')).to.have.lengthOf(1)
            expect(wrapper.emitted('update:modelValue')[0][0]).to.equal(1)
        })
    })

    describe('rendering', () => {
        it('renders select element with correct attributes', () => {
            const id = 'test-select'
            wrapper = mount(FormInputSelect, {
                props: { id, label: 'Label', disabled: true }
            })
            
            const select = wrapper.find('select')
            expect(select.exists()).to.be.true
            expect(select.attributes('id')).to.equal(id)
            expect(select.attributes('disabled')).to.equal('')
        })

        it('renders options for each element', () => {
            const elements = [
                { id: '1', name: 'First Option' },
                { id: '2', name: 'Second Option' },
                { id: '3', name: 'Third Option' }
            ]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements }
            })
            
            const options = wrapper.findAll('option')
            expect(options).to.have.lengthOf(3)
            expect(options[0].text()).to.equal('First Option')
            expect(options[1].text()).to.equal('Second Option')
            expect(options[2].text()).to.equal('Third Option')
        })

        it('sets correct value attribute on options', () => {
            const elements = [
                { id: '1', name: 'Option 1' },
                { id: '2', name: 'Option 2' }
            ]
            wrapper = mount(FormInputSelect, {
                props: { id: 'test', label: 'Label', elements }
            })
            
            const options = wrapper.findAll('option')
            expect(options[0].attributes('value')).to.equal('0')
            expect(options[1].attributes('value')).to.equal('1')
        })
    })
})
