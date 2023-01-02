import * as uiComponentsTheme from './theme.js';

// required to allow usage as vue plugin
// @ts-ignore
export const install = (...args) => uiComponentsTheme.install.apply(uiComponentsTheme, args);
export const theme = uiComponentsTheme

export { default as BackToTop } from './components/back-to-top.vue';
export { default as Banner } from './components/banner.vue';
export { default as DynamicComponentDisplay } from './components/docs/dynamic-component-display.vue';
export { default as DropDownMenuBannerItem } from './components/drop-down-menu-banner-item.vue';
export { default as DropDownMenuItem } from './components/drop-down-menu-item.vue';
export { default as DropDownMenu } from './components/drop-down-menu.vue';
export { default as FormElementErrorMessage } from './components/form-element-error-message.vue';
export { default as FormInputRadio } from './components/form-input-radio.vue';
export { default as FormInputSelect } from './components/form-input-select.vue';
export { default as FormInput } from './components/form-input.vue';
export { default as Headlines } from './components/headlines.vue';
export { default as NavButton } from './components/nav-button.vue';
export { default as NavLink } from './components/nav-link.vue';
export { default as Text } from './components/text.vue';

