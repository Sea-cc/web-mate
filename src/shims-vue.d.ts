/* eslint-disable */
declare module '*.vue' {
    /* DefineComponent可以为ts做很多类型Vuet属性的推导、限制、提示 */
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare const VUE_APP_BASE_URL: string
declare module 'color'
