<template>
    <span :class="clazz" class="dsq-text">
        <slot />
    </span>
</template>

<script setup>
import { computed } from 'vue';
import { getThemeProperty } from '../theme.js';

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
    },
    inheritColor: {
        type: Boolean,
        default: false
    }
})

const fontWeight = computed(() => {
    if (props.highlight) {
        return getThemeProperty('text.weight.highlight').value
    } else {
        return getThemeProperty('text.weight.default').value
    }
})

const fontColor = computed(() => {
    if (props.light) {
        return getThemeProperty('text.color.light').value
    } else if (props.highlight) {
        return getThemeProperty('text.color.highlight').value
    } else if (props.inheritColor) {
        return getThemeProperty('text.color.inherit').value
    } else {
        return getThemeProperty('text.color.default').value
    }
})

const fontSize = computed(() => {
    if (props.small) {
        return getThemeProperty('text.size.small').value
    } else {
        return getThemeProperty('text.size.default').value
    }
})

const clazz = computed(() => {
    return `${fontSize.value} ${fontWeight.value} ${fontColor.value}`
})

</script>