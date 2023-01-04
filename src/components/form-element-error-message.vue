<template>
    <span :id="id" v-if:="invalid" :class="clazz">{{ description }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { FORMELEMENTERROR_COLOR_DEFAULT, FORMELEMENTERROR_SIZE_DEFAULT, FORMELEMENTERROR_WEIGHT_DEFAULT, getThemeProperty } from '../theme.js';

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

    clazz.push(getThemeProperty(FORMELEMENTERROR_COLOR_DEFAULT).value)
    clazz.push(getThemeProperty(FORMELEMENTERROR_SIZE_DEFAULT).value)
    clazz.push(getThemeProperty(FORMELEMENTERROR_WEIGHT_DEFAULT).value)

    return clazz.join(' ')
})
</script>