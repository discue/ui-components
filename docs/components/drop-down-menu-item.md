# DropDownMenuItem <Badge type="tip" text="since v0.3.0" vertical="top" />

A list element that can contain an icon and a label. The icon must be passed via the default slot. The element will register a click handler and use <Text :highlight="true">vue-router</Text> to navigate to the target page.

## Preview
<DynamicComponentDisplay type="DropDownMenuItem" label="Sign out" href="/signed-out">
  <DropDownMenuItemPreview/>
</DynamicComponentDisplay>

## Example
@[code](@examples/DropDownMenuItemExample.vue)