/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import Headlines from '../../src/components/headlines.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Headlines.vue', () => {
    describe('.showHeadline', () => {
        it('is true by default', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {
                    headline: 'Headline Text'
                }
            })
            const headline = wrapper.find('h1')
            expect(headline.text()).to.equal('Headline Text')
        })
        it('does not render the headline if false', () => {
            const wrapper = mount(Headlines, {
                props: {
                    showHeadline: false
                },
                slots: {
                    headline: 'Headline Text'
                }
            })
            const headline = wrapper.find('h1')
            expect(headline.exists()).to.be.false
        })
    })
    describe('.showSubline', () => {
        it('is true by default', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {
                    subline: 'Subline Text'
                }
            })
            const headline = wrapper.find('h2')
            expect(headline.text()).to.equal('Subline Text')
        })
        it('does not render the subline if false', () => {
            const wrapper = mount(Headlines, {
                props: {
                    showSubline: false
                },
                slots: {
                    subline: 'Subline Text'
                }
            })
            const headline = wrapper.find('h2')
            expect(headline.exists()).to.be.false
        })
    })
    describe('.slots', () => {
        describe('.headline', () => {
            it('renders the headline slots', () => {
                const wrapper = mount(Headlines, {
                    props: {},
                    slots: {
                        headline: 'Headline Text'
                    }
                })
                const headline = wrapper.find('h1')
                expect(headline.text()).to.equal('Headline Text')
            })
        })
        describe('.subline', () => {
            it('renders the subline tag', () => {
                const wrapper = mount(Headlines, {
                    props: {},
                    slots: {
                        subline: 'Subline Text'
                    }
                })
                const subline = wrapper.find('h2')
                expect(subline.text()).to.equal('Subline Text')
            })
        })
        describe('.subsubline', () => {
            it('renders the subsubline tag', () => {
                const wrapper = mount(Headlines, {
                    props: {},
                    slots: {
                        subsubline: 'SubSubline Text'
                    }
                })
                const subsubline = wrapper.find('h3')
                expect(subsubline.text()).to.equal('SubSubline Text')
            })
        })
    })
})
