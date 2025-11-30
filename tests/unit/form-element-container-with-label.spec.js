/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Container from '../../src/components/form-element-container-with-label.vue'

describe('FormElementContainerWithLabel.vue', () => {
    it('renders label and computes classes', async () => {
        const wrapper = mount(Container, {
            props: {
                id: 'myid',
                label: 'My Label',
                description: 'desc'
            }
        })

        const label = wrapper.find('label')
        expect(label.exists()).to.equal(true)
        expect(label.text()).to.equal('My Label')

        const parent = wrapper.find(`#myidElementContainer`)
        expect(parent.exists()).to.equal(true)
        // default should contain cursor-text class
        expect(parent.classes()).to.contain('cursor-text')
    })

    it('shows pattern hint when focussed and pattern provided', async () => {
        const wrapper = mount(Container, {
            props: {
                id: 'myid',
                label: 'Label',
                pattern: 'abc',
                showPatternHint: true,
                format: 'fmt',
                showFormatHint: false,
                focussed: true
            }
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.html()).to.contain('Allowed values')
        // format hint should not be shown because showFormatHint is false
        expect(wrapper.html()).to.not.contain('Allowed format')
    })

    it('shows format hint when focussed and showFormatHint is true', async () => {
        const wrapper = mount(Container, {
            props: {
                id: 'myid2',
                label: 'Label',
                format: 'fmt',
                showFormatHint: true,
                focussed: true
            }
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.html()).to.contain('Allowed format')
    })
})
