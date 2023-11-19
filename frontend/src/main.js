import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import 'animate.css'
import 'bootstrap/js/dist/modal.js'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'vue-toast-notification/dist/theme-sugar.css'
import './assets/main.css'

import ToastPlugin from 'vue-toast-notification'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ToastPlugin, {
  position: 'bottom-left'
})
app.use(autoAnimatePlugin)
app.use(router)
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
