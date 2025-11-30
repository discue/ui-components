/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import BackToTop from '../../src/components/back-to-top.vue'
import { BACK_TO_TOP_COLOR_DEFAULT, getThemeProperty } from '../../src/theme.js'

describe('BackToTop.vue', () => {
    const originalScrollTo = window.scrollTo

    afterEach(() => {
        window.scrollTo = originalScrollTo
        window.pageYOffset = 0
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    })

    it('does not render button when scroll position is below offset', () => {
        window.pageYOffset = 0
        const wrapper = mount(BackToTop)
        expect(wrapper.find('button').exists()).to.equal(false)
    })

    it('renders button when scroll position is above offset and triggers scrollTo on click', async () => {
        window.pageYOffset = 500
        const scrollToMock = jest.fn()
        window.scrollTo = scrollToMock

        const wrapper = mount(BackToTop)
        await nextTick()

        const btn = wrapper.find('button')
        expect(btn.exists()).to.equal(true)

        // class contains the theme color
        const expectedColor = getThemeProperty(BACK_TO_TOP_COLOR_DEFAULT).value
        expect(btn.classes().join(' ')).to.contain(expectedColor)

        await btn.trigger('click')
        expect(scrollToMock).to.have.property('mock')
        expect(scrollToMock.mock.calls.length).to.equal(1)
        expect(scrollToMock.mock.calls[0][0]).to.deep.equal({ top: 0, behavior: 'smooth' })
    })
})
