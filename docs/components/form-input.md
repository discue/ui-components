# FormInput <Badge type="tip" text="since v0.22.0" vertical="top" /> <Badge type="themeable" text="themeable" vertical="top" />

An input element wrapped inside a labelled form element.

The element supports the Vue.js [v-model directive](https://vuejs.org/api/built-in-directives.html#v-model). On input the directive will be updated with the index of selected option.

## Preview
<DynamicComponentDisplay type="FormInput" :attach-v-model="true" label="ZipCode" name="ZipCode" id="ZipCodeInput" placeholder="Your ZipCode" description="Please enter a valid zip code" pattern="[0-9]{5}" format="85080"></DynamicComponentDisplay>

## Example
@[code](@examples/FormInput.vue)