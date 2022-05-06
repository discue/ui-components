<template>
    <span :class="clazz">
        <slot />
    </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    highlight: {
        type: Boolean,
        default: false,
    },
    light: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false
    }
})

const fontWeight = computed(() => {
    if (props.highlight) {
        return 'font-medium'
    } else {
        return ''
    }
})

const fontColor = computed(() => {
    if (props.light) {
        return 'text-gray-100'
    } else if (props.highlight) {
        return 'text-gray-900'
    } else {
        return 'text-gray-600'
    }
})

const fontSize = computed(() => {
    if (props.small) {
        return 'text-sm'
    } else {
        return 'text-md'
    }
})

const clazz = computed(() => {
    return `${fontSize.value} ${fontWeight.value} ${fontColor.value}`
})

</script>