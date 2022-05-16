const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { shikiPlugin } = require('@vuepress/plugin-shiki')
const { path } = require('@vuepress/utils')

module.exports = [
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../examples')
    }),
    shikiPlugin({ theme: 'dark-plus' }),
]