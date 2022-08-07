<template>
    <el-container v-if="layout === 'default'">
        <el-header :style="height"><header-content /></el-header>
        <el-container>
            <el-aside :style="height" width="auto">
                <aside-content />
            </el-aside>
            <el-main>{{ layout }}</el-main>
        </el-container>
    </el-container>
    <el-container v-else-if="layout === 'tb'">
        <el-header :style="height"><header-content /></el-header>
        <el-main>{{ layout }}</el-main>
    </el-container>
    <el-container v-else-if="layout === 'lt'">
        <el-aside :style="height" width="auto">
            <aside-content />
        </el-aside>
        <el-container>
            <el-header :style="height"><header-content /></el-header>
            <el-main>{{ layout }}</el-main>
        </el-container>
    </el-container>
    <el-container v-else>
        <div class="theme-ll"><layTheme /></div>
        <el-aside :style="height" width="auto">
            <aside-content>
                <!-- <template #aside-extend></template> -->
            </aside-content>
        </el-aside>
        <el-main>{{ layout }}</el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, computed, watch } from 'vue'
import headerContent from './layout/header.vue'
import asideContent from './layout/aside.vue'
import mainContent from './layout/main.vue'
import layTheme from './layout/theme.vue'
import { themeStore } from '@/store/theme'
const store = themeStore()
const layout = computed(() => store.layoutType)
const headColor_ = computed(() => store.colors.headColor)
watch(headColor_, (newVal) => {
    height['--headColor'] = newVal
})
const height = reactive({
    '--headColor': computed(() => store.colors.headColor).value,
    '--headheight': '60px'
})
watch(
    layout,
    (newVal) => {
        if (['ll', 'lt'].includes(newVal)) {
            height['--headheight'] = '0px'
            return
        }
        height['--headheight'] = '60px'
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss">
.el-header {
    background-color: var(--headColor);
    position: relative;
    z-index: 999;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 5%);
    color: #333;
}

.el-aside {
    color: #333;
    text-align: center;
    height: calc(100vh - var(--headheight));
    position: relative;
    transition: width 0.25s;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.theme-ll {
    position: fixed;
    right: -50px;
    bottom: 20px;
    width: 60px;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    border-radius: 8px;
    z-index: 1000;
    background-color: var(--el-color-primary);
    transition: all 0.6s;
    &:hover {
        right: -25px;
    }
}
</style>
