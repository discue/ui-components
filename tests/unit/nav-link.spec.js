/**
 * @jest-environment jsdom
 */

import { mount, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import NavLink from '../../src/components/nav-link.vue';

const mockPush = jest.fn();
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NavLink.vue', () => {
  it('does not render external icon for relative root links', () => {
    const msg = 'new message'
    const wrapper = shallowMount(NavLink, {
      slots: {
        default: msg
      },
      props: {
        href: '/relative'
      }
    })
    expect(wrapper.vm.$refs.externalLink).to.be.undefined
  })
  it('does not render external icon for relative links', () => {
    const msg = 'new message'
    const wrapper = shallowMount(NavLink, {
      slots: {
        default: msg
      },
      props: {
        href: 'relative'
      }
    })
    expect(wrapper.vm.$refs.externalLink).to.be.undefined
  })

  it('does not render the external icon for subdomains', () => {
    const msg = 'new message'
    const wrapper = mount(NavLink, {
      slots: {
        default: msg
      },
      props: {
        href: 'https://www.discue.io',
        window: {
          location: {
            hostname: 'docs.discue.io'
          }
        }
      }
    })
    expect(wrapper.vm.$refs.externalLink).to.be.undefined
  })
  it('renders the external icon for external links', () => {
    const msg = 'new message'
    const wrapper = mount(NavLink, {
      slots: {
        default: msg
      },
      props: {
        href: 'google.com/relative'
      }
    })
    expect(wrapper.vm.$refs.externalLink).to.not.be.undefined
  })
  it('renders the external icon for external links with protocol', () => {
    const msg = 'new message'
    const wrapper = shallowMount(NavLink, {
      slots: {
        default: msg
      },
      props: {
        href: 'https://www.google.com/relative'
      }
    })
    expect(wrapper.vm.$refs.externalLink).to.not.be.undefined
  })
})
