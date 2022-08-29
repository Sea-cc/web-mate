<template>
    <el-tabs
        v-model="activeKey"
        type="card"
        :closable="tabList.length !== 1"
        @tab-click="handelClickTab"
        @tab-remove="handelRemove"
        @contextmenu.prevent="handelContextmenu($event)"
    >
        <el-tab-pane v-for="item in tabList" :key="item.url" :label="item.name" :name="item.url">
            {{ item.name }}
        </el-tab-pane>
    </el-tabs>
    <data-contextMenus :show="showMenu" :position="position" width="80px">
        <div @click="closeAllTabs">关闭所有</div>
        <div>刷新</div>
        <div @click="closeLeftTabs">关闭左边</div>
        <div @click="closeRightTabs">关闭右边</div>
        <div @click="closeOtherTabs">关闭其它</div>
    </data-contextMenus>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { tabsStore } from '@/store/tabs'
import { useRoute, useRouter } from 'vue-router'
import type { ITabs } from '@/store/tabs/types'
import dataContextMenus from './dataContextMenus.vue'
const store = tabsStore()
const route = useRoute()
const router = useRouter()
// 获取所有的tabs
const tabList = computed(() => {
    return store.tabs
})
// 获取当前激活的tab
const activeKey = ref('')
// 添加tab
const addTab = () => {
    const { path, meta } = route
    store.addTab({
        name: (meta.name as string) || '404',
        url: path
    })
}
watch(
    () => route.path,
    () => {
        activeKey.value = route.path
        addTab()
    },
    { immediate: true }
)

// 处理点击tab事件,路由跳转
const handelClickTab = (currData: any) => {
    router.push(currData.props.name)
}

// 处理点击tab删除,路由跳转后一个
const handelRemove = (url: any) => {
    const tabIndex = tabList.value.findIndex((item) => item.url === url) - 1
    store.removeTab(url)
    if (activeKey.value === url) {
        // 删除为当前tab,跳转最后一个tab
        router.push(tabList.value[tabIndex].url)
        return
    }
    // 删除不为当前tab,跳转删除tab左边的tab
    router.push(tabList.value[tabIndex].url)
}

// 刷新缓存tabList到本地sessionStorage
const refreshTabList = () => {
    // 刷新前or标签页删除前
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('TAB_LIST', JSON.stringify(tabList.value || []))
    })

    // 拿到本地缓存的tabList
    const sessionTab = sessionStorage.getItem('TAB_LIST')
    if (sessionTab) {
        JSON.parse(sessionTab).forEach((item: ITabs) => {
            store.addTab(item)
        })
    }
}
onMounted(() => {
    refreshTabList()
})

// 右键菜单
const showMenu = ref(false)
// 右键选中的路由
const currentContext = ref('')
const position = reactive({
    left: '',
    top: ''
})
const handelContextmenu = (e: MouseEvent) => {
    console.log(e)
    if (e.target instanceof HTMLDivElement) {
        const current = e.target.id.split('-')[1]
        currentContext.value = current
        showMenu.value = true
        position.left = e.clientX + 'px'
        position.top = e.clientY + 'px'
        return
    }
}

// 关闭所有tab
const closeAllTabs = () => {
    store.removeAllTab()
    sessionStorage.removeItem('TAB_LIST')
    router.push('/')
    showMenu.value = false
}
// 关闭左边tab
const closeLeftTabs = () => {
    store.removeLeftTab(currentContext.value)
    console.log(currentContext.value)
    router.push(currentContext.value)
    showMenu.value = false
}
// 关闭右边tab
const closeRightTabs = () => {
    store.removeRightTab(currentContext.value)
    console.log(currentContext.value)
    router.push(currentContext.value)
    showMenu.value = false
}
// 关闭其它tab
const closeOtherTabs = () => {
    console.log(currentContext.value)
    console.log(currentContext.value)
    store.removeOtherTab(currentContext.value)
    router.push(currentContext.value)
    showMenu.value = false
}
// 监控右键取消,点击菜单以外消失
watch(
    () => showMenu.value,
    (val) => {
        if (val) {
            window.addEventListener('click', () => {
                showMenu.value = false
            })
        } else {
            window.removeEventListener('click', () => {})
        }
    }
)
</script>
<style lang="scss" scoped>
::v-deep.el-tabs--card {
    .el-tabs__header {
        border-bottom: none;
        .el-tabs__nav {
            border: none;
        }
    }
    .el-tabs__item {
        --el-tabs-header-height: 35px;
        border-radius: 8px;
        margin-right: 6px;
        background-color: #fff;
        border: none;
        transition: all 0.3s;
        &:hover {
            background: var(--el-color-primary-light-7);
            transition: all 0.3s;
        }
    }
    .is-active {
        transition: all 0.3s;
        box-shadow: var(--el-box-shadow-lighter);
    }
    .el-tabs__nav-scroll {
        padding: 3px 0;
    }
}
</style>
