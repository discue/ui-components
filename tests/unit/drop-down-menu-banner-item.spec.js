/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import BannerItem from '../../src/components/drop-down-menu-banner-item.vue'

describe('DropDownMenuBannerItem.vue', () => {
    it('renders slot content when show=true', () => {
        const wrapper = shallowMount(BannerItem, {
            slots: { default: '<div class="content">Hello</div>' }
        })

        expect(wrapper.find('.content').exists()).to.equal(true)
    })
})
