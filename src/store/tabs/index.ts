import { defineStore } from 'pinia'
import type { ITabsStore, ITabs } from './types'
import LocalCache from '@/utils/cache'
import { removeClass } from 'element-plus/es/utils'

export const tabsStore = defineStore('tabs', {
    state: (): ITabsStore => {
        return {
            tabs: []
        }
    },
    getters: {},
    actions: {
        addTab(tab: ITabs) {
            const isSome = this.tabs.some((item) => item.url === tab.url)
            // 不存在则添加
            if (!isSome) {
                this.tabs.push(tab)
            }
        },
        removeTab(url: string) {
            this.tabs = this.tabs.filter((item) => item.url !== url)
        },
        // 删除所有tab
        removeAllTab() {
            this.tabs = []
        },
        // 删除其它tab
        removeOtherTab(url: string) {
            this.tabs = this.tabs.filter((item) => item.url === url)
        },
        removeLeftTab(url: string) {
            const index = this.tabs.findIndex((item) => item.url === url)
            this.tabs.splice(0, index)
        },
        removeRightTab(url: string) {
            const index = this.tabs.findIndex((item) => item.url === url)
            this.tabs.splice(index + 1)
        }
    }
})
