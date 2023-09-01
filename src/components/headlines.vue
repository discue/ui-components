<template>
    <div class="dsq-headlines flex flex-col space-y-4 md:space-y-0 justify-between">
        <Component :is="headlineTag" v-if="showHeadline" :class="headlineClazz">
            <slot name="headline" />
        </component>
        <Component :is="sublineTag" v-if="showSubline" :class="sublineClazz">
            <slot name="subline" />
        </Component>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TEXT_COLOR_DEFAULT, getThemeProperty } from '../theme.js';

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

const headlineClazz = computed(() => {
    return `text-3xl font-medium inline-block ${getThemeProperty(TEXT_COLOR_DEFAULT).value}`
})

const sublineClazz = computed(() => {
    return getThemeProperty(TEXT_COLOR_DEFAULT).value
})
</script>