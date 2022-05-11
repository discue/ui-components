
<p align="center"><a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo"></a></p>

# ui-components

A collection of vue.js components used in discue.io.

## Installation

Install with npm

```bash
  npm install @discue/ui-components
```

## Usage

Import any component from the main export and use it in your template. 

```vue
<template>
    <NavLink href="#pricing">Go to pricing</NavLink>
</template>

<script setup>
import { NavLink } from '@discue/ui-components'
</script>
```

The list of currently available components can be found at [ui.discue.io](https://ui.discue.io/components/back-to-top.html).

## Service-side Rendering (SSR)
The default export can not be used for SSR apps. That is because some components might carry also inline stlyes. We do however provide the SSR-friendly export `@discue/ui-components`

## Run Tests

To run tests, run the following command

```bash
  npm run test:unit
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

