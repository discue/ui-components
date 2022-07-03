# NavLink <Badge type="tip" text="since v0.4.0" vertical="top" />

A link component. Will register a click handler and will on click and based on the <Text :highlight="true">href</Text> property either let the
browser scroll to the target component on the same page, or use vue router to navigate to the target page.

It can be visualized as a button, if necessary. 

## Preview
<ClientOnly>
  <DynamicComponentDisplay type="NavLink" href="https://www.discue.io">
    <NavLinkPreview/>
  </DynamicComponentDisplay>
</ClientOnly>

## Example
@[code](@examples/NavLinkExample.vue)