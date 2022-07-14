#!/bin/bash

set -e

rm -rf dist/

VUE_CLI_SERVICE_CONFIG_PATH=vue.config.js npm run build-lib-public-no-ssr
VUE_CLI_SERVICE_CONFIG_PATH=ssr-safe-vue.config.js npm run build-lib-public-for-ssr
VUE_CLI_SERVICE_CONFIG_PATH=vue.config.js  npm run build-lib-internal-no-ssr
VUE_CLI_SERVICE_CONFIG_PATH=ssr-safe-vue.config.js npm run build-lib-internal-for-ssr
VUE_CLI_SERVICE_CONFIG_PATH=vue.config.js npm run build-types

rm -rf dist/demo.html
rm -rf dist/*/demo.html
rm -rf dist/*/*/demo.html