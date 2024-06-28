<template>
    <Headlines>
        <template #headline>
            Enim consequat ad Lorem.
        </template>
        <template #subline>
            Commodo ipsum adipisicing amet dos.
        </template>
        <template #text>
            <Text :large="true">Excepteur quis in culpa ex qui.</Text>
        </template>
    </Headlines>
</template>

<script setup>
import { Headlines } from '@discue/ui-components';
</script>