import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Text from '../../src/components/text.vue'

describe('Text.vue', () => {
  it('renders the default slot as text content', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      }
    })
    expect(wrapper.text()).to.include(msg)
  })

  it('uses light-ish color by default', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
    })
    expect(wrapper.classes()).to.include('text-gray-900')
  })

  it('uses medium font size by default', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
    })
    expect(wrapper.classes()).to.include('text-md')
  })

  it('styles as bold if prop "highlight" is true', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
      props: {
        highlight: true
      }
    })
    expect(wrapper.classes()).to.include('font-medium')
  })

  it('uses dark color if prop "highlight" is true', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
      props: {
        highlight: true
      }
    })
    expect(wrapper.classes()).to.include('text-gray-900')
  })

  it('uses light color if prop "light" is true', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
      props: {
        light: true
      }
    })
    expect(wrapper.classes()).to.include('text-gray-100')
  })

  it('uses small font size if prop "small" is true', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
      props: {
        light: true
      }
    })
    expect(wrapper.classes()).to.include('text-md')
  })

  it('inherits font font-color if prop "inherit-color" is true', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Text, {
      slots: {
        default: msg
      },
      props: {
        inheritColor: true
      }
    })
    expect(wrapper.classes()).to.include('text-inherit')
  })
})
