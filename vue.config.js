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
                dirs: ['src/components'],
                dts: 'src/utils/auto-imports.d.ts',
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                dirs: ['src/components'],
                dts: 'src/utils/components.d.ts',
                resolvers: [ElementPlusResolver()]
            })
        ],
        /* 添加反代理 */
        devServer: {
            proxy: {
                '/api': {
                    // target: 'http://172.20.10.11:3000/'
                    target: 'http://192.168.31.97:3000/'
                }
            }
        } /* 后端接口反代理 */
    }
})
