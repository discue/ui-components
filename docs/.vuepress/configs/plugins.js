import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { path } from '@vuepress/utils';

export default [
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../examples')
    }),
    shikiPlugin({ theme: 'dark-plus' })
]