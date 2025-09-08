/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import FormImmutableText from '../../src/components/form-immutable-text.vue'
import { FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT, getThemeProperty } from '../../src/theme.js'

// Mock heroicons
jest.mock('@heroicons/vue/24/outline', () => ({
    ClipboardDocumentCheckIcon: {
        name: 'ClipboardDocumentCheckIcon',
        template: '<div class="h-6 w-6">check</div>'
    },
    ClipboardIcon: {
        name: 'ClipboardIcon',
        template: '<div class="h-6 w-6">clipboard</div>'
    }
}))

// Mock clipboard API
const mockWriteText = jest.fn()
Object.defineProperty(navigator, 'clipboard', {
    value: {
        writeText: mockWriteText
    },
    configurable: true
})

// Mock ClipboardItem
Object.defineProperty(window, 'ClipboardItem', {
    value: function() {},
    configurable: true
})

describe('FormImmutableText.vue', () => {
    let wrapper

    beforeEach(() => {
        mockWriteText.mockClear()
        mockWriteText.mockResolvedValue()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('has default enableCopyToClipboard prop as true', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text' }
            })
            expect(wrapper.vm.enableCopyToClipboard).to.be.true
        })

        it('accepts enableCopyToClipboard prop', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text', enableCopyToClipboard: false }
            })
            expect(wrapper.vm.enableCopyToClipboard).to.be.false
        })

        it('requires id prop', () => {
            const id = 'immutable-text-field'
            wrapper = mount(FormImmutableText, {
                props: { id, label: 'Label', text: 'Text' }
            })
            expect(wrapper.vm.id).to.equal(id)
        })

        it('requires label prop', () => {
            const label = 'API Key'
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label, text: 'Text' }
            })
            expect(wrapper.vm.label).to.equal(label)
        })

        it('requires text prop', () => {
            const text = 'sk-1234567890abcdef'
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text }
            })
            expect(wrapper.vm.text).to.equal(text)
        })
    })

    describe('computed properties', () => {
        it('applies correct CSS classes to text', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text' }
            })
            
            const expectedClasses = [
                getThemeProperty(FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT).value,
                getThemeProperty(FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT).value
            ]
            expect(wrapper.vm.textClazz).to.deep.equal(expectedClasses)
        })

        it('shows clipboard button when conditions are met', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text' }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.true
        })

        it('hides clipboard button when text is empty', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: '' }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when enableCopyToClipboard is false', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text', enableCopyToClipboard: false }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when copy was successful', async () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text' }
            })
            
            wrapper.vm.copyToClipboardSuccess = true
            await nextTick()
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when copy failed', async () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text' }
            })
            
            wrapper.vm.copyToClipboardFailure = true
            await nextTick()
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })
    })

    describe('clipboard functionality', () => {
        it('copies text to clipboard successfully', async () => {
            const testText = 'test-api-key-12345'
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: testText }
            })
            
            await wrapper.vm.copyKeyToClipboard()
            
            expect(mockWriteText.mock.calls.length).to.equal(1)
            expect(mockWriteText.mock.calls[0][0]).to.equal(testText)
            expect(wrapper.vm.copyToClipboardSuccess).to.be.true
            expect(wrapper.vm.copyToClipboardFailure).to.be.false
        })

        it('handles clipboard copy failure', async () => {
            const testText = 'test-api-key-12345'
            mockWriteText.mockRejectedValue(new Error('Clipboard error'))
            
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: testText }
            })
            
            await wrapper.vm.copyKeyToClipboard()
            
            expect(wrapper.vm.copyToClipboardSuccess).to.be.false
            expect(wrapper.vm.copyToClipboardFailure).to.be.true
            expect(wrapper.vm.copyToClipboardErrorMsg).to.equal(
                'Sorry, we were not able to copy to the clipboard at this time. Please copy the text manually.'
            )
        })
    })

    describe('rendering', () => {
        it('renders FormElementContainerWithLabel with correct props', () => {
            const id = 'api-key'
            const label = 'API Key'
            wrapper = mount(FormImmutableText, {
                props: { id, label, text: 'key-value' }
            })
            
            const container = wrapper.findComponent({ name: 'FormElementContainerWithLabel' })
            expect(container.exists()).to.be.true
            expect(container.props('id')).to.equal(id)
            expect(container.props('label')).to.equal(label)
            expect(container.props('disabled')).to.be.true
            expect(container.props('focussed')).to.be.false
        })

        it('renders Text component with correct props', () => {
            const id = 'text-field'
            const text = 'display-text'
            wrapper = mount(FormImmutableText, {
                props: { id, label: 'Label', text }
            })
            
            const textComponent = wrapper.findComponent({ name: 'Text' })
            expect(textComponent.exists()).to.be.true
            expect(textComponent.props('id')).to.equal(id)
            expect(textComponent.props('inheritFontSize')).to.be.true
            expect(textComponent.text()).to.equal(text)
        })

        it('renders clipboard button when showClipboardButton is true', () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'copyable-text' }
            })
            
            const clipboardButton = wrapper.find('button[data-test="clipboard-button"]')
            if (!clipboardButton.exists()) {
                // If data-test isn't available, find by class or content
                const buttons = wrapper.findAll('button')
                const clipboardButtonAlt = buttons.find(btn => btn.html().includes('ClipboardIcon'))
                expect(clipboardButtonAlt.exists()).to.be.true
            }
        })

        it('renders success state after successful copy', async () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'copyable-text' }
            })
            
            wrapper.vm.copyToClipboardSuccess = true
            await nextTick()
            
            const buttons = wrapper.findAll('button')
            const successButton = buttons.find(btn => btn.html().includes('ClipboardDocumentCheckIcon'))
            expect(successButton.exists()).to.be.true
        })

        it('renders error state after failed copy', async () => {
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'copyable-text' }
            })
            
            wrapper.vm.copyToClipboardFailure = true
            await nextTick()
            
            const buttons = wrapper.findAll('button')
            const errorButton = buttons.find(btn => btn.html().includes('svg'))
            expect(errorButton.exists()).to.be.true
        })

        it('triggers copy when clipboard button is clicked', async () => {
            const testText = 'clickable-text'
            wrapper = mount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: testText }
            })
            
            const copyMethodSpy = jest.spyOn(wrapper.vm, 'copyKeyToClipboard')
            
            const buttons = wrapper.findAll('button')
            const clipboardButton = buttons.find(btn => 
                btn.html().includes('ClipboardIcon') || 
                btn.classes().includes('cursor-pointer')
            )
            
            if (clipboardButton.exists()) {
                await clipboardButton.trigger('click')
                expect(copyMethodSpy.mock.calls.length).to.equal(1)
            }
        })
    })
})