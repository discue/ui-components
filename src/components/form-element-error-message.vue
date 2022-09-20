<template>
    <span :id="id" v-if:="invalid" class="dsq-form-element-error-message text-attention-800 text-xs font-medium">{{ description }}</span>
</template>

<script setup>
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
</script>