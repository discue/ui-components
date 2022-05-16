import { defineClientConfig } from '@vuepress/client'
import * as components from '../../src/index'
import * as internalComponents from '../../src/internal/index'

export default defineClientConfig({
    enhance({ app, _router, _siteData }) {
        Object.entries(components).forEach(([key, value]) => {
            app.component(key, value)
        })
        Object.entries(internalComponents).forEach(([key, value]) => {
            app.component(key, value)
        })
    }
})