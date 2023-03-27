import { ref } from 'vue'

// add only computed properties here to allow for reactivity
const theme = {
    formElement: {
        borderSize: {
            'default': ref('border-2')
        },
        borderColor: {
            'default': ref('border-gray-500'),
            'active': ref('border-gray-800'),
            'attention': ref('border-attention-800')
        },
        borderRingSize: {
            'default': ref('hover:ring-2')
        },
        borderRingColor: {
            'default': ref('hover:ring-primary-500')
        }
    },
    formElementLabel: {
        size: {
            'default': ref('text-md')
        },
        color: {
            'default': ref('text-gray-800'),
            'attention': ref('text-attention-800')
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
            'default': ref('text-gray-400')
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
            'default': ref('text-attention-800')
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
            'default': ref('text-gray-900'),
            'light': ref('text-gray-100'),
            'highlight': ref('text-gray-900'),
            'inherit': ref('text-inherit'),
        },
        weight: {
            'default': ref('font-base'),
            'highlight': ref('font-medium'),
        }
    },
    button: {
        background: {
            'default': ref('bg-gray-900'),
            'attention': ref('bg-attention-800'),
            'secondary': ref('bg-gray-500'),
            'inherit': ref('bg-inherit')
        },
        borderColor: {
            'default': ref(),
            'secondary': ref('hover:border-gray-500'),
            'attention': ref('hover:border-attention-800'),
            'inverted': ref('hover:border-gray-900')
        },
        color: {
            'default': ref('text-gray-900'),
            'attention': ref('text-attention-800'),
            'secondary': ref('text-gray-500'),
            'light': ref('text-gray-100'),
            'highlight': ref('text-gray-900'),
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
            'default': ref('text-gray-900'),
            'attention': ref('text-attention-800'),
            'secondary': ref('text-gray-500'),
            'light': ref('text-gray-100'),
            'highlight': ref('text-gray-900'),
            'inherit': ref('text-inherit'),
        },
        border: {
            'default': ref('hover:border-gray-900'),
            'attention': ref('hover:border-attention-500'),
            'secondary': ref('hover:border-gray-500'),
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