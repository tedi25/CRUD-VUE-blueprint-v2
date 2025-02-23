import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.component('v-select', vSelect)
app.mount('#app')
