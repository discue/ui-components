<template>
    <FormElementContainerWithLabel :id="id"
                                   :description="description"
                                   :disabled="disabled"
                                   :focus-input-callback="focusSelect"
                                   :focussed="isFocussed"
                                   :force-show-error-message="forceShowErrorMessage"
                                   :input-invalid="isInvalid"
                                   :label="label"
                                   :show-format-hint="false"
                                   :show-pattern-hint="false">
        <select :id="id"
                ref="select"
                :class="selectClazz"
                :disabled="disabled"
                :value="inputValue"
                @blur="onBlur($event)"
                @focus="onFocus($event)"
                @focusin="onFocus($event)"
                @focusout="onBlur($event)"
                @input="onInput">
            <option v-for="(element, index) in elements"
                    :key="element.id"
                    :class="optionClazz"
                    :value="index">
                {{ element.name || element.alias }}
            </option>
        </select>
    </FormElementContainerWithLabel>
</template>

<script setup>
import { computed, ref } from 'vue';
import { FORM_ELEMENT_SELECT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_SELECT_TEXT_COLOR_DEFAULT, FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT, getThemeProperty } from '../theme.js';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    forceShowErrorMessage: {
        type: Boolean,
        default: false
    },
    elements: {
        type: Array,
        default: () => { return [] }
    },
    trackBy: {
        type: String,
        default: 'id'
    }
})

const modelValue = defineModel({
    type: [Number, String],
    default: null
})

const select = ref(null)
const isInvalid = ref(false)
const isFocussed = ref(false)

const inputValue = computed(() => {
    if (modelValue.value === undefined || modelValue.value === null) {
        return null
    }

    if (Number.isInteger(modelValue.value)) {
        return modelValue.value
    } else if (typeof modelValue.value === 'string') {
        return props.elements.findIndex(element => {
            return modelValue.value === element[props.trackBy]
        })
    }
    return null
})

const selectClazz = computed(() => {
    const clazz = [
        'dsq-form-input-select px-2 pb-1 pt-4 border-none w-full bg-inherit opacity-100 focus:outline-hidden cursor-pointer',
        getThemeProperty(FORM_ELEMENT_SELECT_TEXT_COLOR_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT).value,
        getThemeProperty(FORM_ELEMENT_SELECT_FONT_WEIGHT_DEFAULT).value
    ]

    return clazz.join(' ')
})

const optionClazz = computed(() => {
    const clazz = [
        'w-24',
        getThemeProperty(FORM_ELEMENT_SELECT_TEXT_SIZE_DEFAULT).value
    ]

    return clazz.join(' ')
})

function onFocus() {
    isFocussed.value = true
}
function onBlur() {
    isFocussed.value = false
}
function focusSelect(e) {
    select.value.dispatchEvent(e)
}
function onInput() {
    const value = select.value.value
    modelValue.value = parseInt(value)
}

</script>

<style>
select:disabled {
    opacity: 1 !important;
}
</style>