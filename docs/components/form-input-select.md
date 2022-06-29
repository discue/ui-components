# FormInputSelect <Badge type="tip" text="since v0.13.0" vertical="top" />

A select element wrapped inside a labelled form element. The select element at the moment is a plain HTML element. The options elements will be generated at runtime based on the `elements` prop, which is expected to be an array.

The element supports the Vue.js [v-model directive](https://vuejs.org/api/built-in-directives.html#v-model). On input the directive will be updated with the currently select element, or more precisely the JS object that was found at the selected index. 

Similar to [v-for](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key) it depends on knowing the unique attribute of each element. Thus, the prop `track-by` can be set to the key that can be used to track and identify distinct elements. By default the value of the `id` attribute is tracked.

## Preview
<DynamicComponentDisplay type="FormInputSelect" :attach-v-model="true" id="demoSelect" description="Showcases the select element" label="Label" :elements="[{id: '1', name:'First Element'}, {id: '2', name: 'Second Element'}]"></DynamicComponentDisplay>

## Example
@[code](@examples/BackToTopExample.vue)