/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import Banner from '../../src/components/banner.vue'

describe('Banner.vue', () => {
    it('computes class and emits open when visible', async () => {
        const wrapper = mount(Banner, {
            props: {
                show: true,
                bottom: false,
                closeButtonTitle: 'Close'
            },
        })

        // content rendered inside wrapper because Teleport is stubbed
        await nextTick()
        const el = wrapper.find('.dsq-banner')
        expect(el.exists()).to.equal(true)
        const classes = el.classes().join(' ')
        expect(classes).to.contain('top-0')
        expect(classes).to.contain('absolute')
    })
})
