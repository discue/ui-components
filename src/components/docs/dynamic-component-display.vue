<template>
    <div class="component-preview shadow-inner rounded-lg my-4 py-4 flex justify-center items-center w-full">
        <Component :is="type" v-bind="componentProps">
            <slot />
        </Component>
    </div>

    <div class="component-properties-preview">
        <h3 class="text-xl font-medium inline-block">
            Properties
        </h3>
        <div class="grid grid-cols-4 mb-4">
            <div>
                <Text :highlight="true" :small="true" class="uppercase">Name</Text>
            </div>
            <div>
                <Text :highlight="true" :small="true" class="uppercase">Type</Text>
            </div>
            <div>
                <Text :highlight="true" :small="true" class="uppercase">Default</Text>
            </div>
            <div>
                <Text :highlight="true" :small="true" class="uppercase">Value</Text>
            </div>
        </div>

        <div class="grid grid-cols-4" v-for="prop in targetPropsForTable" :key="prop.name">
            <div>
                <Text :small="false" class="">{{ prop.name }}</Text>
            </div>
            <div>
                <Text :small="false" class="">{{ prop.type }}</Text>
            </div>
            <div>
                <Text :small="false" class="">{{ prop.default }}</Text>
            </div>
            <div>
                <input :value="componentProps[prop.name]" @change="castAndSet(prop, $event)"
                    class="text-base border-b-2 border-b-solid border-gray-900 w-20">
            </div>
        </div>
    </div>
</template>

<script setup>
// import Text from '@/src/components/text.vue';
import { computed, getCurrentInstance, reactive, useAttrs } from 'vue';

const attrs = useAttrs()
console.log({ attrs })

const props = defineProps({
    type: {
        type: Object
    },
    name: {
        type: String
    }
})

const componentProps = computed(() => {
    const instance = getCurrentInstance()
    console.log('props', props)
    console.log('comps', instance.appContext.components)
    console.log('type', props.type, instance.appContext.components[props.type])
    console.log('type props', props.type, instance.appContext.components[props.type].props)

    const p = Object.entries(instance.appContext.components[props.type].props).reduce((context, [key, value]) => {
        context[key] = value.default
        return context
    }, {})

    return reactive(p)
})

const targetPropsForTable = computed(() => {
    const instance = getCurrentInstance()
    console.log('comps', instance.appContext.components)

    const p = Object.entries(instance.appContext.components[props.type].props).reduce((context, [key, value]) => {
        return Object.assign(context, reactive({
            [key]: {
                name: key,
                type: value.type.prototype.constructor.name,
                'default': value.default
            }
        }))
    }, {})

    console.log('table', p)

    return p
})

function castAndSet(prop, event) {
    const { value } = event.target
    console.log('before', value, prop.type, componentProps)

    if (prop.type === 'Boolean') {
        if (value === 'false') {
            componentProps.value[prop.name] = false
        } else {
            componentProps.value[prop.name] = Boolean(value)
        }
    } else {
        componentProps[prop.name] = value
    }
}

</script>