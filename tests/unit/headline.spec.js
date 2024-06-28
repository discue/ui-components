/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import Headline from '../../src/components/headline.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Headline.vue', () => {
    describe('.level', () => {
        it('has value 1 by default', () => {
            const wrapper = mount(Headline, {
                props: {},
                slots: {
                    default: 'Text'
                }
            })
            const headline = wrapper.find('h1')
            expect(headline.text()).to.equal('Text')
        })
        it('can be set to 2', () => {
            const wrapper = mount(Headline, {
                props: {
                    level: 2
                },
                slots: {
                    default: 'Text'
                }
            })
            const headline = wrapper.find('h2')
            expect(headline.text()).to.equal('Text')
        })
        it('can be set to 3', () => {
            const wrapper = mount(Headline, {
                props: {
                    level: 3
                },
                slots: {
                    default: 'Text'
                }
            })
            const headline = wrapper.find('h3')
            expect(headline.text()).to.equal('Text')
        })
    })
})
