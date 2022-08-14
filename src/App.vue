<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>
<script>
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
    setup() {
        return {
            locale: zhCn
        }
    }
})
</script>
<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f2f7ff;
}
* {
    margin: 0;
    padding: 0;
}
</style>
