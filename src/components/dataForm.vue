<template>
    <el-form inline label-position="right" label-width="95px" v-bind="$attrs">
        <el-row :gutter="10">
            <!-- 子项存在sapn则优先使用子项的布局 -->
            <el-col v-for="item in formItems" :key="item.prop" v-bind="item.span || spans">
                <el-form-item v-bind="item">
                    <slot :name="item.prop" :formItem="item">
                        <slot name="default" :formItem="item"></slot>
                    </slot>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from 'vue'
const props = defineProps({
    formItems: {
        type: Array,
        default: () => []
    },
    // 这里需要做类型检查优化
    spans: {
        type: Object,
        default: () => ({ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 })
    }
})
</script>
<style lang="scss" scoped>
.el-form-item {
    width: 100%;
}
</style>
