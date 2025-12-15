/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { nextTick } from 'vue';
import FormInputRadio from '../../src/components/form-input-radio.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('FormInputRadio.vue', () => {
    describe('.id', () => {
        it('is set on form element container', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                }
            })
            expect(wrapper.attributes().id).to.equal('my-form-input-radioElementContainer')
        })
        it('is part of id on radio input element', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            expect(wrapper.find('.dsq-form-input-radio-wrapper [id=radio_my-form-input-radio_Audi_id]')).to.not.be.undefined
            expect(wrapper.find('.dsq-form-input-radio-wrapper [id=radio_my-form-input-radio_Audi_id]')).to.not.be.null
        })
        it('is part of for attribute of the label', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            expect(wrapper.find('.dsq-form-input-radio-wrapper [for=radio_my-form-input-radio_Audi_id]')).to.not.be.undefined
            expect(wrapper.find('.dsq-form-input-radio-wrapper [for=radio_my-form-input-radio_Audi_id]')).to.not.be.null
        })
    })
    describe('.required', () => {
        it('is true by default', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input')
            inputs.forEach((input) => {
                expect(input.attributes().required).to.equal('')
            })
        })
        it('can be set to true', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    required: true,
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input')
            inputs.forEach((input) => {
                expect(input.attributes().required).to.equal('')
            })
        })
        it('can be disabled', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    required: false,
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input')
            inputs.forEach((input) => {
                expect(input.attributes().required).to.be.undefined
            })
        })
    })
    describe('.disabled', () => {
        it('is false by default', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input')
            inputs.forEach((input) => {
                expect(input.attributes().disabled).to.be.undefined
            })
        })
        it('can be set to false', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    disabled: false,
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input')
            inputs.forEach((input) => {
                expect(input.attributes().disabled).to.be.undefined
            })
        })
        it('causes inputs to be disabled', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    disabled: true,
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input[type="radio"]')
            inputs.forEach((input) => {
                expect(input.attributes().disabled).to.equal('')
            })
        })
        it('is true by default if options have length 1', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input[type="radio"]')
            inputs.forEach((input) => {
                expect(input.attributes().disabled).to.equal('')
            })
        })
    })
    describe('.vertical', () => {
        it('is false by default', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-col')).to.have.length(1)
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-col')).to.have.length(1)
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-row')).to.have.length(0)
        })
        it('caused the options to be rendered vertically by adding flex-row class', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    vertical: true,
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-row')).to.have.length(1)
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-row')).to.have.length(1)
            expect(wrapper.findAll('.dsq-form-input-radio-wrapper.flex-col')).to.have.length(0)
        })
    })
    describe('.modelValue', () => {
        it('checks the target option', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const checkedOption = wrapper.find('.dsq-form-input-radio-wrapper [checked]')
            expect(checkedOption.attributes().value).to.equal('1')
            expect(wrapper.find('.dsq-form-input-radio-wrapper [for=radio_my-form-input-radio_Audi_id]')).to.not.be.null
        })
    })
    describe('.options', () => {
        it('are rendered into two input[type="radio"] elements', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const inputs = wrapper.findAll('.dsq-form-input-radio-wrapper input[type="radio"]')
            expect(inputs).to.have.length(2)
            expect(inputs.at(0).attributes().value).to.equal('0')
            expect(inputs.at(1).attributes().value).to.equal('1')
        })
        it('are rendered into two label elements', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const labels = wrapper.findAll('.dsq-form-input-radio-wrapper label')
            expect(labels).to.have.length(2)
        })
        it('labels are rendered in order', () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                }
            })
            const labels = wrapper.findAll('.dsq-form-input-radio-wrapper label span')
            expect(labels).to.have.length(2)
            expect(labels.at(0).text()).to.equal('Audi')
            expect(labels.at(1).text()).to.equal('Tesla')
        })
    })
    describe('@click', () => {
        it('checks the clicked radio', async () => {
            const wrapper = mount(FormInputRadio, {
                props: {
                    id: 'my-form-input-radio',
                    name: 'test-radio',
                    label: 'Label',
                    modelValue: '1',
                    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
                    options: [{ value: '0', label: 'Audi' }, { value: '1', label: 'Tesla' }]
                },
                attachTo: document.body
            })
            const labels = wrapper.findAll('.dsq-form-input-radio-wrapper label')
            const radios = wrapper.findAll('.dsq-form-input-radio-wrapper input[type="radio"]')

            expect(radios.at(0).attributes().name).to.equal(radios.at(1).attributes().name)

            expect(labels).to.have.length(2)
            expect(radios).to.have.length(2)
            expect(radios.at(0).attributes().checked).to.be.undefined
            expect(radios.at(1).attributes().checked).to.equal('')

            await labels.at(0).trigger('click')
            await nextTick()
            expect(wrapper.props().modelValue).to.equal('0')
            expect(radios.at(0).attributes().checked).to.equal('')
            expect(radios.at(1).attributes().checked).to.be.undefined
        })
    })
})
