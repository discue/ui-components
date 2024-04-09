<template>
    <Transition name="dsq-back-to-top">
        <button v-if="show"
                :class="buttonClazz"
                @click="scrollToTop">
            <ChevronUpIcon class="w-12 h-12" />
        </button>
    </Transition>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/24/outline';
import { debounce } from 'ts-debounce';
import { computed, onMounted, ref } from 'vue';
import { BACK_TO_TOP_COLOR_DEFAULT, getThemeProperty } from '../theme.js';

const props = defineProps({
    offset: {
        type: Number,
        default: 300
    }
})

const buttonClazz = computed(() => {
    return `dsq-back-to-top bg-inherit -m-2 ${getThemeProperty(BACK_TO_TOP_COLOR_DEFAULT).value}`
})

const scrollTop = ref(0)
const show = computed(() => {
    const show = scrollTop.value > props.offset
    return show
})
const onScroll = debounce(() => {
    scrollTop.value = getScrollTop()
}, 100)

const getScrollTop = () => {
    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    )
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    scrollTop.value = getScrollTop()
    window.addEventListener('scroll', () => onScroll())
})
</script>