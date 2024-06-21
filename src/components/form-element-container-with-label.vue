<template>
    <div :id="parentId"
         :class="parentClazz"
         @mouseover="onFocus"
         @focusin="onFocus"
         @mouseleave="onBlur"
         @focusout="onBlur">
        <div class="relative bg-inherit">
            <label :for="id"
                   :class="labelClazz"
                   @mousedown="onFocusRequest">{{ label }}</label>
            <Transition name="form-element-hint">
                <span v-if="showPattern"
                      :class="hintClazz"
                      @mousedown="onFocusRequest">Allowed values: {{ pattern
                    }}</span>
            </Transition>
            <Transition name="form-element-hint">
                <span v-if="showFormat"
                      :class="hintClazz"
                      @mousedown="onFocusRequest">Allowed format: {{ format
                    }}</span>
            </Transition>
        </div>
        <div :class="[isInvalid ? '' : 'pb-1']">
            <slot />
        </div>
        <FormError :id="errorId"
                   class="px-3 pb-1"
                   :description="description"
                   :invalid="isInvalid && hasLostFocusAtLeastOnce" />
    </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { FORM_ELEMENT_BORDER_COLOR_ACTIVE, FORM_ELEMENT_BORDER_COLOR_ATTENTION, FORM_ELEMENT_BORDER_COLOR_DEFAULT, FORM_ELEMENT_BORDER_RING_COLOR_DEFAULT, FORM_ELEMENT_BORDER_RING_SIZE_DEFAULT, FORM_ELEMENT_BORDER_SIZE_DEFAULT, FORM_ELEMENT_HINT_COLOR_DEFAULT, FORM_ELEMENT_HINT_SIZE_DEFAULT, FORM_ELEMENT_HINT_WEIGHT_DEFAULT, FORM_ELEMENT_LABEL_BACKGROUND_DEFAULT, FORM_ELEMENT_LABEL_COLOR_ATTENTION, FORM_ELEMENT_LABEL_COLOR_DEFAULT, FORM_ELEMENT_LABEL_SIZE_DEFAULT, FORM_ELEMENT_LABEL_WEIGHT_DEFAULT, getThemeProperty } from '../theme.js';
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
    disabled: {
        type: Boolean,
        default: false
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
const wasFocussedAtLeastOnce = ref(false)

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
    return props.pattern && props.showPatternHint && props.focussed
})
const showFormat = computed(() => {
    return props.format && props.showFormatHint && props.focussed
})
const labelOrChildHaveFocus = computed(() => {
    return hasFocus.value || props.focussed
})
const parentClazz = computed(() => {
    const clazz = ['dsq-form-element-container-with-label border-solid bg-inherit flex flex-col rounded']
    clazz.push([getThemeProperty(FORM_ELEMENT_BORDER_SIZE_DEFAULT).value])
    if (props.disabled) {
        clazz.push('cursor-not-allowed')
    } else {
        clazz.push('cursor-text')
    }

    if (labelOrChildHaveFocus.value) {
        clazz.push(getThemeProperty(FORM_ELEMENT_BORDER_COLOR_ACTIVE).value)
        clazz.push(getThemeProperty(FORM_ELEMENT_BORDER_RING_SIZE_DEFAULT).value, getThemeProperty(FORM_ELEMENT_BORDER_RING_COLOR_DEFAULT).value)
    } else {
        if (isInvalid.value) {
            clazz.push(getThemeProperty(FORM_ELEMENT_BORDER_COLOR_ATTENTION).value)
        } else {
            clazz.push(getThemeProperty(FORM_ELEMENT_BORDER_COLOR_DEFAULT).value)
        }
    }

    return clazz.join(' ')
})
const labelClazz = computed(() => {
    const clazz = [
        '-left-3 -top-3.5 py-1 px-2 absolute leading-7',
        getThemeProperty(FORM_ELEMENT_LABEL_SIZE_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_LABEL_BACKGROUND_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_LABEL_WEIGHT_DEFAULT).value
    ]

    if (props.disabled) {
        clazz.push('cursor-not-allowed')
    } else {
        clazz.push('cursor-text')
    }

    if (isInvalid.value && !labelOrChildHaveFocus.value) {
        clazz.push(getThemeProperty(FORM_ELEMENT_LABEL_COLOR_ATTENTION).value)
    } else {
        clazz.push(getThemeProperty(FORM_ELEMENT_LABEL_COLOR_DEFAULT).value)
    }

    return clazz.join(' ')
})
const hintClazz = computed(() => {
    const clazz = [
        'absolute -top-2 p-1.5 right-0 leading-7 italic ml-auto transition-opacity duration-200 ease-in',
        getThemeProperty(FORM_ELEMENT_HINT_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_HINT_SIZE_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_HINT_WEIGHT_DEFAULT).value,
    ]

    return clazz.join(' ')
})
const stopFocusListener = watchEffect(() => {
    if (hasFocus.value) {
        wasFocussedAtLeastOnce.value = true
    } else if (wasFocussedAtLeastOnce.value && props.focussed === false) {
        hasLostFocusAtLeastOnce.value = true
        stopFocusListener()
    }
})
function onFocus() {
    hasFocus.value = true
}
function onBlur() {
    hasFocus.value = false
}
function onFocusRequest(e) {
    if (props.focusInputCallback) {
        setTimeout(() => {
            props.focusInputCallback(e)
        })
    }
}
</script>

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