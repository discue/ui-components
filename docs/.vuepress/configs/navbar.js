const { version } = require('../../../package.json')
const { path } = require('@vuepress/utils')

const fs = require('fs')
const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

module.exports = [{
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