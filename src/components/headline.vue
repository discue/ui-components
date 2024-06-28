<template>
    <div class="dsq-headline">
        <Component :is="tag"
                   :class="clazz">
            <slot />
        </component>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TEXT_COLOR_DEFAULT, getThemeProperty } from '../theme.js';

const props = defineProps({
    level: {
        type: Number,
        default: 1,
        validator: (value) => value > 0 && value < 4
    }
})

const tag = computed(() => {
    return `h${props.level}`
})

const clazz = computed(() => {
    switch (props.level) {
        case 1:
            return h1()
        case 2:
            return h2()
        case 3:
            return h3()
        default:
            throw new Error(`There was not specification for a headline with level ${props.level}`, JSON.stringify(props))
    }
})

const h1 = () => {
    return `text-3xl tracking-tight leading-snug font-bold ${getThemeProperty(TEXT_COLOR_DEFAULT).value}`
}

const h2 = () => {
    return `text-2xl leading-relaxed font-medium ${getThemeProperty(TEXT_COLOR_DEFAULT).value}`
}

const h3 = () => {
    return `text-xl leading-relaxed font-medium ${getThemeProperty(TEXT_COLOR_DEFAULT).value}`
}

</script>