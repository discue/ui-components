# FormImmutableText <Badge type="tip" text="since v0.40.0" vertical="top" /> 

A `span` element wrapped inside a labelled form element. Does not allow any user input, hence the name. Use this component to add immutable form elements e.g. to display an API key, or other value that might be interesting to the user.

By default, the component will render a copy-to-clipboard button to allow for easier copy and pasting the component's value.

## Preview
<ClientOnly>
<DynamicComponentDisplay type="FormImmutableText" :attach-v-model="true" label="Your Api Key" text="CaJ_9ajombMlDtlSFI1W_xdfdyyRZofOMgUZlhX" id="FormImmutableInputApiKey" ></DynamicComponentDisplay>
</ClientOnly>

## Example
@[code](@examples/FormImmutableText.vue)