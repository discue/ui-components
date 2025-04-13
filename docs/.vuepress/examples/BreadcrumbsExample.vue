<template>
    <Breadcrumbs :crumbs="crumbs" />
</template>

<script setup lang="ts">
import { Breadcrumbs } from '@discue/ui-components';

const crumbs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Topics', path: '/topics' },
    { name: 'my-first-queue', path: '/topics/qui-enim-amet' },
];
</script>