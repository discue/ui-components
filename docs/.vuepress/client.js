import * as components from '../../src/index'
import * as internalComponents from '../../src/internal/index'
import Layout from './layouts/Layout.vue'

// TODO
// use defineClientConfig once it is exported again

export default {
    enhance({ app, _router, _siteData }) {
        Object.entries(components).forEach(([key, value]) => {
            app.component(key, value)
        })
        Object.entries(internalComponents).forEach(([key, value]) => {
            app.component(key, value)
        })
    },
    layouts: {
        Layout
    },
}