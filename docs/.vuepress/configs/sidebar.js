import { path } from '@vuepress/utils';
import fs from 'node:fs';

const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

export default {
    '/components/': [
        {
            text: 'Components',
            collapsible: true,
            children: components,
        }
    ],
}