const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        externals: [
            'vue', 'vue-router'
        ]
    },
    css: {
        extract: false,
    },
})
