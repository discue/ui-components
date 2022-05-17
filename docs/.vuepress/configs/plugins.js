const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { shikiPlugin } = require('@vuepress/plugin-shiki')
const { sitemapPlugin } = require('vuepress-plugin-sitemap2')
const { path } = require('@vuepress/utils')

module.exports = [
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../examples')
    }),
    shikiPlugin({ theme: 'dark-plus' }),
    sitemapPlugin({
        hostname: 'https://ui.discue.io',
        excludeUrls: [
            'https://docs.discue.io/api-reference/'
        ]
    }),
]