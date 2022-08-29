<template>
    <div>
        <data-page :option="option" :getTableData="getTableData">
            <template #table-operation="{ table }">
                <el-button type="primary" size="small" @click="onChange(table.row)">修改</el-button>
                <el-button type="danger" size="small" @click="onDelete(table.row._id)"
                    >删除</el-button
                >
            </template>
        </data-page>
        <el-drawer
            size="80%"
            v-model="drawerSwitch"
            title="修改角色信息"
            custom-class="drawer-bg"
            @submit.prevent="onSubmit"
        >
            <!-- <el-card shadow="hover"> -->
            <data-form :formItems="option.table.columns">
                <template #default>
                    <el-input
                        v-model="drawerSwitch"
                        placeholder=""
                        size="normal"
                        clearable
                    ></el-input>
                </template>
                <template #name>
                    <el-switch v-model="drawerSwitch" :active-value="true" :inactive-value="false">
                    </el-switch>
                </template>
            </data-form>
            <!-- </el-card> -->
            <template #footer>
                <div style="flex: 1">
                    <el-button @click="drawerSwitch = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, defineProps, defineEmits, computed, watch, provide, inject } from 'vue'
import DataPage from '@/components/dataPage.vue'
import dataForme from '@/components/dataForm.vue.vue'
import { getRolesList, deleteRole } from '@/api'
const drawerSwitch = ref(false)
// 删除角色
const add = (id: number) => {
    console.log(id)
}
const option = reactive({
    search: {
        spans: { xs: 12, sm: 12, md: 6, lg: 8, xl: 8 },
        items: [
            {
                prop: 'name',
                label: '姓名'
            },
            {
                prop: 'description',
                label: '描述'
            },
            {
                prop: 'address',
                label: '地址'
            }
        ]
    },
    button: {
        size: 'small',
        btns: [
            {
                type: 'primary',
                text: '添加',
                event: add
            }
        ]
    },
    table: {
        // 开启表格操作插槽
        operation: true,
        columns: [
            {
                prop: 'name',
                label: '角色名称'
            },
            {
                prop: 'description',
                label: '描述'
            },
            {
                prop: 'menus',
                label: '菜单'
            },
            {
                prop: 'state',
                label: '状态'
            },
            {
                prop: 'createTime',
                label: '创建时间'
            },
            {
                prop: 'updateTime',
                label: '更新时间'
            }
        ]
    }
})
// 初始化表格数据,作为属性注入到dataPage组件中
const getTableData = () => {
    return getRolesList().then(({ data }) => {
        return { tabelData: data, total: data.length }
    })
}
const formModel: IFormModel = reactive({
    name: '',
    description: '',
    menus: [],
    state: true
})
// 删除角色
const onDelete = (id: number) => {
    deleteRole(id).then((data) => {
        console.log(data)
    })
}

interface IFormModel {
    name: string
    description: string
    menus: string[]
    state: boolean
}
// 打开drawer
const onChange = (row: IFormModel) => {
    drawerSwitch.value = true
    console.log(row)
}
// 提交
const onSubmit = () => {
    console.log(formModel, 'ssssssssssss')
}
</script>

<style lang="scss" scoped></style>

function data(data: any) { throw new Error('Function not implemented.') }
