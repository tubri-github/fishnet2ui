import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowRestore,faExpandArrowsAlt,faTimes,faMapPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fontsource/metropolis';


library.add(faWindowRestore, faExpandArrowsAlt,faTimes,faMapPin)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(ElementPlus).mount('#app')
