/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import StaticRender from '../../../src/components/docs/static-component-render.vue'

describe('Static Component Render', () => {
    it('renders slot content', () => {
        const wrapper = mount(StaticRender, {
            slots: {
                default: '<span class="slot-content">Hello</span>'
            }
        })
        expect(wrapper.find('.slot-content').text()).to.equal('Hello')
    })
})
