<template>
    <div class="dsq-headlines flex flex-col space-y-4 md:space-y-0 justify-between">
        <Headline v-if="showHeadline && $slots.headline"
                  :level="1">
            <slot name="headline" />
        </Headline>
        <Headline v-if="showSubline && $slots.subline"
                  :level="2">
            <slot name="subline" />
        </Headline>
        <Headline v-if="showSubSubline && $slots.subsubline"
                  :level="3">
            <slot name="subsubline" />
        </Headline>
        <slot name="text" />
    </div>
</template>

<script setup lang="ts">
import Headline from './headline.vue';

defineProps({
    showHeadline: {
        type: Boolean,
        default: true,
    },
    showSubline: {
        type: Boolean,
        default: true,
    },
    showSubSubline: {
        type: Boolean,
        default: true,
    },
})
</script>