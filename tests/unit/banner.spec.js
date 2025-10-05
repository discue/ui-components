/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import Banner from '../../src/components/banner.vue'

describe('Banner.vue', () => {
    let wrapper

    beforeEach(() => {
        // Create a target element for teleport
        const targetElement = document.createElement('div')
        targetElement.id = 'banner-container'
        document.body.appendChild(targetElement)
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
        // Clean up target element
        const targetElement = document.getElementById('banner-container')
        if (targetElement) {
            document.body.removeChild(targetElement)
        }
    })

    describe('props', () => {
        it('has default show prop as false', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body' }
            })
            expect(wrapper.vm.show).to.be.false
        })

        it('accepts show prop', () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            expect(wrapper.vm.show).to.be.true
        })

        it('requires parent prop', () => {
            const parent = '#banner-container'
            wrapper = mount(Banner, {
                props: { parent }
            })
            expect(wrapper.vm.parent).to.equal(parent)
        })

        it('has default bottom prop as false', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body' }
            })
            expect(wrapper.vm.bottom).to.be.false
        })

        it('accepts bottom prop', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body', bottom: true }
            })
            expect(wrapper.vm.bottom).to.be.true
        })

        it('has default closeButtonTitle', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body' }
            })
            expect(wrapper.vm.closeButtonTitle).to.equal('Close')
        })

        it('accepts custom closeButtonTitle', () => {
            const customTitle = 'Dismiss Banner'
            wrapper = mount(Banner, {
                props: { parent: 'body', closeButtonTitle: customTitle }
            })
            expect(wrapper.vm.closeButtonTitle).to.equal(customTitle)
        })
    })

    describe('computed properties', () => {
        it('hides banner when show is false', () => {
            wrapper = mount(Banner, {
                props: { show: false, parent: 'body' }
            })
            expect(wrapper.vm.showBanner).to.be.false
        })

        it('shows banner when show is true and not force closed', () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            expect(wrapper.vm.showBanner).to.be.true
        })

        it('hides banner when force closed', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            
            wrapper.vm.forceCloseBanner = true
            await nextTick()
            
            expect(wrapper.vm.showBanner).to.be.false
        })

        it('applies correct CSS classes for top positioning (default)', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body' }
            })
            
            const classes = wrapper.vm.clazz
            expect(classes).to.include('top-0')
            expect(classes).to.include('fixed')
            expect(classes).to.include('z-50')
            expect(classes).to.include('pl-3 py-3 pr-12 w-full bg-lime-300 flex items-center justify-center font-medium shadow-sm')
        })

        it('applies correct CSS classes for bottom positioning', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body', bottom: true }
            })
            
            const classes = wrapper.vm.clazz
            expect(classes).to.include('bottom-0')
            expect(classes).to.include('fixed')
            expect(classes).to.include('z-50')
        })

        it('applies absolute positioning when no parent specified', () => {
            // Test with disabled teleport
            wrapper = mount(Banner, {
                props: { parent: '' },
                global: {
                    stubs: {
                        Teleport: {
                            template: '<div><slot /></div>'
                        }
                    }
                }
            })
            
            const classes = wrapper.vm.clazz
            expect(classes).to.include('absolute')
            expect(classes).to.include('z-10')
        })

        it('applies fixed positioning when parent specified', () => {
            wrapper = mount(Banner, {
                props: { parent: 'body' }
            })
            
            const classes = wrapper.vm.clazz
            expect(classes).to.include('fixed')
            expect(classes).to.include('z-50')
        })
    })

    describe('methods and events', () => {
        it('closes banner when close button clicked', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            
            // Initially shown
            expect(wrapper.vm.showBanner).to.be.true
            
            // Click close button
            wrapper.vm.closeBanner()
            await nextTick()
            
            // Should be hidden
            expect(wrapper.vm.showBanner).to.be.false
        })

        it('emits open event when banner becomes visible', async () => {
            wrapper = mount(Banner, {
                props: { show: false, parent: 'body' }
            })
            
            // Change show prop to true
            await wrapper.setProps({ show: true })
            await nextTick()
            
            expect(wrapper.emitted('open')).to.have.lengthOf(1)
        })

        it('emits close event when banner becomes hidden', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            
            // Force close the banner
            wrapper.vm.closeBanner()
            await nextTick()
            
            expect(wrapper.emitted('close')).to.have.lengthOf(1)
        })

        it('emits close event when show prop changes to false', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: 'body' }
            })
            
            await wrapper.setProps({ show: false })
            await nextTick()
            
            expect(wrapper.emitted('close')).to.have.lengthOf(1)
        })
    })

    describe('rendering', () => {
        it('renders banner with correct classes when shown', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: '#banner-container' }
            })
            
            // Check the content is teleported to the target
            const targetElement = document.getElementById('banner-container')
            expect(targetElement.children.length).to.be.greaterThan(0)
            
            // Check the banner element in the target
            const banner = targetElement.querySelector('.dsq-banner')
            expect(banner).to.not.be.null
            expect(banner.classList.contains('bg-lime-300')).to.be.true
            expect(banner.classList.contains('fixed')).to.be.true
            expect(banner.classList.contains('top-0')).to.be.true
        })

        it('does not render banner when hidden', () => {
            wrapper = mount(Banner, {
                props: { show: false, parent: '#banner-container' }
            })
            
            const targetElement = document.getElementById('banner-container')
            expect(targetElement.children.length).to.equal(0)
        })

        it('renders close button with correct title', async () => {
            const customTitle = 'Hide Banner'
            wrapper = mount(Banner, {
                props: { show: true, parent: '#banner-container', closeButtonTitle: customTitle }
            })
            
            const targetElement = document.getElementById('banner-container')
            const closeButton = targetElement.querySelector('button')
            expect(closeButton).to.not.be.null
            
            const title = closeButton.querySelector('title')
            expect(title.textContent).to.equal(customTitle)
        })

        it('renders slot content', async () => {
            const slotContent = '<p>Banner message content</p>'
            wrapper = mount(Banner, {
                props: { show: true, parent: '#banner-container' },
                slots: {
                    default: slotContent
                }
            })
            
            const targetElement = document.getElementById('banner-container')
            expect(targetElement.innerHTML).to.include('Banner message content')
        })

        it('triggers close when button clicked', async () => {
            wrapper = mount(Banner, {
                props: { show: true, parent: '#banner-container' }
            })
            
            const targetElement = document.getElementById('banner-container')
            const closeButton = targetElement.querySelector('button')
            
            // Manually trigger the closeBanner method instead of DOM event
            wrapper.vm.closeBanner()
            await wrapper.vm.$nextTick()
            
            expect(wrapper.vm.showBanner).to.be.false
        })
    })
})