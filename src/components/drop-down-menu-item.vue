<template>
    <li v-if="show"
        class="dsq-drop-down-menu-item flex flex-row items-center hover:bg-gray-300 p-4 font-medium group z-10 cursor-pointer"
        @click.prevent="onClick">
        <div class="flex items-center text-gray-500 group-hover:text-gray-900">
            <slot />
        </div>
        <span>{{ label }}</span>
    </li>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    label: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
})

function onClick() {
    if (props.href) {
        router.push({ path: props.href })
    }
}
</script>