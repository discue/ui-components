#!/bin/bash

set -e

npm run build-lib-external
VUE_CLI_SERVICE_CONFIG_PATH=ssr-safe-vue.config.js npm run build-lib-external-for-ssr
npm run build-lib-internal
VUE_CLI_SERVICE_CONFIG_PATH=ssr-safe-vue.config.js npm run build-lib-internal-for-ssr
npm run build-types

rm -rf dist/demo.html
rm -rf dist/*/demo.html
rm -rf dist/*/*/demo.html