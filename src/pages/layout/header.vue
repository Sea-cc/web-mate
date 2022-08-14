<template>
    <div class="layout-header">
        <div class="login" v-if="layoutType != 'lt'">
            <i-svg icon="#el-icon-bird" />
            <h3>MAIN</h3>
        </div>
    </div>
</template>
<script lang="ts" setup>
import layTheme from './theme.vue'
import { reactive, ref, defineProps, defineEmits, getCurrentInstance, onMounted, inject } from 'vue'
const layoutType = inject('layout')
</script>
<style lang="scss" scoped>
.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    .login {
        font-size: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--el-fill-color);
        h3 {
            margin-left: 8px;
        }
    }
}
</style>
