
<p align="center"><a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo"></a></p>

<br/>
<div align="center">

[![GitHub tag](https://img.shields.io/github/tag/discue/ui-components?include_prereleases=&sort=semver&color=blue)](https://github.com/discue/ui-components/releases/)
[![Latest Stable Version](https://img.shields.io/npm/v/@discue/ui-components.svg)](https://www.npmjs.com/package/@discue/ui-components)
[![License](https://img.shields.io/npm/l/@discue/ui-components.svg)](https://www.npmjs.com/package/@discue/ui-components)
<br/>
[![NPM Downloads](https://img.shields.io/npm/dt/@discue/ui-components.svg)](https://www.npmjs.com/package/@discue/ui-components)
[![NPM Downloads](https://img.shields.io/npm/dm/@discue/ui-components.svg)](https://www.npmjs.com/package/@discue/ui-components)
<br/>
[![contributions - welcome](https://img.shields.io/badge/contributions-welcome-blue)](/CONTRIBUTING.md "Go to contributions doc")
[![Made with Node.js](https://img.shields.io/badge/Node.js->=12-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

</div>

<br/>

# ui-components

A collection of vue.js **themeable** components used in discue.io.

## Installation

Install with npm

```bash
  npm install @discue/ui-components
```

## Usage
To change the default theme, register the module as a [Vue Plugin](https://vuejs.org/guide/reusability/plugins.html#introduction) and pass an object with theme properties. Valid theme property keys can be found in [theme.js](src/theme.js) and [theme-keys.js](src/theme-keys.js).

```js
import uiComponents from '@discue/ui-components'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(uiComponents, {
        'text.attention.default': 'text-red-800',
        'text.weight.default': 'font-bold'
    })
    .mount('#app')
```

In your component files, import any ui component from the main export and use it in your template. 

```vue
<template>
    <NavLink href="#pricing">Go to pricing</NavLink>
</template>

<script setup>
import { NavLink } from '@discue/ui-components'
</script>
```

The list of currently available components can be found at [ui.discue.io](https://ui.discue.io/components/back-to-top.html).

## Run Tests

To run tests, run the following command

```bash
  npm run test:unit
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

