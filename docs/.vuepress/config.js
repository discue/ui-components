import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
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
    description: 'Vue.js UI components for the secure and reliable messaging and queueing service.',
    theme: defaultTheme({
        colorMode: 'light',
        colorModeSwitch: false,
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
})