<template>
    <FormElementContainerWithLabel :id="id" :input-invalid="isInvalid" :disabled="disabled"
        :force-show-error-message="forceShowErrorMessage" :label="label" :focussed="isFocussed"
        :focus-input-callback="focusSelect" :show-pattern-hint="false" :show-format-hint="false" :description="description">

        <select
            class="dsq-form-input-select px-2 pb-1 pt-4 border-none w-full text-lg bg-inherit opacity-100 focus:outline-none cursor-not-allowed text-gray-900"
            :value="inputValue" :disabled="disabled" @input="onInput" @focus="onFocus($event)" @focusin="onFocus($event)"
            @focusout="onBlur($event)" @blur="onBlur($event)" ref="select">
            <option class="w-24 text-lg" v-for="(element, index) in elements" :key="element.id" :value="index">
                {{ element.name }}
            </option>
        </select>

    </FormElementContainerWithLabel>
</template>

<script setup>
import { computed, ref } from 'vue';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';

const props = defineProps({
    id: {
        type: String
    },
    label: {
        type: String
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
    modelValue: {
        type: Number,
    },
    elements: {
        type: Array
    },
    trackBy: {
        type: String,
        default: 'id'
    }
})

const emits = defineEmits(['update:modelValue'])

const select = ref(null)
const isInvalid = ref(false)
const isFocussed = ref(false)

const inputValue = computed(() => {
    if (props.modelValue === undefined || props.modelValue === null) {
        return null
    }

    if (Number.isInteger(props.modelValue)) {
        return props.modelValue
    } else if (typeof props.modelValue === 'string') {
        return props.elements.findIndex(element => {
            return props.modelValue === element[props.trackBy]
        })
    }
    return null
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
    emits('update:modelValue', parseInt(value))
}

</script>

<style>
select:disabled {
    opacity: 1 !important;
}
</style>