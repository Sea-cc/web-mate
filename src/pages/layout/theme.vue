<template>
    <i-svg class="theme-btn" icon="#el-icon-a-028-paintpalette" @click="drawer = true" />
    <el-drawer append-to-body v-model="drawer" :show-close="false" custom-class="drawer-bg">
        <template #header>
            <h3>系统主题配置</h3>
        </template>

        <el-card shadow="never">
            <el-divider> <h5>系统布局模式</h5> </el-divider>
            <div class="nav-row">
                <div
                    v-for="(item, index) in layout"
                    :key="index"
                    :class="['nav-item', `nav-item-${index}`]"
                    @click="setLayout(item)"
                ></div>
            </div>
            <el-divider> <h5>系统主题</h5> </el-divider>
            <el-color-picker
                :predefine="predefine"
                v-model="colors.themeColor"
                @active-change="setThemeColor('themeColor', $event)"
            />
            <el-divider> <h5>系统顶部背景色</h5> </el-divider>
            <div class="head-color-predefine">
                <el-color-picker
                    v-model="colors.headColor"
                    @active-change="setThemeColor('headColor', $event)"
                />
                <div
                    class="el-color-predefine__color"
                    v-for="(item, index) in predefine"
                    :key="index"
                    :style="`background-color: ${item}`"
                ></div>
            </div>
        </el-card>
        <el-button
            style="
                width: 80%;
                position: absolute;
                left: 50%;
                bottom: 0px;
                transform: translate(-50%, -50%);
            "
            type="primary"
            @click="drawer = false"
            >关闭</el-button
        >
    </el-drawer>
</template>
<script lang="ts" setup>
import { reactive, ref, onBeforeMount, computed, watch } from 'vue'
import { getsTheColorScale } from '@/utils'
import { themeStore } from '@/store/theme'
import { layoutItems, color } from '@/store/theme/types'
const drawer = ref(false)
const themecolor = computed(() => store.colors.themeColor)
const headColor = computed(() => store.colors.headColor)
onBeforeMount(() => {
    setColor(themecolor.value)
})
const layout = ['default', 'tb', 'lt', 'll']
const store = themeStore()
const colors = store.colors
function setLayout(layout: layoutItems) {
    store.changeLayout(layout)
    drawer.value = false
}
const predefine = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585']
function setThemeColor(changeType: keyof color, color: string) {
    colors[changeType] = color
    store.changeThemeColor(colors)
    if (changeType === 'themeColor') {
        setColor(color)
    }
}
function setColor(color: string) {
    const themeColor = getsTheColorScale({ primary: color })
    // 设置css 变量
    Object.keys(themeColor).map((item) => {
        document.documentElement.style.setProperty(item, themeColor[item])
    })
}
</script>
<style lang="scss" scoped>
$nav-bg-dark: #494545;
.theme-btn {
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        width: 30px;
        font-size: 22px;
    }
}
.nav-row {
    display: flex;
    margin-bottom: 60px;
    justify-content: space-around;
}
.nav-item {
    width: 20%;
    height: 55px;
    border-radius: 4px;
    background-color: #f0f2f5;
    position: relative;
    box-shadow: 0 0 2px rgba(20, 16, 16, 0.2);
    cursor: pointer;
    border: 2px solid #fff;

    &.nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 17px;
        background-color: $nav-bg-dark;
    }
    &.nav-item::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 12px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        background-color: #fff;
    }
    &.nav-item-1::before {
        z-index: 1;
    }
    &.nav-item-0::before,
    &.nav-item-2::before,
    &.nav-item-3::before {
        background-color: #fff;
    }
    &.nav-item-0::after,
    &.nav-item-1::after,
    &.nav-item-2::after {
        background-color: $nav-bg-dark;
        border-top-left-radius: inherit;
        border-bottom-right-radius: 0;
    }
    &.nav-item-1::before,
    &.nav-item-3::after {
        display: none;
    }
    &.nav-item-2::before {
        z-index: 1;
        width: 14px;
        box-shadow: 8px 0 0 #fff;
    }
}
.head-color-predefine {
    display: flex;
    align-items: center;
    .el-color-predefine__color {
        width: 22px;
        height: 24px;
        border-radius: 5px;
        margin-left: 12px;
    }
}
</style>
