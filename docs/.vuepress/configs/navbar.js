import { path } from '@vuepress/utils';
import fs from 'node:fs';
import { version } from '../../../package.json';

const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

export default [{
    text: 'Components',
    link: `/components/`,
    activeMatch: '^/components'
},
{
    text: `Community`,
    children: [
        {
            text: 'Code Contributions',
            link: `/contributions/`,
            activeMatch: '^/contributions'
        },
        {
            text: 'Code of Conduct',
            link: 'https://github.com/discue/.github/blob/main/CODE_OF_CONDUCT.md',
        },
        {
            text: 'Security Policy',
            link: `https://github.com/discue/.github/blob/main/SECURITY.md`,
        },
    ],
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