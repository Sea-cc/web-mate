const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = '管理系统'
            return args
        })
        // config.plugin(AutoImport).use(ElementPlusResolver)
        // config.plugin(Components).use(ElementPlusResolver)
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                dirs: ['@/components'],
                dts: 'src/utils/auto-imports.d.ts',
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                dirs: ['@/components'],
                dts: 'src/utils/components.d.ts',
                resolvers: [ElementPlusResolver()]
            })
        ]
    }
})
