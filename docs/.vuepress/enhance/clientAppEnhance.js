import { defineClientAppEnhance } from '@vuepress/client'
import * as components from '../../../src/index'
import * as internalComponents from '../../../src/internal/index'

export default defineClientAppEnhance(({ app }) => {
    Object.entries(components).forEach(([key, value]) => {
        app.component(key, value)
    })
    Object.entries(internalComponents).forEach(([key, value]) => {
        app.component(key, value)
    })
})