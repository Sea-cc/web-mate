import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { steupAuthStore } from '@/store/auth/auth'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/utils/element-plus.scss'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
steupAuthStore() /* 解决刷新状态数据丢失问题 */
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$notify = ElNotification
app.use(router).mount('#app')
// .use(createPinia())
