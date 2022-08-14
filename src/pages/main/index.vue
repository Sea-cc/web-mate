<template>
    <Transition name="bounce" mode="out-in">
        <el-container :style="height" v-if="layout === 'default'">
            <el-header><header-content /></el-header>
            <el-container>
                <el-aside width="auto">
                    <aside-content />
                </el-aside>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <Transition name="slide-fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-container :style="height" v-else-if="layout === 'tb'">
            <el-header><header-content /></el-header>
            <el-main>
                <router-view v-slot="{ Component }">
                    <Transition name="slide-fade" mode="out-in">
                        <component :is="Component" />
                    </Transition> </router-view
            ></el-main>
        </el-container>
        <el-container :style="height" v-else-if="layout === 'lt'">
            <el-aside width="auto">
                <aside-content />
            </el-aside>
            <el-container :style="height">
                <el-header><header-content /></el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <Transition name="slide-fade" mode="out-in">
                            <component :is="Component" />
                        </Transition> </router-view
                ></el-main>
            </el-container>
        </el-container>
        <el-container :style="height" v-else>
            <el-aside width="auto">
                <aside-content>
                    <!-- <template #aside-extend></template> -->
                </aside-content>
            </el-aside>
            <el-main
                ><router-view v-slot="{ Component }">
                    <Transition name="slide-fade" mode="out-in">
                        <component :is="Component" />
                    </Transition> </router-view
            ></el-main>
        </el-container>
    </Transition>
    <div class="theme-ll"><layTheme /></div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, computed, watch, provide } from 'vue'
import headerContent from '../layout/header.vue'
import asideContent from '../layout/aside.vue'
// import mainContent from '../layout/main.vue'
import layTheme from '../layout/theme.vue'
import { themeStore } from '@/store/theme'
const store = themeStore()
const layout = computed(() => store.layoutType)
const headColor_ = computed(() => store.colors.headColor)
watch(headColor_, (newVal) => {
    height['--headColor'] = newVal
})
const height = reactive({
    '--headColor': computed(() => store.colors.headColor).value,
    '--headheight': '60px',
    '--maincalct': '60px'
})
provide('layout', layout)
provide('layoutHeader', height)
watch(
    layout,
    (newVal) => {
        if (['ll', 'lt'].includes(newVal)) {
            height['--headheight'] = '0px'
            height['--maincalct'] = newVal === 'lt' ? '60px' : ''
            return
        }
        height['--headheight'] = '60px'
        height['--maincalct'] = '60px'
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss">
.el-header {
    background-color: var(--headColor);
    position: relative;
    z-index: 999;
    box-shadow: 0 1px 8px 3px rgb(0 0 0 / 8%);
    color: #333;
}

.el-aside {
    color: #333;
    background: #ffffff;
    text-align: center;
    height: calc(100vh - var(--headheight));
    position: relative;
    box-shadow: 0 8px 12px #ebedf0;
    transition: width 0.25s;
}

.el-main {
    // background-color: #ffffff;
    margin: 10px 0 0 6px;
    overflow: hidden;
    color: #333;
    height: calc(100vh - var(--maincalct) - 10px);
}
.theme-ll {
    position: fixed;
    right: -50px;
    bottom: 20%;
    width: 60px;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    border-radius: 8px;
    z-index: 1000;
    background-color: var(--el-color-primary);
    transition: all 0.6s;
    &:hover {
        right: -25px;
    }
}
/* 下面我们会解释这些 class 是做什么的 */
.bounce-enter-active {
    animation: bounce-in 0.6s;
}
.bounce-leave-active {
    animation: bounce-in 0.6s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
