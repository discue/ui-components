<template>
    <Teleport class="w-full relative"
              :disabled="!parent"
              :to="parent">
        <div v-if="showBanner"
             class="dsq-banner"
             :class="clazz">
            <slot />

            <div class="absolute right-4">
                <button class="p-1 rounded-full hover:shadow cursor-pointer flex items-center justify-center text-gray-900 hover:text-lime-300 bg-inherit hover:bg-gray-900"
                        type="button"
                        @click="closeBanner">
                    <svg class="w-6 h-6"
                         fill="none"
                         stroke="currentColor"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         viewBox="0 0 24 24">
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
    bottom: {
        type: Boolean,
        default: false
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

const clazz = computed(() => {
    let clazz = 'pl-3 py-3 pr-12 w-full bg-lime-300 flex items-center justify-center font-medium shadow' + ' '
    if (props.bottom) {
        clazz += 'bottom-0 '
    } else {
        clazz += 'top-0 '
    }
    if (props.parent) {
        clazz += 'fixed z-50'
    } else {
        clazz += 'absolute z-10'
    }

    return clazz
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