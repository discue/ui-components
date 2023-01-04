<template>
    <FormElementContainerWithLabel :id="id" :input-invalid="isInvalid"
        :force-show-error-message="forceContainerShowError" :label="label" :focussed="inputFocussed"
        :focus-input-callback="focusInput" :value="modelValue" :pattern="pattern" :show-pattern-hint="showPatternHint"
        :format="format" :show-format-hint="showFormatHint" :description="error">
        <input :id="id" ref="input" autocomplete="off" :type="type" :pattern="pattern" :required="required"
            :placeholder="placeholder" :name="name" :value="modelValue"
            class="w-full mt-4 text-lg outline-none text-gray-900 placeholder:text-gray-500 px-3 leading-8"
            @input="onInput($event)" @focus="onFocus($event)" @focusin="onFocus($event)" @focusout="onBlur($event)" @blur="onBlur($event)">
    </FormElementContainerWithLabel>
</template>
  
<script setup>
import { computed, ref } from 'vue';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';

const props = defineProps({
    id: {
        type: String,
    },
    name: {
        type: String,
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
        return `At this moment we do not allow the following characters: ${invalidCharacters.value}`
    }
})
const invalidCharactersRegex = computed(() => {
    if (props.allowedCharactersSupersetPattern) {
        return `[^(${props.allowedCharactersSupersetPattern})]`
    } else {
        return null
    }
})

function focusInput() {
    input.value.focus()
}
function onBlur(event) {
    onInput(event)
    inputFocussed.value = false
}
function onFocus() {
    inputFocussed.value = true
}
function onInput({ target }) {
    if (target.pattern) {
        const value = target.value
        const matches = new RegExp(target.pattern, 'u').test(value)
        if (!matches) {
            inputInvalid.value = true
            if (invalidCharactersRegex.value) {
                const invalidChars = value.match(new RegExp(invalidCharactersRegex.value, 'gu'))
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
    emits('update:modelValue', target.value)
}
</script>