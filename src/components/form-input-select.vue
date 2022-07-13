<template>
    <FormElementContainerWithLabel :id="id" :input-invalid="isInvalid" :force-show-error-message="forceShowErrorMessage"
        :label="label" :focussed="inputFocussed" :focus-input-callback="focusSelect" :show-pattern-hint="false"
        :show-format-hint="false" :description="description">

        <select class="px-2 pb-1 pt-4 border-none w-full text-lg bg-inherit focus:outline-none" :value="inputValue"
            @input="onInput" @focus="onFocus" @blur="onBlur" ref="select">
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
    description: {
        type: String
    },
    forceShowErrorMessage: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
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
    const selectIndex = props.elements.findIndex(element => {
        return props.modelValue === element[props.trackBy]
    })
    return selectIndex
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
    emits('update:modelValue', props.elements[parseInt(value)])
}

</script>