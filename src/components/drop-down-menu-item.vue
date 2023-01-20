<template>
    <li v-if="show" class="dsq-drop-down-menu-item hover:bg-gray-300 p-4 font-medium group z-10 cursor-pointer" @click.prevent="onClick">
        <div class="flex flex-row items-center">
            <div class="flex items-center text-gray-500 group-hover:text-gray-900">
                <slot />
            </div>
            <span>{{ label }}</span>
        </div>
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
        type: String
    },
    href: {
        type: String
    },
})

function onClick() {
    console.log('onclick')
    if (props.href) {
        router.push({ path: props.href })
    }
}
</script>