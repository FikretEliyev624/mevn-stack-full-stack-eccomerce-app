import { createApp } from 'vue'
import "./assets/index.css"
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping , faGear , faSun , faMoon , faMagnifyingGlass , faMobileRetro , faCreditCard , faCartPlus , faAngleLeft , faAngleRight ,faBlog,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { store } from './store'
import { router } from './router'
import Toaster from '@meforma/vue-toaster';
library.add([faCartShopping,faGear,faSun,faMoon,faMobileRetro,faMagnifyingGlass,faCreditCard,faCartPlus,faAngleLeft,faAngleRight,faBlog,faTrashCan])

const app=createApp(App)
app.use(store)
app.use(Toaster)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
