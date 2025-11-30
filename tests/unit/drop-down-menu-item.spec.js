/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import DropDownItem from '../../src/components/drop-down-menu-item.vue'

const mockPush = jest.fn()
jest.mock('vue-router', () => ({
    useRouter: () => ({ push: mockPush })
}))

describe('DropDownMenuItem.vue', () => {
    it('renders label and triggers router push on click', async () => {
        const wrapper = shallowMount(DropDownItem, {
            props: { label: 'Go', href: '/path' }
        })

        expect(wrapper.text()).to.contain('Go')
        await wrapper.trigger('click')
        expect(mockPush.mock.calls.length).to.equal(1)
    })
})
