import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { path } from '@vuepress/utils';
import { sitemapPlugin } from 'vuepress-plugin-sitemap2';

export default [
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../examples')
    }),
    shikiPlugin({ theme: 'dark-plus' }),
    sitemapPlugin({
        hostname: 'https://ui.discue.io',
        excludeUrls: []
    }),
]