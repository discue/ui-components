import { defaultTheme } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';

export default options => {
    return Object.assign({}, defaultTheme(options), {
        name: 'vuepress-theme-local',
        extends: defaultTheme(),
        alias: {
            '@discue/ui-components': path.resolve(__dirname, '../../../src/index'),
            '@theme/HomeFooter.vue': path.resolve(__dirname, './components/HomeFooter.vue')
        }
    })
}