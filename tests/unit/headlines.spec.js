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
    describe('.headlineTag', () => {
        it('renders h1 tag by default', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {
                    headline: 'Headline Text'
                }
            })
            const headline = wrapper.find('h1')
            expect(headline.text()).to.equal('Headline Text')
        })
        it('renders h3 tag if requested', () => {
            const wrapper = mount(Headlines, {
                props: {
                    headlineTag: 'h3'
                },
                slots: {
                    headline: 'Headline Text'
                }
            })
            const headline = wrapper.find('h3')
            expect(headline.text()).to.equal('Headline Text')
        })
        it('is not rendered if headline slot is empty', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {}
            })
            const headline = wrapper.find('h1')
            expect(headline.exists()).to.equal(false)
        })
    })
    describe('.sublineTag', () => {
        it('renders h2 tag by default', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {
                    subline: 'Subline Text'
                }
            })
            const headline = wrapper.find('h2')
            expect(headline.text()).to.equal('Subline Text')
        })
        it('renders h3 tag if requested', () => {
            const wrapper = mount(Headlines, {
                props: {
                    sublineTag: 'h3'
                },
                slots: {
                    subline: 'Subline Text'
                }
            })
            const headline = wrapper.find('h3')
            expect(headline.text()).to.equal('Subline Text')
        })
        it('is not rendered if subline slot is empty', () => {
            const wrapper = mount(Headlines, {
                props: {},
                slots: {}
            })
            const headline = wrapper.find('h2')
            expect(headline.exists()).to.equal(false)
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
    })
})
