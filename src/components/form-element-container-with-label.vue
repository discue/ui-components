<template>
    <div :id="parentId" :class="parentClazz" @mouseover="onFocus" @mouseleave="onBlur"
        class="dsq-form-element-container-with-label border-solid cursor-text flex flex-col rounded">
        <div class="relative">
            <label :for="id" :class="labelClazz" @mousedown="onFocusRequest">{{ label }}</label>
            <Transition name="form-element-hint">
                <span v-if="showPattern" :class="hintClazz" @mousedown="onFocusRequest">Allowed values: {{ pattern
}}</span>
            </Transition>
            <Transition name="form-element-hint">
                <span v-if="showFormat" :class="hintClazz" @mousedown="onFocusRequest">Allowed format: {{ format
}}</span>
            </Transition>
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
import { FORMELEMENTHINTANDPATTERN_COLOR_DEFAULT, FORMELEMENTHINTANDPATTERN_SIZE_DEFAULT, FORMELEMENTHINTANDPATTERN_WEIGHT_DEFAULT, FORMELEMENTLABEL_BACKGROUND_DEFAULT, FORMELEMENTLABEL_COLOR_ATTENTION, FORMELEMENTLABEL_COLOR_DEFAULT, FORMELEMENTLABEL_SIZE_DEFAULT, FORMELEMENTLABEL_WEIGHT_DEFAULT, FORMELEMENT_BORDERCOLOR_ACTIVE, FORMELEMENT_BORDERCOLOR_ATTENTION, FORMELEMENT_BORDERCOLOR_DEFAULT, FORMELEMENT_BORDERRINGCOLOR_DEFAULT, FORMELEMENT_BORDERRINGSIZE_DEFAULT, FORMELEMENT_BORDERSIZE_DEFAULT, getThemeProperty } from '../theme.js';
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
    return props.pattern && props.showPatternHint && props.focussed
})
const showFormat = computed(() => {
    return props.format && props.showFormatHint && props.focussed
})
const parentClazz = computed(() => {
    const clazz = [getThemeProperty(FORMELEMENT_BORDERSIZE_DEFAULT).value]
    if (props.focussed) {
        clazz.push(getThemeProperty(FORMELEMENT_BORDERCOLOR_ACTIVE).value)
        clazz.push(getThemeProperty(FORMELEMENT_BORDERRINGSIZE_DEFAULT).value, getThemeProperty(FORMELEMENT_BORDERRINGCOLOR_DEFAULT).value)
    } else if (isInvalid.value) {
        clazz.push(getThemeProperty(FORMELEMENT_BORDERCOLOR_ATTENTION).value)
    } else {
        clazz.push(getThemeProperty(FORMELEMENT_BORDERCOLOR_DEFAULT).value)
    }
    return clazz.join(' ')
})
const labelClazz = computed(() => {
    const clazz = [
        'cursor-text -left-3 -top-3.5 py-1 px-2 absolute leading-7',
        getThemeProperty(FORMELEMENTLABEL_SIZE_DEFAULT).value,
        getThemeProperty(FORMELEMENTLABEL_BACKGROUND_DEFAULT).value,
        getThemeProperty(FORMELEMENTLABEL_WEIGHT_DEFAULT).value
    ]

    if (isInvalid.value) {
        clazz.push(getThemeProperty(FORMELEMENTLABEL_COLOR_ATTENTION).value)
    } else {
        clazz.push(getThemeProperty(FORMELEMENTLABEL_COLOR_DEFAULT).value)
    }

    return clazz.join(' ')
})
const hintClazz = computed(() => {
    const clazz = [
        'absolute cursor-text -top-2 p-1.5 right-0 leading-7 italic ml-auto transition-opacity duration-200 ease-in',
        getThemeProperty(FORMELEMENTHINTANDPATTERN_COLOR_DEFAULT).value,
        getThemeProperty(FORMELEMENTHINTANDPATTERN_SIZE_DEFAULT).value,
        getThemeProperty(FORMELEMENTHINTANDPATTERN_WEIGHT_DEFAULT).value,
 
    ]

    return clazz.join(' ')
})
watchEffect(() => {
    if (hasFocus.value === false && props.focussed === true) {
        hasLostFocusAtLeastOnce.value = true
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