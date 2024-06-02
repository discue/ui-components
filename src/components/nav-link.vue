<template>
    <a :href="href"
       :class="clazz"
       class="dsq-nav-link"
       :rel="rel"
       :target="linkTarget"
       @click="click($event)">
        <slot />
    </a>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getThemeProperty } from '../theme.js';

const router = useRouter()

const props = defineProps({
    href: {
        type: String,
    },
    invert: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
    secondary: {
        type: Boolean,
        default: false
    },
    attention: {
        type: Boolean,
        default: false
    },
    target: {
        type: String,
    },
    // window injection for testing only
    window: {
        __hideInPreview: true
    }
})

const textSize = computed(() => {
    if (props.small) {
        return getThemeProperty('link.size.small').value
    } else {
        return getThemeProperty('link.size.default').value
    }
})

const textColor = computed(() => {
    if (props.invert) {
        return getThemeProperty('link.color.light').value
    } if (props.secondary) {
        return getThemeProperty('link.color.secondary').value
    } else if (props.attention) {
        return getThemeProperty('link.color.attention').value
    } else {
        return getThemeProperty('link.color.default').value
    }
})

const borderColor = computed(() => {
    if (props.secondary) {
        return getThemeProperty('link.border.secondary').value
    } else if (props.attention) {
        return getThemeProperty('link.border.attention').value
    } else {
        return getThemeProperty('link.border.default').value
    }
})

const bgColor = computed(() => {
    if (props.invert) {
        if (props.secondary) {
            return getThemeProperty('button.background.secondary').value
        } else if (props.attention) {
            return getThemeProperty('button.background.attention').value
        } else {
            return getThemeProperty('button.background.default').value
        }
    } else {
        return ''
    }
})

const fontWeight = computed(() => {
    return getThemeProperty('link.weight.default').value
})

const clazz = computed(() => {
    const clazz = []
    if (isExternalLink.value) {
        clazz.push('external-link-icon')
    }
    if (props.invert) {
        clazz.push(`p-3 ${textColor.value} ${borderColor.value} ${textSize.value} ${bgColor.value} ${fontWeight.value} hover:shadow-md rounded-lg transform transition-transform hover:-translate-y-1`)
    } else {
        clazz.push(`${textSize.value} ${textColor.value} ${borderColor.value} animate ${fontWeight.value} hover:border-b-4 cursor-pointer`)
    }
    return clazz.join(' ')
})

const isRelativeLink = computed(() => {
    return props.href[0] === '/' || props.href.indexOf('.') === -1
})

const windowHostname = computed(() => {
    const { hostname } = (props.window ?? window).location
    return hostname
})

const isExternalLink = computed(() => {
    const companyDomain = windowHostname.value.split('.').slice(-2).join('.')
    return !props.href.includes(companyDomain) && !isRelativeLink.value
})

const isSamePageLink = computed(() => {
    // add slash before and after hostname to check whether full domain is include in href prop
    return isRelativeLink.value || props.href.includes(`/${windowHostname.value}/`)
})

const hasAnchor = computed(() => {
    return props.href.includes('#')
})

const rel = computed(() => {
    if (isExternalLink.value) {
        return 'noopener noreferrer'
    } else {
        return ''
    }
})

const linkTarget = computed(() => {
    if (props.target) {
        return props.target
    } else if (isExternalLink.value) {
        return '_blank'
    } else {
        return '_self'
    }
})

function click(event) {
    // if its an absolute link for the same domain
    // and the link has an anchor we scroll to the element
    if (hasAnchor.value && isSamePageLink.value) {
        const anchor = props.href.substring(props.href.indexOf('#'))
        const targetElement = window.document.querySelector(anchor)
        if (targetElement) {
            targetElement.scrollTo({ behavior: 'smooth' })
            return
        }
    }

    if (isRelativeLink.value) {
        event.preventDefault()
        event.stopImmediatePropagation()
        router.push(props.href)
    }
}
</script>