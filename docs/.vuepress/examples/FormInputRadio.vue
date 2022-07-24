<template>
  <FormInputRadio 
    id="demoRadio" 
    name="radio" 
    label="Label" 
    description="Showcases the radio element"
    :options="[{ value: '1', label: 'First Element' }, { value: '2', label: 'Second Element' }]">
  </FormInputRadio>
</template>

<script setup>
import { FormInputRadio } from '@discue/ui-components'
</script>