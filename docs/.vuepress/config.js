import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import { path } from '@vuepress/utils';
import extendsMarkdown from './configs/extends-markdown.js';
import head from './configs/head.js';
import markdown from './configs/markdown.js';
import navbar from './configs/navbar.js';
import plugins from './configs/plugins.js';
import sidebar from './configs/sidebar.js';
import defaultTheme from './theme/index.js';

export default defineUserConfig({
    bundler: viteBundler(),
    lang: 'en-US',
    title: 'discue',
    description: 'A collection of reusable UI components for Vue 3 built for discue.io',
    theme: defaultTheme({
        alias: {
            '@discue/ui-components': path.resolve(__dirname, '../../src/index'),
            '@theme/HomeFooter.vue': path.resolve(__dirname, './components/HomeFooter.vue')
        },
        colorMode: 'light',
        colorModeSwitch: false,
        hostname: 'https://ui.discue.io',
        logo: '/logo.svg',
        logoDark: '/icons-fire-all-gray/web/icon-96.png',
        editLinkText: 'Improve this page',
        docsDir: 'docs',
        docsBranch: 'main',
        repo: 'discue/ui-components',
        repoLabel: 'GitHub',
        sidebarDepth: 3,
        navbar,
        sidebar,
        themePlugins: {
            prismjs: false,
        },
    }),
    plugins,
    markdown,
    extendsMarkdown,
    head
})