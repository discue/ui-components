<template>
    <Transition name="modal">
        <div ref="menu" v-if="show"
            class="dsq-drop-down-menu bg-gray-50 text-gray-900 fixed shadow-md font-normal rounded-md w-48 border-2 border-gray-200 duration-200 ease-in-out transition">
            <ul class="text-left text-lg">
                <slot />
            </ul>
        </div>
    </Transition>
</template>

<script setup allow-js>
import { ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    }
})

const menu = ref()

watch([props, menu], ([{ show }, menuElement]) => {
    if (show && menuElement) {
        calculateDropdownPosition()
    }
})

function calculateDropdownPosition() {
    const parentElement = menu.value.parentElement
    const parentBox = parentElement.getBoundingClientRect()
    const { top } = parentBox

    if (isInViewport(parentBox)) {
        const menuElement = menu.value
        let menuBox = menuElement.getBoundingClientRect()
        menuElement.style.top = `${top}px`

        // limit loop to 20 tries to prevent infinite loops
        for (let i = 1; isInViewport(menuBox) === false && i < 20; i++) {
            menuElement.style.top = `${top - 20 * i}px`
            menuBox = menuElement.getBoundingClientRect()
        }
    }
}

function isInViewport(rect) {
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
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