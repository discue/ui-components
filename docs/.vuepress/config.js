const anchorPlugin = require('markdown-it-anchor')
const { viteBundler } = require('@vuepress/bundler-vite');
const defaultTheme = require('./theme')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { searchPlugin } = require('@vuepress/plugin-search')
const { path } = require('@vuepress/utils')

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

const slugify = (str) => {
    return str
        .normalize('NFKD')
        // Remove accents
        .replace(rCombining, '')
        // Remove control characters
        .replace(rControl, '')
        // Replace special characters
        .replace(rSpecial, '-')
        // Remove continuos separators
        .replace(/-{2,}/g, '-')
        // Remove prefixing and trailing separators
        .replace(/^-+|-+$/g, '')
        // ensure it doesn't start with a number (#121)
        .replace(/^(\d)/, '_$1')
        // lowercase
        .toLowerCase()
}

module.exports = {
    // site config
    lang: 'en-US',
    title: 'discue',
    description: 'UI library docs for the secure and reliable messaging and queueing service.',
    bundler: viteBundler({}),
    theme: defaultTheme({
        darkMode: false,
        logo: '/logo.svg',
        logoDark: '/icons-fire-all-gray/web/icon-96.png',
        editLinkText: 'Improve this page',
        docsDir: 'docs',
        docsBranch: 'master',
        repo: 'discue/discue-io-ui-docs',
        repoLabel: 'GitHub',
        sidebarDepth: 3,
        navbar: [{
            text: 'Introduction',
            link: '/introduction/',
        }, {
            text: 'Components',
            link: '/components/',
        }]
    }),
    clientAppEnhanceFiles: path.resolve(
        __dirname,
        './enhance/clientAppEnhance.js'
    ),
    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, 'examples')
        }),
    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@examples/, path.resolve(__dirname, 'examples')),
        },
    },
    extendsMarkdown: (md) => {
        md.use(require('markdown-it-attrs'), {
            allowedAttributes: ['id'],
            leftDelimiter: '[',
            rightDelimiter: ']',
            allowedAttributes: []  // empty array = all attributes are allowed
        })
        md.use(anchorPlugin, {
            level: [1, 2, 3, 4, 5, 6],
            slugify,
            permalink: anchorPlugin.permalink.ariaHidden({
                class: 'header-anchor',
                symbol: '#',
                space: true,
                placement: 'before',
            }),
        })
    },
    head: [
        ['link', { rel: 'icon', type: "image/png", sizes: "16x16", href: "/icons-fire-all-black/web/favicon.ico" }],
        ['link', { rel: 'icon', type: "image/png", sizes: "32x32", href: "/icons-fire-all-black/web/favicon.ico" }],
        ['link', { rel: "apple-touch-icon", sizes: "152x152", href: "/icons-fire-all-black/web/apple-touch-icon-152x152.png" }]
    ],
}