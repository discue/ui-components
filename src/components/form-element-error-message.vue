<template>
    <span :id="id" v-if:="invalid" :class="clazz">{{ description }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { FORM_ELEMENT_ERROR_COLOR_DEFAULT, FORM_ELEMENT_ERROR_SIZE_DEFAULT, FORM_ELEMENT_ERROR_WEIGHT_DEFAULT, getThemeProperty } from '../theme.js';

defineProps({
    id: {
        type: String
    },
    invalid: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    }
})

const clazz = computed(() => {
    const clazz = ['dsq-form-element-error-message']

    clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_COLOR_DEFAULT).value)
    clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_SIZE_DEFAULT).value)
    clazz.push(getThemeProperty(FORM_ELEMENT_ERROR_WEIGHT_DEFAULT).value)

    return clazz.join(' ')
})
</script>