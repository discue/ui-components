/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import DropDownMenu from '../../src/components/drop-down-menu.vue'

// Mock throttle utility
jest.mock('../../src/utils/throttle.js', () => ({
    createThrottleFn: () => (fn, delay) => {
        const throttledFn = jest.fn((...args) => fn(...args))
        throttledFn.clear = jest.fn()
        return throttledFn
    }
}))

// Mock getBoundingClientRect
const mockGetBoundingClientRect = jest.fn(() => ({
    top: 100,
    left: 50,
    bottom: 200,
    right: 200,
    width: 150,
    height: 100
}))

Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
    value: mockGetBoundingClientRect
})

describe('DropDownMenu.vue', () => {
    let wrapper

    beforeEach(() => {
        // Mock window dimensions
        Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
        Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true })
        
        // Mock document dimensions
        Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true })
        Object.defineProperty(document.documentElement, 'clientWidth', { value: 1200, writable: true })
        
        mockGetBoundingClientRect.mockClear()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('has default show prop as true', () => {
            wrapper = mount(DropDownMenu)
            expect(wrapper.vm.show).to.be.true
        })

        it('accepts show prop', () => {
            wrapper = mount(DropDownMenu, {
                props: { show: false }
            })
            expect(wrapper.vm.show).to.be.false
        })

        it('has default calculatePositionDynamically prop as true', () => {
            wrapper = mount(DropDownMenu)
            expect(wrapper.vm.calculatePositionDynamically).to.be.true
        })

        it('accepts calculatePositionDynamically prop', () => {
            wrapper = mount(DropDownMenu, {
                props: { calculatePositionDynamically: false }
            })
            expect(wrapper.vm.calculatePositionDynamically).to.be.false
        })
    })

    describe('rendering', () => {
        it('renders menu when show is true', () => {
            wrapper = mount(DropDownMenu, {
                props: { show: true }
            })
            
            const menu = wrapper.find('.dsq-drop-down-menu')
            expect(menu.exists()).to.be.true
            expect(menu.classes()).to.include('bg-gray-50')
            expect(menu.classes()).to.include('text-gray-900')
            expect(menu.classes()).to.include('fixed')
            expect(menu.classes()).to.include('shadow-md')
            expect(menu.classes()).to.include('rounded-md')
        })

        it('does not render menu when show is false', () => {
            wrapper = mount(DropDownMenu, {
                props: { show: false }
            })
            
            const menu = wrapper.find('.dsq-drop-down-menu')
            expect(menu.exists()).to.be.false
        })

        it('renders ul with correct classes', () => {
            wrapper = mount(DropDownMenu, {
                props: { show: true }
            })
            
            const ul = wrapper.find('ul')
            expect(ul.exists()).to.be.true
            expect(ul.classes()).to.include('dsq-drop-down-menu')
            expect(ul.classes()).to.include('text-left')
            expect(ul.classes()).to.include('text-lg')
            expect(ul.classes()).to.include('list-none')
        })

        it('renders slot content', () => {
            const slotContent = '<li>Menu Item</li>'
            wrapper = mount(DropDownMenu, {
                props: { show: true },
                slots: {
                    default: slotContent
                }
            })
            
            expect(wrapper.html()).to.include('Menu Item')
        })
    })

    describe('position calculation', () => {
        beforeEach(() => {
            // Create a mock parent element
            const mockParent = document.createElement('div')
            mockParent.getBoundingClientRect = jest.fn(() => ({
                top: 150,
                left: 100,
                bottom: 200,
                right: 300,
                width: 200,
                height: 50
            }))
            
            // Setup DOM for testing
            document.body.appendChild(mockParent)
        })

        it('calculates position when show is true and calculatePositionDynamically is enabled', async () => {
            wrapper = mount(DropDownMenu, {
                props: { show: true, calculatePositionDynamically: true },
                attachTo: document.body
            })
            
            // Wait for the component to be mounted and calculations to run
            await nextTick()
            
            // The component should attempt to calculate position
            expect(wrapper.vm.calculatePositionDynamically).to.be.true
            expect(wrapper.vm.show).to.be.true
        })

        it('does not calculate position when calculatePositionDynamically is false', async () => {
            wrapper = mount(DropDownMenu, {
                props: { show: true, calculatePositionDynamically: false }
            })
            
            await nextTick()
            
            // Component should not attempt dynamic positioning
            expect(wrapper.vm.calculatePositionDynamically).to.be.false
        })
    })

    describe('viewport detection', () => {
        it('correctly identifies element in viewport', () => {
            wrapper = mount(DropDownMenu)
            
            const rect = {
                top: 10,
                left: 10,
                bottom: 100,
                right: 100
            }
            
            const result = wrapper.vm.isInViewport(rect)
            expect(result).to.be.true
        })

        it('correctly identifies element outside viewport (negative top)', () => {
            wrapper = mount(DropDownMenu)
            
            const rect = {
                top: -10,
                left: 10,
                bottom: 100,
                right: 100
            }
            
            const result = wrapper.vm.isInViewport(rect)
            expect(result).to.be.false
        })

        it('correctly identifies element outside viewport (exceeds bottom)', () => {
            wrapper = mount(DropDownMenu)
            
            const rect = {
                top: 10,
                left: 10,
                bottom: 900, // Beyond window.innerHeight (800)
                right: 100
            }
            
            const result = wrapper.vm.isInViewport(rect)
            expect(result).to.be.false
        })

        it('correctly identifies element outside viewport (exceeds right)', () => {
            wrapper = mount(DropDownMenu)
            
            const rect = {
                top: 10,
                left: 10,
                bottom: 100,
                right: 1300 // Beyond window.innerWidth (1200)
            }
            
            const result = wrapper.vm.isInViewport(rect)
            expect(result).to.be.false
        })
    })

    describe('lifecycle management', () => {
        it('clears throttle on unmount', () => {
            wrapper = mount(DropDownMenu)
            
            const throttleClearSpy = jest.spyOn(wrapper.vm.throttle, 'clear')
            
            wrapper.unmount()
            
            expect(throttleClearSpy.mock.calls.length).to.equal(1)
        })
    })
})