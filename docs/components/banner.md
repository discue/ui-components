# Banner <Badge type="tip" text="since v0.11.0" vertical="top" />

A banner can show context-specific information. It can be closed programmatically, or by the user. If the `parent` prop is specified, the element will be appended to the parent element. Thus, the `parent` element must exist before we render the Banner. If `parent` is falsy, the Banner will be added at the current position in the element tree.

Uses [Teleport](https://vuejs.org/guide/built-ins/teleport.html#basic-usage) under the hood.

## Preview
<DynamicComponentDisplay type="Banner" :show="true">
    Please confirm your email address by clicking 
    the link in the confirmation email.
</DynamicComponentDisplay>

## Example
@[code](@examples/BannerExample.vue)