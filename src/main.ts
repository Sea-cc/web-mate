import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { steupAuthStore } from '@/store/auth/auth'
import { createPinia } from 'pinia'
import 'normalize.css'
import '@/api'
import '@/utils/element-plus.scss'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$notify = ElNotification
app.use(router).mount('#app')
// .use(createPinia())
app.use(store)
// steupAuthStore() /* 解决刷新状态数据丢失问题 */
