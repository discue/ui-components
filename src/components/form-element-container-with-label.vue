<template>
    <div :id="parentId" :class="[isInvalid ? 'border-2 border-attention-800' : 'border-2 border-gray-800 ']"
        class="border-solid cursor-text flex flex-col rounded transition-colors ease-in-out duration-500">
        <div class="relative">
            <label :for="id" :class="[isInvalid ? 'text-attention-800' : 'text-gray-800 ']"
                class="cursor-text -left-3 -top-3.5 bg-white py-1 px-2 absolute leading-7 text-md text-gray-900 font-bold  transition-colors ease-in-out duration-500"
                @mousedown="onFocusRequest">{{ label }}</label>
            <Transition name="form-element-hint">
                <span v-if="showPattern" class="
                    absolute
                    cursor-text
                    -top-2
                    p-1.5
                    right-0
                    leading-7
                    text-gray-400 text-xs
                    font-medium
                    italic
                    ml-auto
                    transition-opacity
                    duration-200
                    ease-in
                " @mousedown="onFocusRequest">Allowed values: {{ pattern }}</span>
            </Transition>
            <span v-if="showFormat" class="
                    absolute
                    cursor-text
                    -top-2
                    p-1.5
                    right-0
                    leading-7
                    text-gray-400 text-xs
                    font-medium
                    italic
                    ml-auto
                    transition-opacity
                    duration-200
                    ease-in
                " @mousedown="onFocusRequest">Allowed format: {{ format }}</span>
        </div>
        <div :class="[isInvalid ? '' : 'pb-1']">
            <slot />
        </div>
        <FormError :id="errorId" class="px-3 pb-1" :description="description" :invalid="isInvalid" />
    </div>
</template>

<style>
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 *
 * https://vuejs.org/examples/#modal
 */

.form-element-hint-enter-from {
    opacity: 0;
}

.form-element-hint-leave-to {
    opacity: 0;
}

.form-element-hint-enter-from .form-element-hint-container,
.form-element-hint-leave-to .form-element-hint-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import FormError from './form-element-error-message.vue';

const props = defineProps({
    id: {
        type: String,
    },
    description: {
        type: String,
    },
    label: {
        type: String,
    },
    focussed: {
        type: Boolean,
    },
    focusInputCallback: {
        type: Function,
    },
    forceShowErrorMessage: {
        type: Boolean,
    },
    pattern: {
        type: String,
    },
    showPatternHint: {
        type: Boolean,
        default: true,
    },
    format: {
        type: String,
    },
    showFormatHint: {
        type: Boolean,
        default: false,
    },
    inputInvalid: {
        type: Boolean,
    },
})

const hasFocus = ref(false)
const hasLostFocusAtLeastOnce = ref(false)

const isInvalid = computed(() => {
    return (props.forceShowErrorMessage && props.inputInvalid) || (hasLostFocusAtLeastOnce.value && props.inputInvalid)
})
const parentId = computed(() => {
    return `${props.id}ElementContainer`
})
const errorId = computed(() => {
    return `${props.id}ElementError`
})
const showPattern = computed(() => {
    return props.pattern && props.showPatternHint && hasFocus
})
const showFormat = computed(() => {
    return props.format && props.showFormatHint && hasFocus
})
watchEffect(() => {
    if (hasFocus.value === false && props.focussed === true) {
        hasLostFocusAtLeastOnce.value = true
    }
    hasFocus.value = props.focussed
})
function onFocusRequest(e) {
    if (props.focusInputCallback) {
        setTimeout(() => {
            props.focusInputCallback(e)
        })
    }
}
</script>