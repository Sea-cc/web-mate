<template>
    <div v-show="show" v-command="aa" class="menus" @click="handelClick($event)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    defineProps,
    toRefs,
    onBeforeMount,
    onMounted,
    defineEmits,
    useSlots,
    watchEffect,
    computed
} from 'vue'
const data = reactive({})
const emit = defineEmits(['command'])
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: '200px'
    }
})
const handelClick = (e) => {
    if (e.target.className == 'menus') {
        // emit.command('hide')
    }
}
// 在模板中启用 v-focus
const vCommand = {
    created(el, binding, vnode, prevVnode) {
        // 下面会介绍各个参数的细节
        console.log(el, binding, vnode, prevVnode)
    },
    mounted: (el, binding) => {
        console.log(el)
        console.log(binding)
    }
}
emit('command', {
    type: 'show',
    value: false
})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
::v-deep.menus {
    width: 120px;
    height: auto;
    padding: 3px 6px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
    .menu-item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 3px 0;
        padding: 3px 5px;
        border-radius: 5px;
        transition: all 0.5s;
        color: #5c6370;
        &:hover {
            background-color: #dadcde;
        }
    }
}
</style>
