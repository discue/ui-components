<template>
    <div :id="id"
         class="component-preview bg-stone-300 dark:bg-gray-800 shadow-inner rounded-lg my-4 py-4 flex flex-col justify-center items-center w-full">
        <Component :is="type"
                   v-bind="componentProps"
                   v-model="modelValue">
            <template v-for="(index, slotName) in $slots"
                      #[slotName]>
                <slot :name="slotName" />
            </template>
        </Component>
    </div>

    <div v-if="attachVModel"
         class="component-properties-model-value">
        <Text>
            Component Value: <Text :highlight="true">
                {{ modelValue }}
            </Text>
        </Text>
    </div>

    <div v-if="showProperties"
         class="component-properties-preview">
        <h3 class="text-xl font-medium inline-block">
            Properties
        </h3>

        <div class="">
            <div class="grid grid-cols-4 pb-4 pl-4 rounded-t-lg border-b-2 border-stone-300">
                <div>
                    <Text class="uppercase"
                          :highlight="true"
                          :small="true">
                        Name
                    </Text>
                </div>
                <div>
                    <Text class="uppercase"
                          :highlight="true"
                          :small="true">
                        Type
                    </Text>
                </div>
                <div>
                    <Text class="uppercase"
                          :highlight="true"
                          :small="true">
                        Default
                    </Text>
                </div>
                <div>
                    <Text class="uppercase"
                          :highlight="true"
                          :small="true">
                        Value
                    </Text>
                </div>
            </div>

            <div v-for="(prop) in targetPropsForTable"
                 :key="prop.name"
                 class="grid grid-cols-4 border-b-2 border-stone-300 border-solid py-4 pl-4">
                <div>
                    <Text class=""
                          :small="false">
                        {{ prop.name }}
                    </Text>
                </div>
                <div>
                    <Text class=""
                          :small="false">
                        {{ prop.type }}
                    </Text>
                </div>
                <div>
                    <Text class=""
                          :small="false">
                        {{ prop.default }}
                    </Text>
                </div>
                <div>
                    <select v-if="prop.allowInput && prop.type === 'Boolean'"
                            class="w-24 text-lg"
                            :value="componentProps[prop.name]"
                            @input="castAndSet(prop, $event)">
                        <option class="w-24 text-lg">
                            true
                        </option>
                        <option class="w-24 text-lg">
                            false
                        </option>
                    </select>
                    <input v-else-if="prop.allowInput && prop.type === 'Array'"
                           class="text-base border-b-2 border-b-solid border-gray-900 w-20"
                           :value="JSON.stringify(componentProps[prop.name])"
                           @input="castAndSet(prop, $event)">
                    <input v-else-if="prop.allowInput"
                           class="text-base border-b-2 border-b-solid border-gray-900 w-20"
                           :value="componentProps[prop.name]"
                           @input="castAndSet(prop, $event)">
                </div>
            </div>
        </div>
    </div>

    <div v-if="emitsEvents && showEvents"
         class="component-emits-preview">
        <h3 class="text-xl font-medium inline-block">
            Emits
        </h3>
        <div class="">
            <div class="grid grid-cols-4 pb-4 pl-4 rounded-t-lg border-b-2 border-stone-300">
                <div>
                    <Text class="uppercase"
                          :highlight="true"
                          :small="true">
                        Event
                    </Text>
                </div>
            </div>

            <div v-for="(prop) in targetEmitsForTable"
                 :key="prop"
                 class="grid grid-cols-4 border-b-2 border-stone-300 border-solid py-4 pl-4">
                <div>
                    <Text class=""
                          :small="false">
                        {{ prop }}
                    </Text>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, ref, useAttrs } from 'vue';
import Text from '../text.vue';

const attrs = useAttrs()

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    showProperties: {
        type: Boolean,
        default: true
    },
    showEvents: {
        type: Boolean,
        default: true
    },
    initialValue: {
        type: String
    },
    attachVModel: {
        type: Boolean,
        default: false
    }
})

// we don't care about losing reactivity here
// we also don't report value updates to the parent component

const modelValue = ref(props.initialValue)

const id = computed(() => {
    return props.type.toLocaleLowerCase() + '-preview'
})

const definedComponentProps = computed(() => {
    const instance = getCurrentInstance()
    return instance.appContext.components[props.type].props
})

function getValue(key, attrs, defaultValue) {
    if (attrs[key] != null) {
        return attrs[key]
    } else {
        return defaultValue
    }
}

const componentProps = computed(() => {
    const p = Object.entries(definedComponentProps.value).reduce((context, [key, value]) => {
        context[key] = getValue(key, attrs, value.default)
        return context
    }, {})
    if (definedComponentProps.value.name) {
        p.name = getValue('name', props, definedComponentProps.value.name.default, true)
    }
    return reactive(p)
})

const targetPropsForTable = computed(() => {
    let componentProps = definedComponentProps.value
    if (!componentProps) {
        componentProps = {}
    }

    return Object.entries(componentProps).sort(([a], [b]) => a.localeCompare(b))
        .reduce((context, [key, value], index) => {
            if (value.__hideInPreview) {
                return context
            }
            return Object.assign(context, reactive({
                [key]: {
                    name: key,
                    type: value.type?.prototype.constructor.name || 'unknown',
                    allowInput: value.type?.prototype.constructor.name !== 'Function' || false,
                    'default': value.default,
                    index
                }
            }))
        }, {})
})

const targetEmitsForTable = computed(() => {
    const instance = getCurrentInstance()
    return instance.appContext.components[props.type].emits
})

const emitsEvents = computed(() => {
    return targetEmitsForTable.value?.length > 0
})

function castAndSet(prop, event) {
    const { value } = event.target

    if (prop.type === 'Boolean') {
        if (value === 'false') {
            componentProps.value[prop.name] = false
        } else {
            componentProps.value[prop.name] = Boolean(value)
        }
    } else if (prop.type === 'Array') {
        componentProps.value[prop.name] = JSON.parse(value)
    } else if (prop.type === 'Number') {
        componentProps.value[prop.name] = Number(value)
    } else {
        componentProps.value[prop.name] = value
    }
}

</script>