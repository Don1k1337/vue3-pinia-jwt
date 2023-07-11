//ui lib
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/config/firebaseConfig'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
