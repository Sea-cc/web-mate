interface ITheme {
    [prop: string]: string
}
interface IColors {
    primary: string
    // success?: string
    // warning?: string
    // danger?: string
    // info?: string
    [prop: string]: string
}
export const getsTheColorScale = (colors: IColors) => {
    const prefix = '--el-color-'
    const themeColors: ITheme = {
        primary: '#409effh',
        success: '#67c23a',
        warning: '#e6a23c',
        danger: '#f56c6c',
        info: '#909399'
    }
    for (const item in themeColors) {
        themeColors[item] = colors[item] ? colors[item] : themeColors[item]
    }
    const black = '#000000',
        white = '#ffffff'
    const colorItems = Object.keys(colors)
    // 返回的变量对象
    const themeKeyValue: ITheme = {}
    colorItems.map((item) => {
        themeKeyValue[`${prefix}${item}`] = themeColors[item]
        for (let i = 1; i < 10; i++) {
            if (i == 2) {
                // todo 深色变量生成未完成 以基本色设置
                themeKeyValue[`${prefix}${item}-dark-${2}`] = colorMix(black, themeColors[item], 1)
                // themeKeyValue[`${prefix}${item}-dark-${i}`] = lighten(themeColors[item], i * 0.1)
            } else {
                // 将任意的主题色和“不同程度的白色”(weight)进行“混合”得到
                themeKeyValue[`${prefix}${item}-light-${10 - i}`] = colorMix(
                    white,
                    themeColors[item],
                    i * 0.1
                )
            }
        }
    })
    return themeKeyValue
}

// /**计算不同色阶的值
//  * @param  {} color dark or light 黑or白
//  * @param  {} color_ 不同主题色
//  * @param  {} weight 色阶的纯度
//  */
export const colorMix = (color: string, color_: string, weight: number): string => {
    weight = Math.max(Math.min(Number(weight), 1), 0)
    const r1 = parseInt(color.substring(1, 3), 16)
    const g1 = parseInt(color.substring(3, 5), 16)
    const b1 = parseInt(color.substring(5, 7), 16)
    const r2 = parseInt(color_.substring(1, 3), 16)
    const g2 = parseInt(color_.substring(3, 5), 16)
    const b2 = parseInt(color_.substring(5, 7), 16)
    const r = Math.round(r1 * (1 - weight) + r2 * weight)
    const g = Math.round(g1 * (1 - weight) + g2 * weight)
    const b = Math.round(b1 * (1 - weight) + b2 * weight)
    const r_ = ('0' + (r || 0).toString(16)).slice(-2)
    const g_ = ('0' + (g || 0).toString(16)).slice(-2)
    const b_ = ('0' + (b || 0).toString(16)).slice(-2)
    return '#' + r_ + g_ + b_
}
