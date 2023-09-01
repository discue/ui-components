<template>
    <Transition name="back-to-top">
        <button v-if="show" @click="scrollToTop" class="dsq-back-to-top back-to-top">
            <ChevronUpIcon/>
        </button>
    </Transition>
</template>

<script setup>
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import { debounce } from "ts-debounce";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
    offset: {
        type: Number,
        default: 300
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
    scrollTop.value = getScrollTop()
    window.addEventListener("scroll", () => onScroll())
})
</script>

<style>
.back-to-top {
    cursor: pointer;
    position: fixed;
    bottom: 2rem;
    right: 2.5rem;
    width: 2rem;
    height: 1.2rem;
    color: #111827;
    z-index: 10;
}

@media (max-width: 959px) {
    .back-to-top {
        display: none;
    }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
    transition: opacity 0.3s;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
    opacity: 0;
}
</style>