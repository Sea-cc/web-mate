import { defineStore } from 'pinia'
import { ITheme, layoutItems, color } from './types'
import { ElMessage } from 'element-plus'
import LocalCache from '@/utils/cache'

export const themeStore = defineStore('theme', {
    state: (): ITheme => {
        return {
            layoutType: LocalCache.getCache('layout') || 'default',
            colors: {
                themeColor: LocalCache.getCache('AdminTheme')?.themeColor || '#1a73e8',
                headColor: LocalCache.getCache('AdminTheme')?.headColor || '#1a73e8'
            }
        }
    },
    getters: {},
    actions: {
        changeLayout(item: layoutItems) {
            this.layoutType = item
            LocalCache.setCache('layout', item)
        },
        changeThemeColor(items: color) {
            this.colors = items
            LocalCache.setCache('AdminTheme', this.colors)
        }
    }
})
