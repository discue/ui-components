/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import FormInputSelect from '../../src/components/form-input-select.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('FormInputSelect.vue', () => {
    describe('.id', () => {
        it('is set on form element container', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    label: 'My Form Input Select'
                }
            })
            expect(wrapper.attributes().id).to.equal('my-form-input-selectElementContainer')
        })
        it('is set on select element', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'my-form-input-select',
                    label: 'My Form Input Select'
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
                    label: 'My Form Input Select',
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
                    label: 'My Form Input Select',
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
                    label: 'My Form Input Select',
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
    })

    describe('computed and interaction behavior', () => {
        it('uses numeric modelValue directly for select value', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'sel1',
                    label: 'Sel',
                    elements: [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }],
                    modelValue: 1
                }
            })

            const select = wrapper.find('select')
            expect(select.element.value).to.equal('1')
        })

        // removed string modelValue test to enforce Number-only prop

        it('emits update:modelValue as integer on input', async () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'sel3',
                    label: 'Sel',
                    elements: [{ id: 'a' }, { id: 'b' }]
                }
            })

            const select = wrapper.find('select')
            // simulate user selecting the second option
            select.element.value = '1'
            await select.trigger('input')

            const ev = wrapper.emitted()['update:modelValue']
            expect(ev).to.exist
            expect(ev[0][0]).to.equal(1)
        })

        it('toggles isFocussed on focus/blur events', async () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'sel4',
                    label: 'Sel',
                    elements: [{ id: 'a' }]
                }
            })

            const select = wrapper.find('select')
            await select.trigger('focusin')
            expect(wrapper.vm.isFocussed).to.equal(true)
            await select.trigger('focusout')
            expect(wrapper.vm.isFocussed).to.equal(false)
        })

        it('focusSelect dispatches the provided event on the select element', () => {
            const wrapper = mount(FormInputSelect, {
                props: {
                    id: 'sel5',
                    label: 'Sel',
                    elements: [{ id: 'a' }]
                }
            })

            const selectEl = wrapper.vm.$refs.select
            const spy = jest.spyOn(selectEl, 'dispatchEvent')
            const ev = new Event('testing')
            wrapper.vm.focusSelect(ev)
            // jest.spyOn produces a mock with calls stored in spy.mock.calls
            expect(spy.mock.calls[0][0]).to.equal(ev)
            spy.mockRestore()
        })
    })
})
