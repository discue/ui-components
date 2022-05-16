const { viteBundler } = require('@vuepress/bundler-vite');
const defaultTheme = require('./theme')

const extendsMarkdown = require('./configs/extends-markdown')
const head = require('./configs/head')
const markdown = require('./configs/markdown')
const navbar = require('./configs/navbar')
const plugins = require('./configs/plugins')
const sidebar = require('./configs/sidebar')

module.exports = {
    // site config
    lang: 'en-US',
    title: 'discue',
    description: 'Vue.js UI components for the secure and reliable messaging and queueing service.',
    bundler: viteBundler({}),
    theme: defaultTheme({
        darkMode: false,
        logo: '/logo.svg',
        logoDark: '/icons-fire-all-gray/web/icon-96.png',
        editLinkText: 'Improve this page',
        docsDir: 'docs',
        docsBranch: 'main',
        repo: 'discue/ui-components',
        repoLabel: 'GitHub',
        sidebarDepth: 3,
        navbar,
        sidebar
    }),
    plugins,
    markdown,
    extendsMarkdown,
    head
}