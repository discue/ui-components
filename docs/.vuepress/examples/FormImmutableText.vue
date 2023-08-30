<template>
  <FormImmutableInput
    label="ZipCode" 
    description="Please enter a valid zip code" 
    pattern="[0-9]{5}" 
    format="85080" />
</template>

<script setup>
import { FormImmutableInput } from '@discue/ui-components';
</script>