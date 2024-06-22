<template>
    <FormElementsContainer class="bg-stone-300"
                           id="CreatePersonFormElements">
        <FormInput label="First Name"
                   description="Please enter your first name."
                   :show-format-hint="true"
                   format="John Doe" />
        <FormInput label="Second Name"
                   description="Please enter your second name."
                   :show-format-hint="true"
                   format="John Doe" />
        <FormInput label="ZipCode"
                   description="Please enter a valid zip code."
                   :show-format-hint="true"
                   format="85080" />
        <FormInput label="City"
                   description="Please enter a valid zip city name."
                   :show-format-hint="true"
                   format="New York" />
        <NavButton type="button">Submit</NavButton>
    </FormElementsContainer>
</template>

<script setup>
import { FormElementsContainer, FormInput, NavButton } from '@discue/ui-components';
</script>