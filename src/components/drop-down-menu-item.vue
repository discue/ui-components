<template>
    <li class="hover:bg-gray-300 p-4 font-medium group z-10 cursor-pointer">
        <div class="flex flex-row items-center" @click.prevent="onClick">
            <div class="text-gray-500 group-hover:text-gray-900">
                <slot />
            </div>
            <span>{{ label }}</span>
        </div>
    </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    label: {
        type: String
    },
    href: {
        type: String
    }
})

function onClick() {
    router.push({ path: props.href })
}
</script>