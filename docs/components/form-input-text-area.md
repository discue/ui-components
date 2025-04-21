# FormInputTextArea <Badge type="tip" text="since v1.7.0" vertical="top" /> <Badge type="themeable" text="themeable" vertical="top" />

An `textarea` element wrapped inside a labelled form element.

The element supports the Vue.js [v-model directive](https://vuejs.org/api/built-in-directives.html#v-model). On input the directive will be updated with the index of selected option.

## Preview
<DynamicComponentDisplay type="FormInputTextArea" :attach-v-model="true" label="Comments" name="Comments" id="CommentsInput" placeholder="Your comments" description="Please enter your comments or feedback"></DynamicComponentDisplay>

## Example
@[code](@examples/FormInputTextArea.vue)