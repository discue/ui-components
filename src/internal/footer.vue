<template>
    <footer class="dsq-footer h-40 z-10">
        <div class="grid grid-cols-6 gap-4 p-8 bg-white">
            <div class="col-span-2 w-32 self-center justify-self-center fill-current text-gray-900">
                <div v-if="showLogo"
                     class="flex flex-row">
                    <NavLink class="flex h-12 space-x-2 text-4xl text-gray-900"
                             href="https://www.discue.io/">
                        <svg class="-mt-6 w-8"
                             fill="none"
                             viewBox="0 0 23 56"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9267 54.0632C14.6011 53.96 14.3008 53.7773 14.0481 53.5287C13.7953 53.28 13.5966 52.9718 13.4667 52.627C13.1465 51.7898 13.2705 50.8238 13.2227 49.9308C13.2385 48.084 13.3798 46.2394 13.4836 44.3965C13.6959 41.5814 14.28 38.8244 14.6379 36.0311C15.033 32.8621 15.9359 24.3281 15.9683 18.8386C16.129 15.163 16.3569 11.4909 16.4216 7.8109C16.5248 5.49556 16.604 3.18009 16.3032 0.877426C16.9158 2.82726 17.3434 4.84183 17.5793 6.88885C17.9909 9.49 18.3876 12.0936 18.678 14.7152C18.7342 15.2149 18.792 15.7085 18.85 16.1996C19.005 12.3401 19.0261 8.47542 19.2628 4.61869C19.4627 5.54879 19.6362 6.4861 19.798 7.42531C20.2573 10.3001 20.9056 13.1373 21.2611 16.0321C21.7675 20.6488 22.2104 25.285 22.4269 29.9302C22.6458 34.7865 22.4817 39.6546 21.9364 44.4796C21.6063 46.7905 21.68 49.3176 20.5271 51.3648C19.7776 52.7032 18.3452 53.0668 17.0863 53.5834C16.9969 53.6285 16.9057 53.6693 16.8191 53.7206C16.5412 53.9163 16.2302 54.0477 15.9048 54.1066C15.5795 54.1655 15.2467 54.1507 14.9267 54.0632V54.0632Z"
                                  fill="#111827" />
                            <path d="M8.65152 28.0603C8.97939 28.1147 9.28171 28.2102 9.53605 28.3398C9.79038 28.4693 9.99019 28.6296 10.1207 28.8088C10.4422 29.2437 10.3159 29.7442 10.3629 30.2074C10.3445 31.165 10.1997 32.121 10.0928 33.0763C9.87509 34.5355 9.28298 35.9635 8.9186 37.4109C8.51639 39.0531 7.59537 43.4758 7.55544 46.3221C7.38864 48.2275 7.15413 50.131 7.08418 52.0389C6.97704 53.2392 6.89428 54.4396 7.19427 55.6343C6.57965 54.6217 6.15141 53.5761 5.91644 52.5141C5.5052 51.1643 5.10896 49.8132 4.81974 48.4531C4.7638 48.1939 4.70625 47.9378 4.64846 47.683C4.48718 49.6838 4.46083 51.6877 4.21721 53.6868C4.01697 53.204 3.84348 52.7176 3.68171 52.2302C3.22264 50.7384 2.57324 49.2656 2.2189 47.7637C1.7147 45.3686 1.27456 42.9635 1.0626 40.5543C0.848421 38.0357 1.02022 35.512 1.57608 33.0115C1.91167 31.8142 1.84075 30.5036 3.00508 29.4451C3.76205 28.753 5.20584 28.5682 6.47487 28.3036C6.565 28.2804 6.657 28.2595 6.74435 28.2331C7.02453 28.1323 7.33812 28.065 7.666 28.0353C7.99389 28.0056 8.32921 28.0141 8.65152 28.0603Z"
                                  fill="#AFE81A" />
                        </svg>
                        <div>
                            <span id="title"
                                  class="font-bold">discue</span>
                            <span class="text-gray-500 font-light">.io</span>
                        </div>
                    </NavLink>
                </div>
            </div>

            <ul class="space-y-2">
                <li class="font-bold text-lg text-gray-800">
                    About
                </li>
                <li v-for="link in companyLinks"
                    :key="link.title"
                    class="text-md text-gray-800">
                    <NavLink :href="link.href"
                             :secondary="true"
                             :small="true">
                        {{ link.title }}
                    </NavLink>
                </li>
            </ul>

            <ul class="space-y-2">
                <li class="font-bold text-lg text-gray-800">
                    API Resources
                </li>
                <li v-for="link in apiResourcesLinks"
                    :key="link.title"
                    class="text-md text-gray-800">
                    <NavLink :href="link.href"
                             :secondary="true"
                             :small="true">
                        {{ link.title }}
                    </NavLink>
                </li>
            </ul>

            <ul class="space-y-2">
                <li class="font-bold text-lg text-gray-800">
                    UI Components
                </li>
                <li v-for="link in uiComponentsLinks"
                    :key="link.title"
                    class="text-md text-gray-800">
                    <NavLink :href="link.href"
                             :secondary="true"
                             :small="true">
                        {{ link.title }}
                    </NavLink>
                </li>
            </ul>

            <ul class="space-y-2">
                <li class="font-bold text-lg text-gray-800">
                    Legal
                </li>
                <li v-for="link in legalLinks"
                    :key="link.title"
                    class="text-md text-gray-800">
                    <NavLink :href="link.href"
                             :secondary="true"
                             :small="true">
                        {{ link.title }}
                    </NavLink>
                </li>
            </ul>
        </div>

        <div class="p-8 flex justify-center">
            <small class="text-gray-800">© Copyright
                2022, Stefan Pfaffel</small>
        </div>
    </footer>
</template>

<script setup>
import NavLink from '../components/nav-link.vue';

defineProps({
    showLogo: {
        type: Boolean,
        default: true
    }
})

const companyLinks = [
    {
        title: 'How it works',
        href: 'https://www.discue.io/#how-it-works'
    },
    {
        title: 'Use cases',
        href: 'https://www.discue.io/#use-cases'
    },
    {
        title: 'Delete Account',
        href: 'https://www.discue.io/'
    },
    {
        title: 'Cancel Subscription',
        href: 'https://www.discue.io/'
    }
]

const apiResourcesLinks = [
    {
        title: 'Getting started',
        href: 'https://docs.discue.io/getting-started/'
    },
    {
        title: 'API Overview',
        href: 'https://docs.discue.io/api-overview/'
    },
    {
        title: 'API Best Practices',
        href: 'https://docs.discue.io/api-best-practices/'
    },
    {
        title: 'API Reference',
        href: 'https://docs.discue.io/api-reference/api-keys/get-all-api-keys.html'
    }
]

const uiComponentsLinks = [
    {
        title: 'Documentation',
        href: 'https://ui.discue.io/'
    },
    {
        title: 'GitHub Repository',
        href: 'https://github.com/discue/ui-components'
    },
    {
        title: 'npm Package',
        href: 'https://www.npmjs.com/package/@discue/ui-components'
    }
]

const legalLinks = [
    {
        title: 'Privacy Policy',
        href: 'https://www.discue.io/privacy'
    },
    {
        title: 'Terms & Conditions',
        href: 'https://www.discue.io/terms'
    },
    {
        title: 'Imprint & Legal Notice',
        href: 'https://www.discue.io/imprint'
    }

]
</script>