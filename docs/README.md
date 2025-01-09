---
home: true
title: Vue.js component library of discue.io
heroImage: /icons-fire-light/web/icon-512.png
actions:
  - text: Get Started
    link: /components/back-to-top.html
    type: primary
features:
  - title: Accessible
    details: Built with accessibility in mind, ensuring a great experience for everyone.
  - title: Consistent
    details: Built from the ground up to provide a consistent user interface.
  - title: Simple
    details: Polished and easy to integrate.
  - title: Stylish
    details: Uses tailwindcss under the hood to provide modern look and feel.
  - title: Themeable
    details: Easily customize the look and feel of the components to match your brand.
  - title: Open Source
    details: MIT licensed and contributions are welcome.
---

## Getting Started
This is a collection of Vue.js components used in [discue.io](https://www.discue.io/).  It's designed to be easily integrated into your Vue.js projects and offers a consistent, accessible, and stylish user interface.

### Key Features

* **Accessibility:** Built with accessibility best practices in mind.
* **Consistency:** Provides a unified look and feel across all components.
* **Simplicity:** Easy to use and integrate into your existing projects.
* **Style:** Leverages Tailwind CSS for a modern and customizable design.
* **Theming:** Allows for easy customization of component styles to match your brand.
* **Open Source:**  MIT licensed and welcomes community contributions.

### Available Components

A full list of available components and their usage can be found in the [component documentation](/components/back-to-top.html).

### Installation

Install the package via npm or yarn:

```bash
npm install @discue/ui-components
```

or

```bash
yarn add @discue/ui-components
```

### Usage

Import the components you need and use them in your Vue templates:
@[code](@examples/FormInput.vue)

### Theming

To customize the component styles, you can register the theme plugin and pass a theme object:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { theme } from '@discue/ui-components';

createApp(App).use(theme, {
  // Customize theme properties here
  // See src/theme.js and src/theme-keys.js for available properties
  'TEXT_COLOR_DEFAULT': 'text-gray-500'
}).mount('#app');
```

```vue
<template>
    <Text>
        Ea officia nulla veniam eu enim tempor anim consectetur ut nostrud.
    </Text>
</template>

<script setup>
import { Text } from '@discue/ui-components'
</script>
```

See the [theming guide](/theming.html) for more details.

## Contributing

We welcome contributions! Please see our [contribution guidelines](/CONTRIBUTING.md) for more information.