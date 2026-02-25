import './assets/main.css'
// import 'bootstrap/dist/scss/bootstrap.scss'
// import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

// Import our custom CSS
import './assets/scss/petclinic.scss'

import {} from 'bootstrap'

const app = createApp(App)

app.use(router)
// app.provide('bootstrap', bootstrap)
// app.use(ElementPlus)

app.mount('#app')
