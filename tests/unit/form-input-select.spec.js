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
    })
})
