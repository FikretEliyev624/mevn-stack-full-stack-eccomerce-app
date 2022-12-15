<template>
    <nav  class="relative bg-white shadow dark:bg-gray-800">
    <div class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">

            <!-- Mobile menu button -->
            <div class="flex lg:hidden">
                <button  @click="isOpen = !isOpen" type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                    <svg v-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
            
                    <svg v-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div  :class="isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'" class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
            <div class="flex text-xl font-Roboto font-bold flex-col md:flex-row md:mx-6">
                <router-link active-class="dark:text-yellow-400 text-blue-400" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 md:mx-4 md:my-0" to="/">Home</router-link>
                <router-link active-class="dark:text-yellow-400 text-blue-400" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 md:mx-4 md:my-0" to="/about">About</router-link>
                <router-link active-class="dark:text-yellow-400 text-blue-400" class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-400 md:mx-4 md:my-0" to="/contact">Contact</router-link>
            </div>

            <div class="flex  justify-center md:block">
                
                <div class="flex">
                    <a class="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" href="#">
                  <div class="indicator">
                    <span class="indicator-item badge badge-secondary">{{cartsLen}}</span> 
                    <button @click="$router.push({name:'Shopping'})" class="btn btn-ghost text-2xl hover:bg-transparent">
                      <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    </button>
                </div>
                </a>
                <div class="mx-3">
                    <div class="dropdown dropdown-hover">
                        <label tabindex="0" class="btn btn-ghost hover:bg-transparent dark:text-white text-2xl m-1"><font-awesome-icon icon="fa-solid fa-gear" /></label>
                             <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <router-link @click="logout" active-class="dark:bg-yellow-400 text-white bg-blue-400 dark:text-white" to="/signin">{{checkUserData()}}</router-link>
                                </li>
                                <li><router-link active-class="dark:bg-yellow-400 text-white bg-blue-400 dark:text-white" to="/signup">{{checkUserName()}}</router-link></li>
                                </ul>
                    </div>
                </div>
                <div>
                    <Theme/>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</nav>
<router-view></router-view>
</template>
<script>
import { mapGetters } from 'vuex';
import Theme from './setting/Theme.vue';
export default {
    data() {
        return {
            isOpen: false,
            userPath:''
        };
    },
    mounted(){
        this.userPath=localStorage.getItem('user_token')!==null ?'/':'/signup'
        
    },
    components: { Theme },
    methods:{
        logout(){
            if(localStorage.getItem('user_token')!==null){
                return localStorage.removeItem('user_token') || localStorage.removeItem('user_name')
            }
        },
        checkUserData(){
            return localStorage.getItem('user_token')!==null?"Sign out":'Sign in'
        },
        checkUserName(){
            return localStorage.getItem('user_token')!==null ? localStorage.getItem('user_name') :'Sign up'
        },
       
    },
    computed:{
       ...mapGetters(['user_name','cartsLen']),
    },

}
</script>