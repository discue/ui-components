/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { nextTick } from 'vue'
import FormElementsContainer from '../../src/components/form-elements-container.vue'

describe('FormElementsContainer.vue', () => {
    let wrapper

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
        }
    })

    describe('props', () => {
        it('requires id prop', () => {
            const id = 'test-container-id'
            wrapper = mount(FormElementsContainer, {
                props: { id, class: 'custom-class' }
            })
            expect(wrapper.attributes('id')).to.equal(id)
        })

        it('requires class prop', () => {
            const customClass = 'custom-styling-class'
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: customClass }
            })
            
            const innerDiv = wrapper.find('div').find('div')
            expect(innerDiv.classes()).to.include('custom-styling-class')
        })
    })

    describe('computed properties', () => {
        it('applies correct CSS classes combining flex layout with custom class', () => {
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: 'my-custom-class' }
            })
            
            const expectedClasses = 'flex flex-col space-y-5 my-custom-class'
            expect(wrapper.vm.clazz).to.equal(expectedClasses)
        })

        it('handles empty custom class', () => {
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: '' }
            })
            
            const expectedClasses = 'flex flex-col space-y-5 '
            expect(wrapper.vm.clazz).to.equal(expectedClasses)
        })

        it('handles multiple custom classes', () => {
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: 'class1 class2 class3' }
            })
            
            const expectedClasses = 'flex flex-col space-y-5 class1 class2 class3'
            expect(wrapper.vm.clazz).to.equal(expectedClasses)
        })
    })

    describe('rendering', () => {
        it('renders outer div with correct id', () => {
            const testId = 'container-wrapper-id'
            wrapper = mount(FormElementsContainer, {
                props: { id: testId, class: 'test-class' }
            })
            
            expect(wrapper.find('div').attributes('id')).to.equal(testId)
        })

        it('renders inner div with computed classes', () => {
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: 'additional-styles' }
            })
            
            const innerDiv = wrapper.find('div').find('div')
            expect(innerDiv.classes()).to.include('flex')
            expect(innerDiv.classes()).to.include('flex-col')
            expect(innerDiv.classes()).to.include('space-y-5')
            expect(innerDiv.classes()).to.include('additional-styles')
        })

        it('renders slot content', () => {
            const slotContent = '<p>Form elements go here</p>'
            wrapper = mount(FormElementsContainer, {
                props: { id: 'test-id', class: 'test-class' },
                slots: {
                    default: slotContent
                }
            })
            
            expect(wrapper.html()).to.include('Form elements go here')
        })

        it('maintains structure with nested divs', () => {
            wrapper = mount(FormElementsContainer, {
                props: { id: 'outer-id', class: 'inner-class' }
            })
            
            // Should have outer div with id
            const outerDiv = wrapper.find('div')
            expect(outerDiv.attributes('id')).to.equal('outer-id')
            
            // Should have inner div with classes
            const innerDiv = outerDiv.find('div')
            expect(innerDiv.exists()).to.be.true
            expect(innerDiv.classes()).to.include('inner-class')
        })
    })
})