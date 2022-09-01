import { path } from '@vuepress/utils'

export default {
    importCode: {
        handleImportPath: (str) =>
            str
                .replace(/^@examples/, path.resolve(__dirname, '../examples'))
                .replace(/^@src/, path.resolve(__dirname, '../../../src')),
    }
}