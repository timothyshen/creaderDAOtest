import VueGtag from "vue-gtag";

require('dotenv').config();

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.css'
import { ethers } from "ethers";

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .use(ethers)
    .mount('#app')
    .use(VueGtag, {
        config: { id: config.GOOGLE_ANALYTICS_ID,
            params: {
                anonymize_ip: true
            }}
    }, router);
