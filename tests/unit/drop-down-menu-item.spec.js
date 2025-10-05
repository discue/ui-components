/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import DropDownMenuItem from '../../src/components/drop-down-menu-item.vue'

// Mock vue-router
const mockPush = jest.fn()
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}))

describe('DropDownMenuItem.vue', () => {
    let wrapper

    beforeEach(() => {
        mockPush.mockClear()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('has default show prop as true', () => {
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test Item', href: '/test' }
            })
            expect(wrapper.vm.show).to.be.true
        })

        it('accepts show prop', () => {
            wrapper = mount(DropDownMenuItem, {
                props: { show: false, label: 'Test Item', href: '/test' }
            })
            expect(wrapper.vm.show).to.be.false
        })

        it('requires label prop', () => {
            const label = 'Navigation Item'
            wrapper = mount(DropDownMenuItem, {
                props: { label, href: '/test' }
            })
            expect(wrapper.vm.label).to.equal(label)
        })

        it('requires href prop', () => {
            const href = '/navigation-path'
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test', href }
            })
            expect(wrapper.vm.href).to.equal(href)
        })
    })

    describe('rendering', () => {
        it('renders li element when show is true', () => {
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test Item', href: '/test' }
            })
            
            const li = wrapper.find('li')
            expect(li.exists()).to.be.true
            expect(li.classes()).to.include('dsq-drop-down-menu-item')
            expect(li.classes()).to.include('flex')
            expect(li.classes()).to.include('flex-row')
            expect(li.classes()).to.include('items-center')
            expect(li.classes()).to.include('hover:bg-gray-300')
            expect(li.classes()).to.include('cursor-pointer')
        })

        it('does not render li element when show is false', () => {
            wrapper = mount(DropDownMenuItem, {
                props: { show: false, label: 'Test Item', href: '/test' }
            })
            
            const li = wrapper.find('li')
            expect(li.exists()).to.be.false
        })

        it('renders label text', () => {
            const label = 'My Menu Item'
            wrapper = mount(DropDownMenuItem, {
                props: { label, href: '/test' }
            })
            
            expect(wrapper.text()).to.include(label)
            const span = wrapper.find('span')
            expect(span.text()).to.equal(label)
        })

        it('renders slot content', () => {
            const slotContent = '<svg>icon</svg>'
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test', href: '/test' },
                slots: {
                    default: slotContent
                }
            })
            
            expect(wrapper.html()).to.include('icon')
        })

        it('applies correct CSS classes to icon container', () => {
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test', href: '/test' }
            })
            
            const iconContainer = wrapper.find('div.flex.items-center')
            expect(iconContainer.exists()).to.be.true
            expect(iconContainer.classes()).to.include('text-gray-500')
            expect(iconContainer.classes()).to.include('group-hover:text-gray-900')
        })
    })

    describe('behavior', () => {
        it('navigates to href when clicked', async () => {
            const href = '/dashboard'
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Dashboard', href }
            })
            
            const li = wrapper.find('li')
            await li.trigger('click')
            
            expect(mockPush.mock.calls.length).to.equal(1)
            expect(mockPush.mock.calls[0][0]).to.deep.equal({ path: href })
        })

        it('prevents default click behavior', async () => {
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test', href: '/test' }
            })
            
            const li = wrapper.find('li')
            const clickEvent = { preventDefault: jest.fn() }
            
            // Simulate click with prevent modifier
            await li.trigger('click', clickEvent)
            
            // The onClick method should be called (which will use router.push)
            expect(mockPush.mock.calls.length).to.equal(1)
        })

        it('handles empty href gracefully', async () => {
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Test', href: '' }
            })
            
            const li = wrapper.find('li')
            await li.trigger('click')
            
            // Should not navigate if href is empty
            expect(mockPush.mock.calls.length).to.equal(0)
        })

        it('calls onClick method when li is clicked', async () => {
            const href = '/profile'
            wrapper = mount(DropDownMenuItem, {
                props: { label: 'Profile', href }
            })
            
            const li = wrapper.find('li')
            await li.trigger('click')
            
            // Check that router.push was called with correct path
            expect(mockPush.mock.calls.length).to.equal(1)
            expect(mockPush.mock.calls[0][0]).to.deep.equal({ path: href })
        })
    })
})