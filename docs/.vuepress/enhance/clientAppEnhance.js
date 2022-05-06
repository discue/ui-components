import { defineClientAppEnhance } from '@vuepress/client'
import * as components from '../../../src/index'

export default defineClientAppEnhance(({ app }) => {
    Object.entries(components).forEach(([key, value]) => {
        app.component(key, value)
    })
})