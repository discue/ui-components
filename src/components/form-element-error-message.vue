<template>
    <span :id="id"
          :class="clazz"
          v-if:="invalid">{{ description }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { FORM_ELEMENT_ERROR_COLOR_DEFAULT, FORM_ELEMENT_ERROR_COLOR_HINT, FORM_ELEMENT_ERROR_SIZE_DEFAULT, FORM_ELEMENT_ERROR_WEIGHT_DEFAULT, getThemeProperty } from '../theme.js';

const props = defineProps({
    id: {
        type: String
    },
    invalid: {
        type: Boolean,
        default: false,
    },
    showErrorAsHint: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    }
})

const clazz = computed(() => {
    const clazz = ['dsq-form-element-error-message']

    if (props.showErrorAsHint) {
        clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_COLOR_HINT).value)
    } else {
        clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_COLOR_DEFAULT).value)
    }

    clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_SIZE_DEFAULT).value)
    clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_WEIGHT_DEFAULT).value)

    return clazz.join(' ')
})
</script>