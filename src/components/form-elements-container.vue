<template>
    <div :id="id">
        <div :class="clazz">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
})

const clazz = computed(() => {
    return `flex flex-col space-y-5 ${props.class}`
})

</script>