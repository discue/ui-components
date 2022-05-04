const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        externals: [
            'vue', 'vue-router'
        ],
        resolve: {
            symlinks: false,
            alias: {
                '@': resolve('./src/')
            }
        }
    },
    css: {
        extract: false,
    },
})
