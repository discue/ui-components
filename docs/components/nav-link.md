# NavLink <Badge type="tip" text="since v0.4.0" vertical="top" /> <Badge type="themeable" text="themeable" vertical="top" />

A link component. Will register a click handler and will - on click and based on the `href` property - either 
- let the browser scroll to the target component on the same page,
- let the browser navigate to an external page, or
- use vue router to navigate to the application internal target page.

If the `href` prop contains a link to a domain that is not equal to the current domain - subdomains count as different domains - 
- an additional icon is added to the link text to visualize it's an external link, 
- the browser will be instructed to open the link in a new page, and
- the attributes [noreferrer](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noreferrer) and [noopener](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener) get added to prevent leakage of sensitive information.

The component can be visualized as a button, if necessary. 

## Preview
<ClientOnly>
  <DynamicComponentDisplay type="NavLink" href="https://www.discue.io">
    <NavLinkPreview/>
  </DynamicComponentDisplay>
</ClientOnly>

## Example
@[code](@examples/NavLinkExample.vue)