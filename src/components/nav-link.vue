<template>
    <a :href="href" :class="clazz" :rel="rel" :target="target" @click="click($event)">
        <slot />

        <span v-if="hasExternalLink">
            <svg class="external-link-icon inline-block relative align-middle -top-0.5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
                x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15">
                <path fill="currentColor"
                    d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
                </path>
                <polygon fill="currentColor"
                    points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
                </polygon>
            </svg>
        </span>
    </a>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

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
    }
})

const textSize = computed(() => {
    if (props.small) {
        return 'text-md'
    } else {
        return 'text-xl'
    }
})

const textAndBorderColor = computed(() => {
    if (props.invert) {
        return 'text-gray-100'
    } if (props.secondary) {
        return 'text-gray-500 hover:border-gray-500'
    } else if (props.attention) {
        return 'text-attention-900 hover:border-attention-500'
    } else {
        return 'text-gray-900 hover:border-gray-900'
    }
})

const bgColor = computed(() => {
    if (props.secondary) {
        return 'bg-gray-500'
    } else if (props.attention) {
        return 'bg-attention-900'
    } else {
        return 'bg-gray-900'
    }
})

const clazz = computed(() => {
    if (props.invert) {
        return `p-3 ${textAndBorderColor.value} ${textSize.value} ${bgColor.value} font-bold hover:shadow-md rounded-lg transform transition-transform hover:-translate-y-1`
    } else {
        return `${textSize.value} ${textAndBorderColor.value} animate font-bold hover:border-b-4 cursor-pointer`

    }
})

const hasExternalLink = computed(() => {
    const { href } = props
    const { hostname } = window.location
    return href.startsWith('http') && !href.includes(hostname)
})

const hasAnchor = computed(() => {
    const { href } = props
    return !hasExternalLink.value && href.includes('#')
})

const rel = computed(() => {
    if (hasExternalLink.value) {
        return 'noopener noreferrer'
    } else {
        return ''
    }
})

const target = computed(() => {
    if (props.target) {
        return props.target
    } else if (hasExternalLink.value) {
        return '_blank'
    } else {
        return '_self'
    }
})

function click(event) {
    if (hasExternalLink.value || hasAnchor.value) {
        // let the browser do the work
    } else {
        event.preventDefault()
        event.stopImmediatePropagation()
        router.push(props.href)
    }
}
</script>