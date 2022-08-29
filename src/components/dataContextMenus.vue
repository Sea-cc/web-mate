<template>
    <Transition>
        <div v-show="show" class="menus" :style="{ ...position, width }">
            <slot></slot>
        </div>
    </Transition>
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
    computed
} from 'vue'
const data = reactive({})
// const emit = defineEmits(['command'])
const slot = useSlots().default?.()
const props = defineProps<{
    show: boolean
    width?: string
    position: { left: string; top: string }
}>()
</script>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

::v-deep.menus {
    width: 120px;
    height: auto;
    padding: 3px 6px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
    position: fixed;
    z-index: 999;
    div,
    li,
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 3px 0;
        padding: 3px 5px;
        border-radius: 5px;
        transition: all 0.5s;
        color: #6c757d;
        &:hover {
            background-color: #dadcde;
        }
    }
}
</style>
