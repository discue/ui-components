# FormInputRadio <Badge type="tip" text="since v0.17.0" vertical="top" />

A radio button element wrapped inside a labelled form element. The label and input elements will be generated at runtime based on the `options` prop, which is expected to be an array. The expected format of the array items is `{ value: 'uniqueValueString', label: 'uniqueLabelString'}`. While the component was designed for mainly two or three options, it can host any number of options.

The element supports the Vue.js [v-model directive](https://vuejs.org/api/built-in-directives.html#v-model). On input the directive will be updated with the index of selected option.

## Preview
<DynamicComponentDisplay type="FormInputRadio" :attach-v-model="true" initial-value="2" id="demoRadio2" name="demoRadio" description="Showcases the radio element" label="Label" :options="[{value: '1', label:'First Element'}, {value: '2', label: 'Second Element'}]"></DynamicComponentDisplay>

## Example
@[code](@examples/FormInputRadio.vue)