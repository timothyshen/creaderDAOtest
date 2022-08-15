import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
/* add icons to the library */
library.add(faBook)

const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(ElementPlus);




app.mount('#app');
