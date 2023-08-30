<template>
    <FormElementContainerWithLabel :description="copyToClipboardErrorMsg" :disabled="true" :focussed="false"
        :focus-input-callback="focusInput" :force-show-error-message="true" :id="id" :input-invalid="copyToClipboardFailure"
        :label="label" :show-pattern-hint="false" :show-format-hint="false" :value="modelValue">

        <div class="relative px-3 my-2 flex flex-row items-center">
            <div class="mr-8">
                <span :id="id" class="text-gray-900 rounded text-lg outline-none placeholder:text-gray-400 leading-8">{{
                    text }}</span>
            </div>

            <button v-if="showClipboardButton"
                class="absolute bg-transparent right-0 p-2 text-gray-700 cursor-pointer transform transition-transform hover:-translate-y-1 outline-none"
                @click.prevent="copyKeyToClipboard">
                <ClipboardIcon class="h-6 w-6 stroke-2" />
            </button>
            <button click.prevent v-if="copyToClipboardSuccess" class="absolute bg-transparent right-0 p-2 text-green-700 outline-none">
                <ClipboardDocumentCheckIcon class="h-6 w-6" />
            </button>
            <button click.prevent v-if="copyToClipboardFailure" class="absolute bg-transparent right-0 p-2 text-attention outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 10.5l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0" />
                </svg>
            </button>
        </div>
    </FormElementContainerWithLabel>
</template>
  
<script setup>
import { ClipboardDocumentCheckIcon, ClipboardIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import FormElementContainerWithLabel from './form-element-container-with-label.vue';


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
    } catch (e) {
        copyToClipboardSuccess.value = false
        copyToClipboardFailure.value = true
        copyToClipboardErrorMsg.value = 'Sorry, we were not able to copy to the clipboard at this time. Please copy the text manually.'
    }
}

</script>