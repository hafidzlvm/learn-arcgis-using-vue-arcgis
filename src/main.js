import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/index.css'
import constant from './constant'

import App from './App.vue'
import router from './router'
import '@arcgis/core/assets/esri/themes/light/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')