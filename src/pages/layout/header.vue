<template>
    <div class="layout-header">
        <div class="login" v-if="layoutType != 'lt'">
            <i-svg icon="#el-icon-bird" />
            <h3>MAIN</h3>
        </div>
        <div class="header-outerr">
            <!-- 面包屑 -->
            <div class="header-breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <span>首页</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <span>系统管理</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <span>菜单管理</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 系统维护 -->
            <div class="header-system">
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <!-- 用户头像信息 -->
                        <div class="user-info">
                            <img :src="userInfo.avatar" alt="" />
                            <span>{{ userInfo.name }}</span>
                        </div>
                        <i-svg icon="#el-icon-zhankai" />
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                            <el-dropdown-item disabled>Action 4</el-dropdown-item>
                            <el-dropdown-item divided>Action 5</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, getCurrentInstance, onMounted, inject } from 'vue'
import { authStore } from '@/store/auth/auth'
import { storeToRefs } from 'pinia'
const layoutType = inject('layout')
const store = authStore()
// const userInfo = store.userInfo
const { userInfo } = storeToRefs(store)
</script>
<style lang="scss" scoped>
.layout-header {
    display: flex;
    height: 100%;
    align-items: center;
    color: var(--el-fill-color);
    .login {
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
            margin: 0 18px 0 10px;
        }
    }
    .header-outerr {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: var(--el-color-white);
        .user-info {
            display: flex;
            align-items: center;
            img {
                margin-right: 3px;
                width: 35%;
                border-radius: 50%;
                border: red 1px solid;
            }
            margin-right: 12px;
        }
    }
}
::v-deep.el-breadcrumb {
    .el-breadcrumb__item {
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        .el-breadcrumb__inner {
            display: flex;
            align-items: center;
            color: var(--el-color-white);
        }
    }
}
</style>
