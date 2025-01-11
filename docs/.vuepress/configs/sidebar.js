import { path } from '@vuepress/utils';
import fs from 'node:fs';

const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .filter(file => !file.endsWith('README.md'))
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

export default {
    '/components/': [
        {
            text: 'Components',
            link: '/components/',
            collapsible: true,
            children: components,
        },
        {
            text: 'Contributions',
            link: '/contributions/',
        },
    ],
    '/contributions/': [
        {
            text: 'Components',
            link: '/components/',
            collapsible: true,
            children: components,
        },
        {
            text: 'Contributions',
            link: '/contributions/',
        },
    ],
}