<template>
    <Transition name="modal">
        <div v-if="isVisible" @mouseenter="onFocus" @mouseleave="onBlur"
            class="dsq-drop-down-menu bg-gray-50 text-gray-900 fixed shadow-md font-normal rounded-md w-48 border-2 border-gray-200 duration-200 ease-in-out transition">
            <ul class="text-left text-lg">
                <slot />
            </ul>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    }
})

const hasFocus = ref(false)
const isVisible = computed(() => hasFocus.value || props.show)

function onFocus() {
    hasFocus.value = true
}

function onBlur() {
    hasFocus.value = false
}
</script>

<style scoped>
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

 .modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>