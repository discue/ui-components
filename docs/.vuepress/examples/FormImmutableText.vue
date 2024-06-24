<template>
  <FormImmutableText id="FormImmutableInputApiKey"
                     label="Your Api Key"
                     description="Please enter a valid zip code"
                     :text="apiKey" />
</template>

<script setup>
import { FormImmutableText } from '@discue/ui-components';
</script>