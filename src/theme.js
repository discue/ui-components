import { computed, ref } from 'vue'

// add only computed properties here to allow for reactivity
const DEFAULT_BORDER_WIDTH = ref('border-2')

const TOOL_COLOR = ref('gray')
const TOOL_COLOR_LIGHT_VARIANT = ref('500')
const TOOL_COLOR_VARIANT = ref('800')

const PRIMARY_COLOR = ref('primary')
const PRIMARY_COLOR_LIGHT_VARIANT = ref('500')
const PRIMARY_COLOR_VARIANT = ref('800')

const ATTENTION_COLOR = ref('attention')
const ATTENTION_COLOR_VARIANT = ref('800')

const TEXT_COLOR = ref('gray')
const TEXT_COLOR_VARIANT = ref('900')

const TEXT_SIZE_VARIANT = ref('md')
const TEXT_SIZE_SMALL_VARIANT = ref('sm')
const TEXT_SIZE_LARGE_VARIANT = ref('lg')

const theme = {
    formElement: {
        borderSize: {
            'default': ref('border-2')
        },
        borderColor: {
            'default': computed(() => `border-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
            'active': computed(() => `border-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`),
            'attention': computed(() => `border-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`)
        },
        borderRingSize: {
            'default': ref('hover:ring-2')
        },
        borderRingColor: {
            'default': computed(() => `hover:ring-${PRIMARY_COLOR.value}-${PRIMARY_COLOR_VARIANT.value}`)
        }
    },
    formElementLabel: {
        size: {
            'default': ref('text-md')
        },
        color: {
            'default': computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`),
            'attention': computed(() => `text-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`)
        },
        background: {
            'default': ref('bg-white')
        },
        weight: {
            'default': ref('font-bold')
        }
    },
    formElementHint: {
        size: {
            'default': ref('text-xs')
        },
        color: {
            'default': computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
        },
        weight: {
            'default': ref('font-medium')
        }
    },
    formElementError: {
        size: {
            'default': ref('text-xs')
        },
        color: {
            'default': computed(() => `text-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'hint': computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`)
        },
        weight: {
            'default': ref('font-medium')
        }
    },
    text: {
        size: {
            'default': ref('text-md'),
            'small': ref('text-sm'),
            'large': ref('text-lg'),
        },
        color: {
            'default': computed(() => `text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`),
            'light': computed('text-gray-100'),
            'highlight': computed(() => `text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`)
        },
        weight: {
            'default': computed(() => 'font-base'),
            'highlight': computed(() => 'font-medium'),
        }
    },
    formElementInput: {
        textSize: {
            default: ref('text-lg')
        },
        caretColor: {
            default: computed(() => `caret-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`)
        },
        textColor: {
            default: computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`)
        },
        backgroundColor: {
            default: ref('bg-white')
        },
        placeholderColor: {
            default: computed(() => `placeholder:text-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`)
        }
    },
    formElementSelect: {
        textSize: {
            default: ref('text-lg')
        },
        fontWeight: {
            'default': ref('font-medium'),
        },
        textColor: {
            default: computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`)
        },
    },
    formElementRadio: {
        textColor: {
            default: computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`),
            disabled: computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`)
        }
    },
    button: {
        background: {
            'default': computed(() => `bg-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`),
            'attention': computed(() => `bg-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'secondary': computed(() => `bg-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
            'inherit': ref('bg-inherit')
        },
        borderColor: {
            'default': ref(),
            'secondary': computed(() => `hover:border-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
            'attention': computed(() => `hover:border-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'inverted': computed(() => `hover:border-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`)
        },
        color: {
            'default': computed(() => `text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`),
            'attention': computed(() => `text-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'secondary': computed(() => `text-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
            'light': ref('text-gray-100'),
            'highlight': computed(() => `text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`),
            'inherit': ref('text-inherit'),
        },
        size: {
            'default': ref('text-xl'),
            'small': ref('text-md')
        },
        weight: {
            'default': ref('font-bold')
        }
    },
    link: {
        size: {
            'default': ref('text-xl'),
            'small': ref('text-md'),
            'large': ref('text-2xl'),
        },
        color: {
            'default': ref(`text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`),
            'attention': ref(`text-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'secondary': ref(`text-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
            'light': ref('text-gray-100'),
            'highlight': ref(`text-${TEXT_COLOR.value}-${TEXT_COLOR_VARIANT.value}`),
            'inherit': ref('text-inherit'),
        },
        border: {
            'default': ref(`hover:border-${TOOL_COLOR.value}-${TOOL_COLOR_VARIANT.value}`),
            'attention': ref(`hover:border-${ATTENTION_COLOR.value}-${ATTENTION_COLOR_VARIANT.value}`),
            'secondary': ref(`hover:border-${TOOL_COLOR.value}-${TOOL_COLOR_LIGHT_VARIANT.value}`),
        },
        weight: {
            'default': ref('font-bold')
        }
    }
}

// export all theme keys here to allow easier integration into client applications.
export * from './theme-keys.js'

/**
 * Get a live reference for a specific property. Property names are expected to be valid strings like e.g `text.color.default`.
 * 
 * @param {String} key 
 * @returns {import('vue').ComputedRef}
 */
function getRef(key) {
    const path = key.split('.')
    return path.reduce((context, next) => { return context[next] }, theme)
}

/**
 * Update a theme property. Property names are expected to be valid strings like e.g `text.color.default`.
 *
 * @param {String} key property key
 * @param {String} stringValue property value
 * @returns void
 */
export const update = function (key, stringValue) {
    const ref = getRef(key)
    if (!ref) {
        throw new Error(`Could not find a theme property with key ${key}. Does property exist?`)
    }
    ref.value = stringValue
}

/**
 * Vue plugin installation function. Will update all property keys of the themeOverride.
 * 
 * @protected
 * @param {import('vue').App} _app 
 * @param {object} [themeOverride=undefined] a flat object containing property names and values 
 */
export const install = function (_app, themeOverride) {
    if (!themeOverride) {
        return
    }
    Object.entries(themeOverride).forEach(([key, value]) => {
        update(key, value)
    })
}

/**
 * Get a theme property reference. Property names are expected to be valid strings like e.g `text.color.default`.
 *  
 * @param {String} key 
 * @returns {import('vue').ComputedRef}
 */
export const getThemeProperty = function (key) {
    return getRef(key)
}

/**
 * Get the whole theme object mainly for internal testing. 
 * 
 * @private
 */
export const getTheme = function () {
    return theme
}