/**
 * @jest-environment jsdom
 */

import { mount, shallowMount } from '@vue/test-utils'
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
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text' }
            })
            expect(wrapper.vm.enableCopyToClipboard).to.be.true
        })

        it('accepts enableCopyToClipboard prop', () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text', enableCopyToClipboard: false }
            })
            expect(wrapper.vm.enableCopyToClipboard).to.be.false
        })

        it('requires id prop', () => {
            const id = 'immutable-text-field'
            wrapper = shallowMount(FormImmutableText, {
                props: { id, label: 'Label', text: 'Text' }
            })
            expect(wrapper.vm.id).to.equal(id)
        })

        it('requires label prop', () => {
            const label = 'API Key'
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label, text: 'Text' }
            })
            expect(wrapper.vm.label).to.equal(label)
        })

        it('requires text prop', () => {
            const text = 'sk-1234567890abcdef'
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text }
            })
            expect(wrapper.vm.text).to.equal(text)
        })
    })

    describe('computed properties', () => {
        it('applies correct CSS classes to text', () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'Text' }
            })
            
            const expectedClasses = [
                getThemeProperty(FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT).value,
                getThemeProperty(FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT).value
            ]
            expect(wrapper.vm.textClazz).to.deep.equal(expectedClasses)
        })

        it('shows clipboard button when conditions are met', () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text' }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.true
        })

        it('hides clipboard button when text is empty', () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: '' }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when enableCopyToClipboard is false', () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text', enableCopyToClipboard: false }
            })
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when copy was successful', async () => {
            wrapper = shallowMount(FormImmutableText, {
                props: { id: 'test', label: 'Label', text: 'some-text' }
            })
            
            wrapper.vm.copyToClipboardSuccess = true
            await nextTick()
            
            expect(wrapper.vm.showClipboardButton).to.be.false
        })

        it('hides clipboard button when copy failed', async () => {
            wrapper = shallowMount(FormImmutableText, {
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
            wrapper = shallowMount(FormImmutableText, {
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
            
            wrapper = shallowMount(FormImmutableText, {
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
})