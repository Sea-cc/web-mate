/* 专门存放类型的文件 */
export interface ITheme {
    layoutType: layoutItems
    colors: color
}
export type color = {
    themeColor: string
    headColor: string
}
export type layoutItems = 'default' | 'tb' | 'lt' | 'll'
