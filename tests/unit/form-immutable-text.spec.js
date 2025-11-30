/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Immutable from '../../src/components/form-immutable-text.vue'

describe('FormImmutableText.vue', () => {
    const originalClipboardItem = window.ClipboardItem
    const originalClipboard = navigator.clipboard

    afterEach(() => {
        window.ClipboardItem = originalClipboardItem
        navigator.clipboard = originalClipboard
    })

    it('does not show clipboard button when ClipboardItem is unavailable', () => {
        window.ClipboardItem = undefined
        const wrapper = mount(Immutable, {
            props: { id: 'i1', label: 'L', text: 'secret' }
        })
        expect(wrapper.find('button').exists()).to.equal(false)
    })

    it('shows clipboard button when ClipboardItem available and clicking writes to clipboard', async () => {
        window.ClipboardItem = function () { }
        const writeText = jest.fn().mockResolvedValue()
        navigator.clipboard = { writeText }

        const wrapper = mount(Immutable, {
            props: { id: 'i2', label: 'L2', text: 'secret-2' }
        })

        const btn = wrapper.find('button')
        expect(btn.exists()).to.equal(true)
        await btn.trigger('click')
        // wait for async copy to settle
        await new Promise(r => setTimeout(r, 0))
        expect(writeText.mock.calls.length).to.be.greaterThan(0)
        // after success, success icon/button should be visible and original clipboard button hidden
        expect(wrapper.find('button.text-green-700').exists()).to.equal(true)
        // original clipboard button uses text-gray-700 class; it should be hidden
        expect(wrapper.find('button.text-gray-700').exists()).to.equal(false)
    })

    it('shows failure icon and error message when clipboard write rejects', async () => {
        window.ClipboardItem = function () { }
        const writeText = jest.fn().mockRejectedValue(new Error('nope'))
        navigator.clipboard = { writeText }

        const wrapper = mount(Immutable, {
            props: { id: 'i3', label: 'L3', text: 'secret-3' }
        })

        const btn = wrapper.find('button')
        expect(btn.exists()).to.equal(true)
        await btn.trigger('click')
        // wait for async rejection handling
        await new Promise(r => setTimeout(r, 0))

        // failure button with class text-attention should be present
        expect(wrapper.find('button.text-attention').exists()).to.equal(true)
        // error message should be included in the rendered description
        expect(wrapper.text()).to.contain('Sorry, we were not able to copy to the clipboard')
    })
})
