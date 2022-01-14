import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

import axios from 'axios'
import VueClipboard from 'vue3-clipboard'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import api from '@/configs/api'

axios.defaults.baseURL = api
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.token = localStorage.getItem('token')

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})
app.use(VueSweetalert2)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mixin({
  methods: {
    notify(msg) {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3e3,
        timerProgressBar: true,
        title: msg,
      })
    },
  },
})

app.mount('#app')
