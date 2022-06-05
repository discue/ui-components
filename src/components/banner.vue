<template>
    <Teleport :disabled="!parent" :to="parent" class="w-full relative">
        <div v-if="showBanner"
            class="absolute top-0 h-10 z-50 w-full bg-lime-300 flex items-center justify-center font-medium shadow">
            <slot />

            <div class="absolute right-4">
                <button type="button"
                    class="p-1 rounded-full hover:shadow cursor-pointer flex items-center justify-center text-gray-900 hover:text-lime-300 bg-inherit hover:bg-gray-900"
                    @click="closeBanner">
                    <svg class="w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <title>{{ closeButtonTitle }}</title>
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';

const emit = defineEmits(['open', 'close'])
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    parent: {
        type: String
    },
    closeButtonTitle: {
        type: String,
        default: 'Close'
    }
})

const forceCloseBanner = ref(false)

const showBanner = computed(() => {
    // hide banner if force close is true
    if (!props.show) {
        return false 
    }
    return !forceCloseBanner.value && props.show
})

const closeBanner = () => {
    forceCloseBanner.value = true
}

watchEffect(() => {
    if (showBanner.value) {
        emit('open')
    } else {
        emit('close')
    }
})

</script>