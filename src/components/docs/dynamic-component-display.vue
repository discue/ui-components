<template>
    <div :id="id" class="component-preview shadow-inner rounded-lg my-4 py-4 flex justify-center items-center w-full">
        <Component :is="type" v-bind="componentProps">
            <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name" />
            </template>
        </Component>
    </div>

    <div class="component-properties-preview">
        <h3 class="text-xl font-medium inline-block">
            Properties
        </h3>
        <div class="space-y-4">
            <div class="grid grid-cols-4">
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
                    <select v-if="prop.allowInput && prop.type === 'Boolean'" :value="componentProps[prop.name]"
                        @input="castAndSet(prop, $event)" class="w-24 text-lg">
                        <option class="w-24 text-lg">true</option>
                        <option class="w-24 text-lg">false</option>
                    </select>
                    <input v-else-if="prop.allowInput" :value="componentProps[prop.name]"
                        @input="castAndSet(prop, $event)"
                        class="text-base border-b-2 border-b-solid border-gray-900 w-20">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, useAttrs } from 'vue';

const attrs = useAttrs()

const props = defineProps({
    type: {
        type: String
    },
    name: {
        type: String
    }
})

const id = computed(() => {
    return props.type.toLocaleLowerCase() + '-preview'
})

const componentProps = computed(() => {
    const instance = getCurrentInstance()
    const p = Object.entries(instance.appContext.components[props.type].props).reduce((context, [key, value]) => {
        if (attrs[key]) {
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

    const p = Object.entries(instance.appContext.components[props.type].props).reduce((context, [key, value]) => {
        return Object.assign(context, reactive({
            [key]: {
                name: key,
                type: value.type.prototype.constructor.name,
                allowInput: value.type.prototype.constructor.name !== 'Function',
                'default': value.default
            }
        }))
    }, {})

    return p
})

function castAndSet(prop, event) {
    const { value } = event.target

    if (prop.type === 'Boolean') {
        if (value === 'false') {
            componentProps.value[prop.name] = false
        } else {
            componentProps.value[prop.name] = Boolean(value)
        }
    } else if (prop.type === 'Number') {
        componentProps.value[prop.name] = Number(value)
    } else {
        componentProps.value[prop.name] = value
    }
}

</script>