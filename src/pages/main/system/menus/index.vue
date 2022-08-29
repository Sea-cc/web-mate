<template>
    <div>
        <el-tree
            :data="treeData"
            show-checkbox
            node-key="name"
            draggable
            :default-expanded-keys="[1]"
            :props="props"
            :indent="treeIndent"
            ><template v-slot:default="{ node }">
                <element-tree-line :node="node" :showLabelLine="true" :indent="treeIndent">
                    <template v-slot:node-label>
                        <span style="font-size: 14px">
                            {{ node.label }}
                        </span>
                    </template>
                    <template v-slot:after-node-label>
                        <el-button type="primary" size="small" @click="addMenus(node)"
                            >添加子菜单</el-button
                        >
                        <el-button type="info" size="small" @click="updateMenus">修改</el-button>
                        <el-button type="danger" size="small" @click="deleteMenus">删除</el-button>
                    </template>
                </element-tree-line>
            </template> </el-tree
        ><el-drawer size="80%" v-model="drawerSwitch" title="修改角色信息" custom-class="drawer-bg">
            <!-- <el-card shadow="hover"> -->
            <data-form :formItems="formItems">
                <template #default="{ formItem }">
                    <el-input
                        v-model="currentNode[formItem.prop]"
                        placeholder=""
                        clearable
                    ></el-input>
                </template>
            </data-form>
            <!-- </el-card> -->
            <template #footer>
                <div style="flex: 1">
                    <!-- <el-button @click="drawerSwitch = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">提交</el-button> -->
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts">
import { getElementLabelLine } from 'element-tree-line'
import 'element-tree-line/dist/style.css'
import { getMenuList } from '@/api'
import { onMounted, ref, defineComponent, h, reactive } from 'vue'
export default defineComponent({
    components: { ElementTreeLine: getElementLabelLine(h) },
    setup() {
        const treeData = ref([])
        let currentNode = ref({})
        onMounted(() => {
            getMenuList().then((res) => {
                treeData.value = res.data
            })
        })
        const drawerSwitch = ref(false)
        const addMenus = (row: any) => {
            drawerSwitch.value = true
            currentNode.value = row
        }
        const deleteMenus = (row: any) => {
            drawerSwitch.value = true
            currentNode.value = row
        }
        const updateMenus = (row: any) => {
            drawerSwitch.value = true
            currentNode.value = row
        }
        const formItems = [
            {
                prop: 'name',
                label: '菜单名称'
            },
            {
                prop: 'description',
                label: '菜单描述'
            },
            {
                prop: 'url',
                label: '菜单url'
            },
            {
                prop: 'icon',
                label: '菜单图标'
            },
            {
                prop: 'sort',
                label: '排序'
            },
            {
                prop: 'status',
                label: '状态'
            }
        ]
        return {
            treeData,
            currentNode,
            formItems,
            addMenus,
            updateMenus,
            deleteMenus,
            drawerSwitch,
            treeIndent: 40,
            props: ref({
                id: '_id',
                label: 'name',
                children: 'children'
            })
        }
    }
})
</script>
<style>
.el-tree-node__content {
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
