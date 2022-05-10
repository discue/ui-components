<template>
    <div class="flex flex-col space-y-4 md:space-y-0 justify-between">
        <Component :is="headlineTag" v-if="showHeadline" class="text-3xl font-medium inline-block">
            <slot name="headline" />
        </component>
        <Component :is="sublineTag" v-if="showSubline" class="text-gray-600">
            <slot name="subline" />
        </Component>
    </div>
</template>

<script setup lang="ts">
defineProps({
    showHeadline: {
        type: Boolean,
        default: true,
    },
    showSubline: {
        type: Boolean,
        default: true,
    },
    headlineTag: {
        type: String,
        default: 'h1'
    },
    sublineTag: {
        type: String,
        default: 'h2',
    }
})
</script>