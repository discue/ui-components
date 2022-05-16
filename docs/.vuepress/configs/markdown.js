const { path } = require('@vuepress/utils')

module.exports = {
    importCode: {
        handleImportPath: (str) =>
            str.replace(/^@examples/, path.resolve(__dirname, '../examples')),
    }
}