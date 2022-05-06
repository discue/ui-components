<h3>NavLink</h3>

A link component. Will register a click handler and will on click and based on the <Text :highlight="true">href</Text> property either let the
browser scroll to the target component on the same page, or use vue router to navigate to the target page.

It can be visualized as a button, if necessary. 

### Preview [#navlink-preview]
<DynamicComponentDisplay type="NavLink">
  <NavLinkPreview/>
</DynamicComponentDisplay>

### Example [#navlink-example]
@[code](@examples/NavLinkExample.vue)