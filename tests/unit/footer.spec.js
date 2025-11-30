/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Footer from '../../src/internal/footer.vue'
// Mock vue-router's useRouter so NavLink/useRouter calls in Footer don't warn during tests
jest.mock('vue-router', () => ({
    useRouter: () => ({ push: jest.fn() })
}))

describe('Internal Footer', () => {
    it('renders logo when showLogo=true', () => {
        const wrapper = mount(Footer, { props: { showLogo: true } })
        expect(wrapper.find('svg').exists()).to.equal(true)
        expect(wrapper.text()).to.contain('discue')
    })

    it('does not render logo when showLogo=false', () => {
        const wrapper = mount(Footer, { props: { showLogo: false } })
        // logo is inside NavLink -> svg may not render; ensure title text not present
        expect(wrapper.text()).to.not.contain('discue')
    })
})
