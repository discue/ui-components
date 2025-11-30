/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Container from '../../src/components/form-elements-container.vue'

describe('FormElementsContainer.vue', () => {
    it('applies provided class to inner container', () => {
        const wrapper = shallowMount(Container, {
            props: { id: 'c1', class: 'extra-class' },
            slots: { default: '<div class="slot-child">X</div>' }
        })

        const inner = wrapper.find('.extra-class')
        expect(inner.exists()).to.equal(true)
        expect(wrapper.find('.slot-child').exists()).to.equal(true)
    })
})
