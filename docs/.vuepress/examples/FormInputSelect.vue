<template>
    <FormInputSelect 
      id="demoSelect" 
      label="Label"
      description="Showcases the select element" 
      :elements="[{ id: '1', name: 'First Element' }, { id: '2', name: 'Second Element' }]">
    </FormInputSelect>
</template>

<script setup>
import { FormInputSelect } from '@discue/ui-components'
</script>