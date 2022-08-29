<template>
    <div>
        <menus :show="isShow">
            <menu-item command="a">问题和问题很难</menu-item>
            <menu-item command="b">新增</menu-item>
            <menu-item command="c">修改</menu-item>
            <menu-item command="d">批量删除</menu-item>
        </menus>
    </div>
</template>

<script setup lang="ts">
import menus from './menus.vue'
import menuItem from './menu-item.vue'
import { ref, reactive, toRefs, defineProps, onBeforeMount, onMounted, computed } from 'vue'
const isShow = ref(false)
const handle = () => {
    isShow.value = !isShow.value
}
const data = reactive({})
const prop = defineProps<{
    show: boolean
}>()
</script>
<style scoped lang="scss"></style>
