import js from "@eslint/js"
import pluginVue from 'eslint-plugin-vue'
import eslintParser from 'vue-eslint-parser'

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: eslintParser
        },
        rules: {
            'vue/first-attribute-linebreak': 'off',
            'vue/html-closing-bracket-newline': 'off',
            'vue/require-default-prop': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/html-indent': 'off',
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                }
            ],
            "quotes": [
                "error",
                "single",
                {
                    "allowTemplateLiterals": true
                }
            ]
        }
    }
]
