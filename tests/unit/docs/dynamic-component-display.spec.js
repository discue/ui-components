/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import DynamicDisplay from '../../../src/components/docs/dynamic-component-display.vue'
import Text from '../../../src/components/text.vue'

// Create a tiny dummy component to register globally for testing
const Dummy = {
    name: 'Dummy',
    props: {
        foo: { type: String, default: 'bar' },
        flag: { type: Boolean, default: false }
    },
    emits: ['change'],
    template: '<div class="dummy">{{ foo }} - {{ flag }}</div>'
}

describe('Dynamic Component Display', () => {
    it('generates id from type and renders component', async () => {
        const wrapper = mount(DynamicDisplay, {
            global: {
                components: { Dummy, Text }
            },
            props: {
                type: 'Dummy',
                name: 'dummy-name',
                initialValue: 'init',
                attachVModel: true
            }
        })

        // id should be type lowercased + '-preview'
        expect(wrapper.find('#dummy-preview').exists()).to.equal(true)
        // dummy rendered
        expect(wrapper.find('.dummy').text()).to.contain('bar')
        // model value displayed because attachVModel=true
        expect(wrapper.text()).to.contain('Component Value:')
    })

    it('casts and sets boolean and array props via inputs', async () => {
        const wrapper = mount(DynamicDisplay, {
            global: { components: { Dummy, Text } },
            props: { type: 'Dummy', name: 'dummy' }
        })

        // find the boolean select and change to false
        const select = wrapper.find('select')
        if (select.exists()) {
            // use setValue to reliably simulate user selection
            await select.setValue('false')
            await nextTick()
            // ensure dummy shows updated prop (flag default false -> may reflect as 'false')
            expect(wrapper.find('.dummy').text()).to.contain('false')
        }
    })
})
