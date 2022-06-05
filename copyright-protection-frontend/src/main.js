import VueGtag from "vue-gtag";


import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.css'

const app = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .use(VueGtag, {
        config: {id: process.env.VUE_APP_GA_ID},
        enabled: true,
        debug: true
    });


app.mount('#app');
