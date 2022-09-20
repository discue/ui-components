<template>
    <li v-if="show" class="dsq-drop-down-menu-banner-item p-3 rounded-t-md border-b border-gray-400 cursor-default" @click.prevent>
        <div class="flex flex-col">
            <slot name="default"/>
        </div>
    </li>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        default: true
    }
})
</script>