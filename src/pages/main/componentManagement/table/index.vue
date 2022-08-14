<template>
    <el-form :model="searchModel">
        <el-row :gutter="12">
            <el-col
                v-bind="option.search.spans"
                v-for="(item, index) in option.search.columns"
                :key="index"
            >
                <el-form-item v-bind="item">
                    <slot
                        :name="`search-form-${item.prop}`"
                        :searchModel="searchModel"
                        :prop="item.prop"
                    >
                        <el-input v-model="searchModel[item.prop]" placeholder="请输入搜索内容" />
                    </slot>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-row class="table-business-btn" justify="space-between">
        <!-- 表格功能按钮 -->
        <el-col :span="14">
            <el-button type="primary" :size="option.button.size" @click="handelQuery"
                >查询</el-button
            >
            <el-button type="info" :size="option.button.size" @click="reset">重置</el-button>
            <slot name="button">
                <template v-if="option.button">
                    <el-button
                        v-for="(item, index) in option.button.btns"
                        :key="index"
                        :icon="item.icon"
                        :type="item.type"
                        :size="option.button.size"
                        @click="item.event(item.type)"
                        >{{ item.text }}</el-button
                    >
                </template>
            </slot>
        </el-col>
        <el-col :span="10">
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </el-col>
    </el-row>
    <el-table highlight-current-row :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
    <pagination
        :total="800"
        @size-change="handelQuery"
        @current-change="handelQuery"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
    />
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, computed, watch, provide } from 'vue'
import pagination from './pagination.vue'
const props = defineProps({
    pageMap: {
        type: Array,
        default: () => ['currentPage', 'pageSize']
    }
})

const handleForm = (type: string) => {
    console.log('00000', type)
}
const option = reactive({
    search: {
        spans: { xs: 12, sm: 12, md: 8, lg: 8, xl: 12 },
        columns: [
            {
                prop: 'name',
                label: '姓名'
            },
            {
                prop: 'date',
                label: '日期'
            },
            {
                prop: 'address',
                label: '地址'
            }
        ]
    },
    button: {
        // size: 'small',
        btns: [
            {
                type: 'primary',
                text: '添加',
                event: handleForm,
                icon: ''
            },
            {
                type: 'success',
                text: '完成',
                event: handleForm
            }
        ]
    },
    table: {}
})

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
]

interface ISearchModel {
    [prop: string]: any
}
let searchModel: ISearchModel = reactive({})
// 重置
const reset = () => {
    Object.keys(searchModel).forEach((key: string) => {
        delete searchModel[key]
    })
    currentPage.value = 1
    pageSize.value = 10
}
// 监听查询表单变化
watch(
    () => searchModel,
    (newVal) => {
        handelQuery()
    },
    {
        deep: true
    }
)
// 分页逻辑
const currentPage = ref(1)
const pageSize = ref(10)
// 由开发者映射页码数字段名
const page = props.pageMap[0] as string
const rows = props.pageMap[1] as string
const handelQuery = () => {
    const body = {
        ...searchModel,
        [page]: currentPage.value,
        [rows]: pageSize.value
    }
    console.log(body)
}
</script>
<style lang="scss" scoped>
.table-business-btn {
    padding: 10px;
    .el-col {
        flex: none;
        align-self: center;
    }
}
.el-form-item {
    margin-bottom: 8px;
}
::v-deep.el-table {
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 7px;
    .el-table__body tr.current-row {
        position: relative;
    }
    .el-table__body tr.current-row::after {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 0;
        left: 0;
        width: 3px;
        z-index: 999;
        background-color: var(--el-color-primary);
    }
}
</style>
