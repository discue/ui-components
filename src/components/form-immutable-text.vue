<template>
    <FormElementContainerWithLabel :id="id"
                                   :description="copyToClipboardErrorMsg"
                                   :disabled="true"
                                   :focus-input-callback="focusInput"
                                   :focussed="false"
                                   :force-show-error-message="true"
                                   :input-invalid="copyToClipboardFailure"
                                   :label="label"
                                   :show-format-hint="false"
                                   :show-pattern-hint="false"
                                   :value="modelValue">
        <div class="relative pl-3 mt-4 mb-1 flex flex-row items-center">
            <div class="mr-8"
                 :class="textClazz">
                <Text :id="id"
                      :inherit-font-size="true">
                    {{ text }}
                </Text>
            </div>

            <button v-if="showClipboardButton"
                    class="absolute bg-transparent right-0 pl-2 py-2 pr-3 text-gray-700 cursor-pointer transform transition-transform hover:-translate-y-1 outline-none"
                    @click.prevent="copyKeyToClipboard">
                <ClipboardIcon class="h-6 w-6 stroke-2" />
            </button>
            <button v-if="copyToClipboardSuccess"
                    class="absolute bg-transparent right-0 p-2 text-green-700 outline-none"
                    click.prevent>
                <ClipboardDocumentCheckIcon class="h-6 w-6" />
            </button>
            <button v-if="copyToClipboardFailure"
                    class="absolute bg-transparent right-0 p-2 text-attention outline-none"
                    click.prevent>
                <svg class="h-6 w-6"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 10.5l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </FormElementContainerWithLabel>
</template>

<script setup>
import { ClipboardDocumentCheckIcon, ClipboardIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'
import { FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT, FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT, getThemeProperty } from '../theme.js'
import FormElementContainerWithLabel from './form-element-container-with-label.vue'
import Text from './text.vue'

const props = defineProps({
    enableCopyToClipboard: {
        type: Boolean,
        default: true
    },
    id: {
        type: String
    },
    label: {
        type: String,
    },
    text: {
        type: String
    }
})

const copyToClipboardSuccess = ref(false)
const copyToClipboardFailure = ref(false)
const copyToClipboardErrorMsg = ref()

const textClazz = computed(() => {
    return [getThemeProperty(FORM_ELEMENT_INPUT_TEXT_SIZE_DEFAULT).value, getThemeProperty(FORM_ELEMENT_INPUT_FONT_WEIGHT_DEFAULT).value]
})

const showClipboardButton = computed(() => {
    return props.text && // do we have a text?
        props.enableCopyToClipboard && // does our parent want us to allow copying?
        typeof window.ClipboardItem === 'function' && // does the browser allow us to copy?
        !copyToClipboardSuccess.value && // have we already finished ...
        !copyToClipboardFailure.value // ... or failed copying?
})

async function copyKeyToClipboard() {
    // @ts-ignore
    try {
        await navigator.clipboard.writeText(props.text)
        copyToClipboardSuccess.value = true
        copyToClipboardFailure.value = false
    } catch (_e) {
        copyToClipboardSuccess.value = false
        copyToClipboardFailure.value = true
        copyToClipboardErrorMsg.value = 'Sorry, we were not able to copy to the clipboard at this time. Please copy the text manually.'
    }
}

</script>