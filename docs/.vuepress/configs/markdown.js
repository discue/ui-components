import { path } from '@vuepress/utils'

export default {
    extractHeaders: { level: [2, 3, 4, 5, 6] },
    anchor: false,
    importCode: {
        handleImportPath: (str) =>
            str
                .replace(/^@examples/, path.resolve(__dirname, '../examples'))
                .replace(/^@src/, path.resolve(__dirname, '../../../src')),
    }
}