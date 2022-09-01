import { path } from '@vuepress/utils';
import fs from 'node:fs';
import { version } from '../../../package.json';

const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

export default [{
    text: 'Components',
    link: `/components/${components[0]}`,
},
{
    text: `v${version}`,
    children: [
        {
            text: 'Changelog',
            link: 'https://github.com/discue/ui-components/blob/main/CHANGELOG.md',
        },
    ],
}]