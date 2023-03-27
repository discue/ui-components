<template>
    <button :type="type" :class="clazz" class="dsq-nav-button" @click="onClick">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'submit'
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
    click: {
        type: Function
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
        if (props.secondary) {
            return 'text-gray-500 hover:border-gray-500'
        } else if (props.attention) {
            return 'text-attention-900 hover:border-attention-900'
        } else {
            return 'text-gray-900 hover:border-gray-900'
        }
    } else {
        return 'text-gray-100'
    }
})

const bgColor = computed(() => {
    if (props.invert) {
        return 'bg-inherit'
    } else if (props.secondary) {
        return 'bg-gray-500'
    } else if (props.attention) {
        return 'bg-attention-900'
    } else {
        return 'bg-gray-900'
    }
})

const clazz = computed(() => {
    if (!props.invert) {
        return `flex cursor-pointer p-3 ${textAndBorderColor.value} ${textSize.value} ${bgColor.value} font-bold hover:shadow-md rounded-lg transform transition-transform hover:-translate-y-1`
    } else {
        return `${textSize.value} ${textAndBorderColor.value} ${bgColor.value} animate font-bold hover:border-b-4 cursor-pointer`

    }
})

function onClick(event) {
    if (props.click) {
        props.click(event)
    }
}
</script>