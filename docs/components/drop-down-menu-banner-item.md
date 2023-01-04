# DropDownMenuBannerItem <Badge type="tip" text="since v0.3.0" vertical="top" />

A list element the can contain an arbitrary template via the default slot. The element will intercept and swallow <Text :highlight="true">all</Text> click events so they don't bubble up.

## Preview
<DynamicComponentDisplay type="DropDownMenuBannerItem">
  <DropDownMenuBannerItemPreview/>
</DynamicComponentDisplay>

## Example
@[code](@examples/DropDownMenuBannerItemExample.vue)