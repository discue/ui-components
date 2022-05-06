<template>
    <a :href="href" :class="clazz" @click="click($event)">
        <slot />
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
    size: {
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

function click(event) {
    if (props.href.includes('#') && !props.href.includes('/')) {
        // let the browser do the scrolling
    } else {
        event.preventDefault()
        event.stopImmediatePropagation()
        router.push(props.href)
    }
}
</script>