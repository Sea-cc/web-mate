<template>
    <el-menu class="el-menu-vertical" :default-active="defaultRoute" :collapse="!isCollapse" router>
        <!-- logo -->
        <div class="logon" v-if="layoutType == 'lt' || layoutType == 'll'">
            <i-svg icon="#el-icon-bird" />
            <h4 v-if="isCollapse">Transition</h4>
        </div>
        <template v-for="{ _id, name, icon, url, children } in menus" :key="_id">
            <el-sub-menu v-if="children" :index="url">
                <template #title>
                    <i-svg :icon="`#${icon}`" />
                    <span>{{ name }}</span>
                </template>
                <template v-for="item in children" :key="item._id">
                    <el-menu-item :index="item.url">
                        <i-svg :icon="`#${item.icon}`" />
                        <template #title>{{ item.name }}</template>
                    </el-menu-item>
                </template>
            </el-sub-menu>
            <el-menu-item v-else :index="url">
                <i-svg :icon="`#${icon}`" />
                <template #title>{{ name }}</template>
            </el-menu-item>
        </template>
    </el-menu>
    <!-- 扩展布局插槽 -->
    <div class="aside-extend">
        <slot name="aside-extend"></slot>
    </div>
    <div class="menu-switch">
        <el-switch
            v-model="isCollapse"
            inline-prompt
            active-icon="el-icon-a-97"
            inactive-icon="el-icon-a-97"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const defaultRoute = computed(() => {
    return route.path
})
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    ArrowLeftBold,
    ArrowRightBold
} from '@element-plus/icons-vue'
import { themeStore } from '@/store/theme'
import { authStore } from '@/store/auth/auth'
const isCollapse = ref(true)
const themestore = themeStore()
const atthstore = authStore()
const layoutType = computed(() => themestore.layoutType)
const menus = computed(() => atthstore.userMenus)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
<style lang="scss">
@mixin position {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;

    transform: translate(-50%, 0);
    width: 90%;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
    .el-menu-item .icon,
    .el-sub-menu .icon {
        margin-right: 13px;
    }
}
.el-menu {
    border: none;
    padding: 5px 0;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    .el-menu--collapse {
        min-height: 100%;
        overflow: visible;
    }

    .el-menu-item.is-active {
        background-color: var(--el-color-primary-light-7);
        font-weight: 600;
    }
}
.menu-switch {
    @include position;
    background-color: #ebedf2;
    bottom: 6px;
    border-radius: 6px;
    overflow: hidden;
}
.aside-extend {
    @include position;
    bottom: 32px;
}
.logon {
    text-align: center;
    font-size: 25px;
    background-color: var(--el-color-primary-light-7);
    padding: 6px 5px;
    border-radius: 7px;
    margin: 0 10px;
}
</style>
