<template>
    <FormElementContainerWithLabel :id="id"
                                   :description="error"
                                   :disabled="disabled"
                                   :focus-input-callback="focusInput"
                                   :focussed="inputFocussed"
                                   :force-show-error-message="forceContainerShowError"
                                   :input-invalid="isInvalid"
                                   :label="label"
                                   :show-format-hint="false"
                                   :show-pattern-hint="false"
                                   :value="modelValue">
        <textarea :id="id"
                  ref="textarea"
                  v-model="inputValue"
                  autocomplete="off"
                  :class="inputClazz"
                  :disabled="disabled"
                  :name="name"
                  :placeholder="placeholder"
                  :required="required"
                  :type="type"
                  @blur="onBlur($event)"
                  @focus="onFocus($event)"
                  @focusin="onFocus($event)"
                  @focusout="onBlur($event)"></textarea>
    </FormElementContainerWithLabel>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { FORM_ELEMENT_INPUT_BACKGROUND_COLOR_DEFAULT, FORM_ELEMENT_INPUT_CARET_COLOR_DEFAULT, FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_INPUT_PLACEHOLDER_COLOR_DEFAULT, FORM_ELEMENT_INPUT_TEXT_COLOR_DEFAULT, FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT } from '../theme-keys.js';
import { getThemeProperty } from '../theme.js';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: String,
    },
    label: {
        type: String,
        required: true
    },
    invalidMessage: {
        type: String,
    },
    invalid: {
        type: Boolean,
    },
    placeholder: {
        type: String,
    },
    description: {
        type: String,
    },
    required: {
        type: Boolean,
        default: true,
    },
})
const emits = defineEmits(['update:modelValue'])

const textarea = ref(null)

const inputFocussed = ref(false)
const inputInvalid = ref(false)
const forceContainerShowErrorNow = ref(false)
const inputValue = ref()

watchEffect(() => {
    inputValue.value = props.modelValue
})

const error = computed(() => {
    return props.invalidMessage || props.description
})
const isInvalid = computed(() => {
    return inputInvalid.value || props.invalid
})
const forceContainerShowError = computed(() => {
    return props.invalid || forceContainerShowErrorNow.value
})

const inputClazz = computed(() => {
    const clazz = [
        'dsq-form-input-text-area min-h-10 w-full outline-hidden px-3 leading-8 placeholder:italic',
        getThemeProperty(FORM_ELEMENT_INPUT_CARET_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_INPUT_BACKGROUND_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_INPUT_PLACEHOLDER_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_INPUT_TEXT_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT).value,
    ]
    if (props.disabled) {
        clazz.push('cursor-not-allowed')
    } else {
        clazz.push('cursor-text')
    }
    return clazz.join(' ')
})
function focusInput() {
    input.value.focus()
}
function onBlur() {
    inputFocussed.value = false
}
function onFocus() {
    inputFocussed.value = true
}
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
    -webkit-appearance: none;
    -moz-appearance: textfield !important;
    margin: 0;
}

textarea {
    field-sizing: content;
}
</style>

<style scoped>
.dsq-form-element-container-with-label div:has(textarea.dsq-form-input-text-area) {
    padding-bottom: 0 !important;
}
</style>