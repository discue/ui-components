<template>
    <div :id="id"
         class="component-preview bg-stone-300 dark:bg-gray-800 shadow-inner rounded-lg my-4 py-4 flex flex-col justify-center items-center w-full">
        <Component :is="type"
                   v-bind="componentProps"
                   v-model="modelValue">
            <template v-for="(index, name) in $slots"
                      #[name]>
                <slot :name="name" />
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
                    <Text :highlight="true"
                          :small="true"
                          class="uppercase">
                        Name
                    </Text>
                </div>
                <div>
                    <Text :highlight="true"
                          :small="true"
                          class="uppercase">
                        Type
                    </Text>
                </div>
                <div>
                    <Text :highlight="true"
                          :small="true"
                          class="uppercase">
                        Default
                    </Text>
                </div>
                <div>
                    <Text :highlight="true"
                          :small="true"
                          class="uppercase">
                        Value
                    </Text>
                </div>
            </div>

            <div v-for="(prop) in targetPropsForTable"
                 :key="prop.name"
                 class="grid grid-cols-4 border-b-2 border-stone-300 border-solid py-4 pl-4">
                <div>
                    <Text :small="false"
                          class="">
                        {{ prop.name }}
                    </Text>
                </div>
                <div>
                    <Text :small="false"
                          class="">
                        {{ prop.type }}
                    </Text>
                </div>
                <div>
                    <Text :small="false"
                          class="">
                        {{ prop.default }}
                    </Text>
                </div>
                <div>
                    <select v-if="prop.allowInput && prop.type === 'Boolean'"
                            :value="componentProps[prop.name]"
                            class="w-24 text-lg"
                            @input="castAndSet(prop, $event)">
                        <option class="w-24 text-lg">
                            true
                        </option>
                        <option class="w-24 text-lg">
                            false
                        </option>
                    </select>
                    <input v-else-if="prop.allowInput && prop.type === 'Array'"
                           :value="JSON.stringify(componentProps[prop.name])"
                           class="text-base border-b-2 border-b-solid border-gray-900 w-20"
                           @input="castAndSet(prop, $event)">
                    <input v-else-if="prop.allowInput"
                           :value="componentProps[prop.name]"
                           class="text-base border-b-2 border-b-solid border-gray-900 w-20"
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
                    <Text :highlight="true"
                          :small="true"
                          class="uppercase">
                        Event
                    </Text>
                </div>
            </div>

            <div v-for="(prop) in targetEmitsForTable"
                 :key="prop"
                 class="grid grid-cols-4 border-b-2 border-stone-300 border-solid py-4 pl-4">
                <div>
                    <Text :small="false"
                          class="">
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
        type: String
    },
    name: {
        type: String
    },
    showProperties: {
        type: Boolean,
        default: true
    },
    showEvents: {
        type: Boolean,
        default: true
    },
    initialValue: {},
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

const componentProps = computed(() => {
    const instance = getCurrentInstance()
    const p = Object.entries(instance.appContext.components[props.type].props).reduce((context, [key, value]) => {
        if (attrs[key] != null) {
            context[key] = attrs[key]
        } else {
            context[key] = value.default
        }
        return context
    }, {})
    return reactive(p)
})

const targetPropsForTable = computed(() => {
    const instance = getCurrentInstance()

    let componentProps = instance.appContext.components[props.type].props
    if (!componentProps) {
        componentProps = {}
    }

    return Object.entries(componentProps).reduce((context, [key, value], index) => {
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