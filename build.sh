#!/bin/bash

set -e

npx vite build --config vite.config.ts
npx vite build --config vite.config.internal.ts
npm run build-types
node create_theme_keys.js