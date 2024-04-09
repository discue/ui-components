<template>
    <p class="component-preview flex flex-col justify-center w-full">
        <slot />
    </p>
</template>

<script setup>

defineProps({
    initialValue: {
        type: String
    }
})
</script>