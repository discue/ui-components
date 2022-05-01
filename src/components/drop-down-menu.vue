<template>
    <Transition>
        <div v-if="isVisible" @mouseenter="onFocus" @mouseleave="onBlur"
            class="bg-gray-50 text-gray-900 bottom-0 absolute shadow-md font-normal rounded-md w-48 border-2 border-gray-200">
            <ul class="text-left text-lg">
                <slot />
            </ul>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

const hasFocus = ref(false)
const isVisible = computed(() => hasFocus.value || props.show)

function onFocus() {
    hasFocus.value = true
}

function onBlur() {
    hasFocus.value = false
}
</script>