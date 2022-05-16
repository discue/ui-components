const { path } = require('@vuepress/utils')

const fs = require('fs')
const components = fs.readdirSync(path.resolve(__dirname, '../../components')) //
    .map(file => file.toLowerCase().substring(0, file.indexOf('.')))
    .sort()

module.exports = {
    '/components/': [
        {
            text: 'Components',
            collapsible: true,
            children: components,
        }
    ],
}