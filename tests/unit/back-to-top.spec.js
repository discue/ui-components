/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import BackToTop from '../../src/components/back-to-top.vue'
import { BACK_TO_TOP_COLOR_DEFAULT, getThemeProperty } from '../../src/theme.js'

// Mock ChevronUpIcon
jest.mock('@heroicons/vue/24/outline', () => ({
    ChevronUpIcon: {
        name: 'ChevronUpIcon',
        template: '<div class="w-12 h-12">chevron-up</div>'
    }
}))

// Mock window.scrollTo
const mockScrollTo = jest.fn()
Object.defineProperty(window, 'scrollTo', {
    value: mockScrollTo,
    writable: true
})

describe('BackToTop.vue', () => {
    let wrapper

    beforeEach(() => {
        // Reset scroll properties
        Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true })
        Object.defineProperty(document.body, 'scrollTop', { value: 0, writable: true })
        mockScrollTo.mockClear()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('uses default offset of 300', () => {
            wrapper = mount(BackToTop)
            expect(wrapper.vm.offset).to.equal(300)
        })

        it('accepts custom offset prop', () => {
            wrapper = mount(BackToTop, {
                props: { offset: 500 }
            })
            expect(wrapper.vm.offset).to.equal(500)
        })
    })

    describe('computed properties', () => {
        it('applies correct CSS classes to button', () => {
            wrapper = mount(BackToTop)
            const expectedClass = `dsq-back-to-top bg-inherit -m-2 ${getThemeProperty(BACK_TO_TOP_COLOR_DEFAULT).value}`
            expect(wrapper.vm.buttonClazz).to.equal(expectedClass)
        })

        it('shows button when scroll exceeds offset', async () => {
            wrapper = mount(BackToTop, {
                props: { offset: 200 }
            })
            
            // Initially hidden
            expect(wrapper.vm.show).to.be.false
            
            // Simulate scroll
            Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true })
            wrapper.vm.scrollTop = 250
            await nextTick()
            
            expect(wrapper.vm.show).to.be.true
        })

        it('hides button when scroll is below offset', async () => {
            wrapper = mount(BackToTop, {
                props: { offset: 300 }
            })
            
            // Set scroll below offset
            Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true })
            wrapper.vm.scrollTop = 250
            await nextTick()
            
            expect(wrapper.vm.show).to.be.false
        })
    })

    describe('methods', () => {
        it('scrolls to top when button clicked', async () => {
            // Set scroll to show button
            Object.defineProperty(window, 'pageYOffset', { value: 400, writable: true })
            
            wrapper = mount(BackToTop)
            wrapper.vm.scrollTop = 400
            await nextTick()
            
            const button = wrapper.find('button')
            await button.trigger('click')
            
            // Check that scrollTo was called
            expect(mockScrollTo.mock.calls.length).to.equal(1)
            expect(mockScrollTo.mock.calls[0][0]).to.deep.equal({ top: 0, behavior: 'smooth' })
        })

        it('gets scroll position from pageYOffset', () => {
            Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true })
            wrapper = mount(BackToTop)
            
            const scrollTop = wrapper.vm.getScrollTop()
            expect(scrollTop).to.equal(100)
        })

        it('gets scroll position from documentElement.scrollTop when pageYOffset is 0', () => {
            Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
            Object.defineProperty(document.documentElement, 'scrollTop', { value: 150, writable: true })
            wrapper = mount(BackToTop)
            
            const scrollTop = wrapper.vm.getScrollTop()
            expect(scrollTop).to.equal(150)
        })

        it('gets scroll position from body.scrollTop as fallback', () => {
            Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
            Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true })
            Object.defineProperty(document.body, 'scrollTop', { value: 200, writable: true })
            wrapper = mount(BackToTop)
            
            const scrollTop = wrapper.vm.getScrollTop()
            expect(scrollTop).to.equal(200)
        })
    })

    describe('rendering', () => {
        it('renders button with ChevronUpIcon when shown', async () => {
            Object.defineProperty(window, 'pageYOffset', { value: 400, writable: true })
            wrapper = mount(BackToTop)
            wrapper.vm.scrollTop = 400
            await nextTick()
            
            const button = wrapper.find('button')
            expect(button.exists()).to.be.true
            expect(button.classes()).to.include('dsq-back-to-top')
            expect(button.classes()).to.include('bg-inherit')
            expect(button.classes()).to.include('-m-2')
        })

        it('does not render button when hidden', async () => {
            wrapper = mount(BackToTop)
            wrapper.vm.scrollTop = 100 // Below default offset of 300
            await nextTick()
            
            const button = wrapper.find('button')
            expect(button.exists()).to.be.false
        })
    })
})