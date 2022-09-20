<template>
    <Transition name="back-to-top">
        <button v-if="show" @click="scrollToTop" class="dsq-back-to-top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.484 28.284">
                <g transform="translate(-229 -126.358)" fill="currentColor">
                    <rect width="35" height="5" rx="2" transform="rotate(-45 296.902 -200.874)" />
                    <rect width="35" height="5" rx="2" transform="rotate(-135 169.502 20.377)" />
                </g>
            </svg>
        </button>
    </Transition>
</template>

<script setup>
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
.dsq-back-to-top {
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
    .dsq-back-to-top {
        display: none;
    }
}

.dsq-back-to-top-enter-active,
.dsq-back-to-top-leave-active {
    transition: opacity 0.3s;
}

.dsq-back-to-top-enter-from,
.dsq-back-to-top-leave-to {
    opacity: 0;
}
</style>