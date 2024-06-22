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
    },
    class: {
        type: String
    }
})

const clazz = computed(() => {
    return `flex flex-col space-y-4 ${props.class}`
})

</script>