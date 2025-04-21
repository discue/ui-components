/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Breadcrumbs from '../../src/components/breadcrumbs.vue'

const mockPush = jest.fn()
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}))

describe('Breadcrumbs.vue', () => {
    it('renders breadcrumbs correctly', () => {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Category', path: '/category' },
            { name: 'Item', path: '/category/item' },
        ]

        const wrapper = mount(Breadcrumbs, {
            props: { crumbs },
        })

        const breadcrumbItems = wrapper.findAll('li')
        expect(breadcrumbItems.length).to.equal(crumbs.length)

        crumbs.forEach((crumb, index) => {
            const breadcrumbText = breadcrumbItems[index].text()
            expect(breadcrumbText).to.include(crumb.name)

            if (crumb.path) {
                const link = breadcrumbItems[index].find('a')
                expect(link.exists()).to.be.true
                expect(link.attributes('href')).to.equal(crumb.path)
            } else {
                const span = breadcrumbItems[index].find('span')
                expect(span.exists()).to.be.true
                expect(span.text()).to.equal(crumb.name)
            }
        })
    })

    it('applies the correct class to the last breadcrumb', () => {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Category', path: '/category' },
            { name: 'Item' },
        ]

        const wrapper = mount(Breadcrumbs, {
            props: { crumbs },
        })

        const lastBreadcrumb = wrapper.findAll('li').at(crumbs.length - 1)
        const span = lastBreadcrumb.find('span')
        expect(span.exists()).to.be.true
        expect(span.classes()).to.include('text-gray-500')
        expect(span.classes()).to.include('font-medium')
    })

    it('ensures that crumb names are added in order', () => {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Category', path: '/category' },
            { name: 'Item' },
        ]

        const wrapper = mount(Breadcrumbs, {
            props: { crumbs },
        })

        const breadcrumbItems = wrapper.findAll('li')
        crumbs.forEach((crumb, index) => {
            expect(breadcrumbItems[index].text()).to.include(crumb.name)
        })
    })

    it('renders a span instead of a link if a crumb does not have a path property', () => {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Category', path: '/category' },
            { name: 'Item' },
        ]

        const wrapper = mount(Breadcrumbs, {
            props: { crumbs },
        })

        const breadcrumbItems = wrapper.findAll('li')
        const lastBreadcrumb = breadcrumbItems.at(crumbs.length - 1)
        const span = lastBreadcrumb.find('span')
        expect(span.exists()).to.be.true
        expect(span.text()).to.equal('Item')

        const link = lastBreadcrumb.find('a')
        expect(link.exists()).to.be.false
    })

    it('does not render a span if all crumbs have a path property', () => {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Category', path: '/category' },
            { name: 'Item', path: '/category/item' },
        ]

        const wrapper = mount(Breadcrumbs, {
            props: { crumbs },
        })

        const breadcrumbItems = wrapper.findAll('li')
        const lastBreadcrumb = breadcrumbItems.at(crumbs.length - 1)
        const span = lastBreadcrumb.find('span')
        expect(span.exists()).to.be.true
        expect(span.text()).to.equal('Item')

        const link = lastBreadcrumb.find('a')
        expect(link.exists()).to.be.true
    })
})
