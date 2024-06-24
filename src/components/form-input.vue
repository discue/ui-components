<template>
    <FormElementContainerWithLabel :id="id"
                                   :description="error"
                                   :disabled="disabled"
                                   :focus-input-callback="focusInput"
                                   :focussed="inputFocussed"
                                   :force-show-error-message="forceContainerShowError"
                                   :format="format"
                                   :input-invalid="isInvalid"
                                   :label="label"
                                   :pattern="pattern"
                                   :show-format-hint="showFormatHint"
                                   :show-pattern-hint="showPatternHint"
                                   :value="modelValue">
        <input :id="id"
               ref="input"
               v-model="inputValue"
               autocomplete="off"
               :class="inputClazz"
               :disabled="disabled"
               :name="name"
               :pattern="pattern"
               :placeholder="placeholder"
               :required="required"
               :type="type"
               @blur="onBlur($event)"
               @focus="onFocus($event)"
               @focusin="onFocus($event)"
               @focusout="onBlur($event)">
    </FormElementContainerWithLabel>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { FORM_ELEMENT_INPUT_BACKGROUND_COLOR_DEFAULT, FORM_ELEMENT_INPUT_CARET_COLOR_DEFAULT, FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_INPUT_PLACEHOLDER_COLOR_DEFAULT, FORM_ELEMENT_INPUT_TEXT_COLOR_DEFAULT, FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT } from '../theme-keys.js';
import { getThemeProperty } from '../theme.js';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';

const props = defineProps({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
    },
    modelValue: {
        type: String,
    },
    label: {
        type: String,
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
    pattern: {
        type: String,
        default: '.*'
    },
    patternUnicode: {
        type: Boolean,
        default: false,
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
    allowedCharactersSupersetPattern: {
        type: String,
    },
})
const emits = defineEmits(['update:modelValue'])

const input = ref(null)
const inputFocussed = ref(false)
const inputInvalid = ref(false)
const forceContainerShowErrorNow = ref(false)
const invalidCharacters = ref('')
const inputValue = ref()

const inputRegEx = computed(() => {
    return new RegExp(props.pattern, 'u')
})

watchEffect(() => {
    inputValue.value = props.modelValue
})

watch(inputValue, (newValue) => {
    if (props.disabled) {
        return
    }
    if (props.pattern) {
        const matches = inputRegEx.value.test(newValue)

        if (!matches) {
            inputInvalid.value = true
            if (findInvalidCharactersRegEx.value) {
                const invalidChars = newValue.match(findInvalidCharactersRegEx.value, 'gu')
                const uniqueInvalidChars = [...new Set(invalidChars)]
                if (uniqueInvalidChars.length) {
                    forceContainerShowErrorNow.value = true
                }
                invalidCharacters.value = uniqueInvalidChars.join(', ')
            }
        } else {
            invalidCharacters.value = ''
            inputInvalid.value = false
            forceContainerShowErrorNow.value = false
        }
    }
    if (inputInvalid.value === false) {
        emits('update:modelValue', newValue)
    }
})

const error = computed(() => {
    return props.invalidMessage || invalidCharactersMessage.value || props.description
})
const isInvalid = computed(() => {
    return inputInvalid.value || props.invalid
})
const forceContainerShowError = computed(() => {
    return props.invalid || forceContainerShowErrorNow.value
})
const invalidCharactersMessage = computed(() => {
    if (!invalidCharacters.value) {
        return ''
    } else {
        return `Sorry, the following characters are not allowed here: ${invalidCharacters.value}`
    }
})
const findInvalidCharactersRegEx = computed(() => {
    if (props.allowedCharactersSupersetPattern) {
        return new RegExp(`[^(${props.allowedCharactersSupersetPattern})]`, 'gu')
    } else {
        return null
    }
})
const inputClazz = computed(() => {
    const clazz = [
        'dsq-form-input w-full mt-4 outline-none px-3 leading-8 placeholder:italic',
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