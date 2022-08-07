<template>
    <!-- <i-svg icon="#el-icon-a-110" /> -->
    <el-menu
        default-active="2"
        class="el-menu-vertical"
        :collapse="!isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
    <!-- 扩展布局插槽 -->
    <div class="aside-extend">
        <slot name="aside-extend"></slot>
    </div>
    <div class="menu-switch">
        {{ isCollapse ? '📦' : '' }}
        <el-switch
            v-model="isCollapse"
            inline-prompt
            active-icon="el-icon-a-97"
            inactive-icon="el-icon-a-97"
        />
        {{ isCollapse ? '🕸️' : '' }}
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(true)
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
}
.el-menu {
    border: none;
    .el-menu--collapse {
        min-height: 100%;
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
</style>
