#!/bin/bash

set -exu

rm -rf dist

./prepare-docs-build.sh

npx vite build --config vite.config.ts
npx vite build --config vite.config.internal.ts
npm run build-types || true

if [[ ! -e dist/ui.es.d.ts ]]; then
    echo "Types file was not created. Exiting early"
    exit 1
fi

node create_theme_keys.js