<template>
    <!-- based on https://flowbite.com/docs/typography/headings/#breadcrumb-context -->
    <nav aria-label="Breadcrumb"
         class="dsq-breadcrumbs flex bg-inherit">
        <ol class="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
            <li v-for="(crumb, index) in crumbs"
                :key="index"
                class="inline-flex items-center">
                <div class="flex items-center">
                    <template v-if="index === 0">
                        <HomeIcon class="w-5 h-5 mr-1 text-gray-400 dark:text-gray-700 mr-2" />
                    </template>
                    <template v-else>
                        <ChevronRightIcon class="w-6 h-6 mr-1 text-gray-400 dark:text-gray-700" />
                    </template>

                    <template v-if="crumb.path">
                        <NavLink class="ms-1 md:ms-2 text-gray-400 dark:text-gray-700"
                                 :href="crumb.path"
                                 :inherit-color="true"
                                 :light="isNotLastCrumb(index)"
                                 :small="true">
                            <Text :inherit-color="true"
                                  :small="true">
                                {{ crumb.name }}
                            </Text>
                        </NavLink>
                    </template>
                    <template v-else>
                        <span class="ms-1 text-sm font-medium text-gray-400 dark:text-gray-700 md:ms-2">
                            <Text :inherit-color="true"
                                  :light="isNotLastCrumb(index)"
                                  :small="true">
                                {{ crumb.name }}
                            </Text>
                        </span>
                    </template>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/16/solid';
import NavLink from './nav-link.vue';
import Text from './text.vue';

const props = defineProps({
    crumbs: {
        type: Array,
        required: true,
        validator(value) {
            return value.every(
                (crumb) =>
                    typeof crumb.name === 'string' &&
                    (crumb.path === undefined || crumb.path.startsWith('/'))
            );
        },
    },
});

function isNotLastCrumb(index) {
    return index < props.crumbs.length - 1
}
</script>
