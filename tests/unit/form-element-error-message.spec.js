/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import FormError from '../../src/components/form-element-error-message.vue'
import { FORM_ELEMENT_ERROR_COLOR_HINT, getThemeProperty } from '../../src/theme.js'

describe('FormElementErrorMessage.vue', () => {
    it('renders nothing when invalid is false', () => {
        const wrapper = shallowMount(FormError, {
            props: { id: 'err1', invalid: false, description: 'Oops' }
        })
        // when v-if is false Vue renders a comment; assert no span is present
        const span = wrapper.find('span')
        expect(span.exists()).to.equal(false)
    })

    it('renders description and uses hint color when showErrorAsHint', () => {
        const wrapper = shallowMount(FormError, {
            props: { id: 'err1', invalid: true, description: 'Oops', showErrorAsHint: true }
        })

        const span = wrapper.find('span')
        expect(span.exists()).to.equal(true)
        expect(span.text()).to.equal('Oops')
        expect(span.classes()).to.contain(getThemeProperty(FORM_ELEMENT_ERROR_COLOR_HINT).value)
    })
})
