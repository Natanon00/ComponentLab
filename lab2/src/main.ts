import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { inject } from '@vercel/analytics'
inject()
import router from './router'
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
