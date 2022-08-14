<template>
    <el-pagination
        v-bind="$attrs"
        :page-sizes="[10, 25, 50, 100, 200]"
        background
        layout="total, sizes, prev, pager, next, jumper"
    />
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, computed, watch, provide } from 'vue'

// const handleSizeChange = (val: number) => {
//     console.log(`${val} items per page`)
// }
// const handleCurrentChange = (val: number) => {
//     console.log(`current page: ${val}`)
// }
</script>
<style lang="scss" scoped>
.el-pagination {
    margin-top: 10px;
    float: right;
    ::v-deep.is-background .btn-next,
    ::v-deep.is-background .btn-prev,
    ::v-deep.is-background .el-pager li {
        border-radius: 5px;
        background-color: #ffffff;
    }
}
</style>
