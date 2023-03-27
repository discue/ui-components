<template>
    <button :type="type" :class="clazz" class="dsq-nav-button" @click="onClick">
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue';
import { BUTTON_BACKGROUND_ATTENTION, BUTTON_BACKGROUND_DEFAULT, BUTTON_BACKGROUND_INHERIT, BUTTON_BACKGROUND_SECONDARY, BUTTON_BORDER_COLOR_ATTENTION, BUTTON_BORDER_COLOR_INVERTED, BUTTON_BORDER_COLOR_SECONDARY, BUTTON_COLOR_ATTENTION, BUTTON_COLOR_DEFAULT, BUTTON_COLOR_LIGHT, BUTTON_COLOR_SECONDARY, BUTTON_SIZE_DEFAULT, BUTTON_SIZE_SMALL, BUTTON_WEIGHT_DEFAULT, getThemeProperty } from '../theme.js';

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
        return getThemeProperty(BUTTON_SIZE_SMALL).value
    } else {
        return getThemeProperty(BUTTON_SIZE_DEFAULT).value
    }
})

const textAndBorderColor = computed(() => {
    if (props.invert) {
        if (props.secondary) {
            return `${getThemeProperty(BUTTON_COLOR_SECONDARY).value} ${getThemeProperty(BUTTON_BORDER_COLOR_SECONDARY).value}`
        } else if (props.attention) {
            return `${getThemeProperty(BUTTON_COLOR_ATTENTION).value} ${getThemeProperty(BUTTON_BORDER_COLOR_ATTENTION).value}`
        } else {
            return `${getThemeProperty(BUTTON_COLOR_DEFAULT).value} ${getThemeProperty(BUTTON_BORDER_COLOR_INVERTED).value}`
        }
    } else {
        return getThemeProperty(BUTTON_COLOR_LIGHT).value
    }
})

const fontWeight = computed(() => {
    return getThemeProperty(BUTTON_WEIGHT_DEFAULT).value
})

const bgColor = computed(() => {
    if (props.invert) {
        return getThemeProperty(BUTTON_BACKGROUND_INHERIT).value
    } else if (props.secondary) {
        return getThemeProperty(BUTTON_BACKGROUND_SECONDARY).value
    } else if (props.attention) {
        return getThemeProperty(BUTTON_BACKGROUND_ATTENTION).value
    } else {
        return getThemeProperty(BUTTON_BACKGROUND_DEFAULT).value
    }
})

const clazz = computed(() => {
    if (!props.invert) {
        return `flex cursor-pointer p-3 ${textAndBorderColor.value} ${textSize.value} ${bgColor.value} ${fontWeight.value} hover:shadow-md rounded-lg transform transition-transform hover:-translate-y-1`
    } else {
        return `${textSize.value} ${textAndBorderColor.value} ${bgColor.value} animate ${fontWeight.value} hover:border-b-4 cursor-pointer`

    }
})

function onClick(event) {
    if (props.click) {
        props.click(event)
    }
}
</script>