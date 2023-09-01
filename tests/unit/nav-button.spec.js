/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import NavButton from '../../src/components/nav-button.vue';
import { BUTTON_BACKGROUND_INHERIT } from '../../src/theme-keys.js';
import { BUTTON_BACKGROUND_ATTENTION, BUTTON_BACKGROUND_DEFAULT, BUTTON_BACKGROUND_SECONDARY, BUTTON_COLOR_ATTENTION, BUTTON_COLOR_DEFAULT, BUTTON_COLOR_LIGHT, BUTTON_COLOR_SECONDARY, BUTTON_SIZE_DEFAULT, BUTTON_SIZE_SMALL, BUTTON_WEIGHT_DEFAULT, getThemeProperty } from '../../src/theme.js';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('NavLink.vue', () => {
    describe('.textSize', () => {
        it('contains default size', () => {
            const wrapper = shallowMount(NavButton, {
                props: {}
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_SIZE_DEFAULT).value)
        })
        it('contains size small if requested', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    small: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_SIZE_SMALL).value)
        })
    })
    describe('.fontWeight', () => {
        it('has bont font weight', () => {
            const wrapper = shallowMount(NavButton, {
                props: {}
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_WEIGHT_DEFAULT).value)
        })
    })
    describe('.textAndBorderColor', () => {
        it('has light text color', () => {
            const wrapper = shallowMount(NavButton, {
                props: {}
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_COLOR_LIGHT).value)
        })
        it('contains dark color if inverted', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    invert: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_COLOR_DEFAULT).value)
        })
        it('contains attention color if inverted and attention is requested', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    invert: true,
                    attention: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_COLOR_ATTENTION).value)
        })
        it('contains secondary color if inverted and secondary is requested', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    invert: true,
                    secondary: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_COLOR_SECONDARY).value)
        })
    })
    describe('.bgColor', () => {
        it('has default bg color', () => {
            const wrapper = shallowMount(NavButton, {
                props: {}
            })
            expect(wrapper.classes().join(' ')).to.contain(getThemeProperty(BUTTON_BACKGROUND_DEFAULT).value)
        })
        it('has default bg color', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    invert: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_BACKGROUND_INHERIT).value)
        })
        it('has secondary color', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    secondary: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_BACKGROUND_SECONDARY).value)
        })
        it('has attention color', () => {
            const wrapper = shallowMount(NavButton, {
                props: {
                    attention: true
                }
            })
            expect(wrapper.classes()).to.contain(getThemeProperty(BUTTON_BACKGROUND_ATTENTION).value)
        })
    })
})
