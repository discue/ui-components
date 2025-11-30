/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import DropDownMenu from '../../src/components/drop-down-menu.vue'

describe('DropDownMenu.vue', () => {
    it('renders children when show=true', () => {
        const wrapper = mount(DropDownMenu, {
            props: { show: true },
            slots: { default: '<li class="child">item</li>' }
        })

        expect(wrapper.find('.child').exists()).to.equal(true)
    })

    it('does not error when calculatePositionDynamically=false', () => {
        const wrapper = mount(DropDownMenu, {
            props: { show: true, calculatePositionDynamically: false },
            slots: { default: '<li>item</li>' }
        })

        // trigger a watch update
        wrapper.vm.$forceUpdate()
        expect(wrapper.exists()).to.equal(true)
    })
})
