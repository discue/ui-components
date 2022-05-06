import { defineClientAppEnhance } from '@vuepress/client'
import { DropDownMenu, DropDownMenuBannerItem, DropDownMenuItem, DynamicComponentDisplay, Text } from '../../../src/index'

export default defineClientAppEnhance(({ app }) => {
    app.component('DropDownMenu', DropDownMenu)
    app.component('DropDownMenuBannerItem', DropDownMenuBannerItem)
    app.component('DropDownMenuItem', DropDownMenuItem)
    app.component('DynamicComponentDisplay', DynamicComponentDisplay)
    app.component('Text', Text)
})