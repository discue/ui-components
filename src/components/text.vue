<template>
    <span class="dsq-text"
          :class="clazz">
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
    large: {
        type: Boolean,
        default: false
    },
    extraLarge: {
        type: Boolean,
        default: false
    },
    inheritColor: {
        type: Boolean,
        default: false
    },
    inheritFontSize: {
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
    if (!props.inheritColor) {
        if (props.light) {
            return getThemeProperty('text.color.light').value
        } else if (props.highlight) {
            return getThemeProperty('text.color.highlight').value
        } else {
            return getThemeProperty('text.color.default').value
        }
    }
    return ''
})

const fontSize = computed(() => {
    if (props.inheritFontSize) {
        return ''
    } else if (props.small) {
        return getThemeProperty('text.size.small').value
    } else if (props.large) {
        return getThemeProperty('text.size.large').value
    } else if (props.extraLarge) {
        return getThemeProperty('text.size.xlarge').value
    } else {
        return getThemeProperty('text.size.default').value
    }
})

const clazz = computed(() => {
    return `${fontSize.value} ${fontWeight.value} ${fontColor.value}`
})

</script>