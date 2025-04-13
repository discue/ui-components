# Breadcrumbs <Badge type="tip" text="since v1.2.0" vertical="top" />

Breadcrumbs provide a navigational hierarchy for users to understand their current location within the application. Each breadcrumb can link to a specific path or display as plain text if no path is provided.

## Preview
<ClientOnly>
<DynamicComponentDisplay type="Breadcrumbs" :crumbs="[
  { name: 'Dashboard', path: '/' },
  { name: 'Topics', path: '/topics' },
  { name: 'qui-enim-amet', path: '/topics/qui-enim-amet' }
]" />
</ClientOnly>

## Example
@[code](@examples/BreadcrumbsExample.vue)