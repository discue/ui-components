#!/bin/bash

set -e

# replace duplicate footer tag
sed -i 's/<footer/<div/g' ./node_modules/@vuepress/theme-default/lib/client/components/PageMeta.vue
sed -i 's/<\/footer>/<\/div>/g' ./node_modules/@vuepress/theme-default/lib/client/components/PageMeta.vue

npx vite build --config vite.config.ts
npx vite build --config vite.config.internal.ts
npm run build-types
node create_theme_keys.js