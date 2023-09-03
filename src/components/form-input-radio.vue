<template>
    <FormElementContainerWithLabel :id="id" :input-invalid="invalid" :disabled="inputDisabled" :label="label"
        :description="error" :focussed="isFocussed">
        <div :class="wrapperClazz">
            <div :class="optionClazz" v-for="option in options" :key="option.value">

                <input v-if="(disabled && modelValue == option.value) || !disabled"
                    :id="'radio_' + id + '_' + option.value + '_id'" autocomplete="off" type="radio"
                    :checked="option.default === true || modelValue == option.value" :required="required" :name="name"
                    :value="option.value" :disabled="disabled"
                    class="hidden peer checked:bg-gray-900 rounded outline-none text-gray-100 placeholder:text-gray-300 py-2 px-3 leading-8"
                    @input="onInput($event)">

                <label v-if="(disabled && modelValue == option.value) || !disabled" :class="labelClazz"
                    :for="'radio_' + id + '_' + option.value + '_id'" @focus="onFocus($event)" @focusin="onFocus($event)"
                    @focusout="onBlur($event)" @blur="onBlur($event)">
                    <div v-if="!isOnlySingleEntry">
                        <svg v-if="modelValue == option.value" xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else-if="disabled" xmlns="http://www.w3.org/2000/svg" class="stroke-1 stroke-current h-6 w-6"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8  01M21 12a9 9 0 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-1 stroke-current h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8  01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <Text class="pb-0.5" :highlight="modelValue == option.value" :inherit-font-size="true"
                        :inherit-color="true">{{ option.label }}</Text>
                </label>
            </div>
        </div>
    </FormElementContainerWithLabel>
</template>

<script setup>
import { computed, ref } from 'vue';
import { FORM_ELEMENT_RADIO_TEXT_COLOR_DEFAULT, FORM_ELEMENT_RADIO_TEXT_COLOR_DISABLED, FORM_ELEMENT_RADIO_TEXT_SIZE_DEFAULT, getThemeProperty } from '../theme.js';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';
import Text from './text.vue';

const props = defineProps({
    id: {
        type: String,
    },
    name: {
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
    description: {
        type: String,
    },
    required: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
    },
    options: {
        type: Array,
        default: () => []
    },
    vertical: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:modelValue'])

const isFocussed = ref(false)

const error = computed(() => {
    return props.invalidMessage ? props.invalidMessage : props.description
})

const isOnlySingleEntry = computed(() => {
    return props.options.length === 1
})

const inputDisabled = computed(() => {
    return inputDisabled.value || isOnlySingleEntry.value
})

const labelClazz = computed(() => {
    const clazz = ['flex flex-row items-center w-full space-x-2 px-3 py-1 leading-7', getThemeProperty(FORM_ELEMENT_RADIO_TEXT_SIZE_DEFAULT).value]
    if (inputDisabled.value) {
        clazz.push(`disabled cursor-not-allowed`)
        if (isOnlySingleEntry.value) {
            clazz.push(`${getThemeProperty(FORM_ELEMENT_RADIO_TEXT_COLOR_DEFAULT).value}`)
        } else {
            clazz.push(`${getThemeProperty(FORM_ELEMENT_RADIO_TEXT_COLOR_DISABLED).value}`)
        }
    } else {
        clazz.push(`${getThemeProperty(FORM_ELEMENT_RADIO_TEXT_COLOR_DEFAULT).value} cursor-pointer`)
    }
    return clazz.join(' ')
})

const wrapperClazz = computed(() => {
    const clazz = ['dsq-form-input-radio-wrapper pt-4 flex']
    if (props.vertical) {
        clazz.push('flex-row')
    } else {
        clazz.push('flex-col')
    }
    return clazz.join(' ')
})

const optionClazz = computed(() => {
    const clazz = ['dsq-form-input-radio-option text-gray-100 flex flex-row items-center']
    // if radio is disabled ensure that no option has a fixed width
    if (!inputDisabled.value) {
        if (props.vertical) {
            clazz.push('w-1/2')
        } else {
            clazz.push('w-full')
        }
    }
    return clazz.join(' ')
})

function onInput(event) {
    if (inputDisabled.value) {
        event.preventBubbling()
        return
    }
    const value = event.target.value
    emits('update:modelValue', value)
    onFocus() // labels cannot be focused so we need to augment focussing and bluring for error message handling to work
}

function onFocus() {
    isFocussed.value = true
    setTimeout(onBlur, 1000) // labels cannot be focused so we need to augment focussing and bluring for error message handling to work
}
function onBlur() {
    isFocussed.value = false
}

</script>