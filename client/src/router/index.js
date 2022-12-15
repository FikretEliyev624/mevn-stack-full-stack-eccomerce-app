import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home/Home.vue"
import About from "../components/About/About.vue"
import Contact from "../components/Contact/Contact.vue"
import Shopping from "../components/Shopping/Shopping.vue"
import Signin from "../components/Signin/Signin.vue"
import Signup from "../components/Signup/Signup.vue"
const routes=[
    {
        name:'Home',
        path:'/',
        component:Home
    },
    {
        name:'About',
        path:'/about',
        component:About
    },
    {
        name:'Contact',
        path:'/contact',
        component:Contact
    },
    {
        name:'Shopping',
        path:'/shopping',
        component:Shopping
    },
    {
        name:'Signin',
        path:'/signin',
        component:Signin
    },
    {
        name:'Signup',
        path:'/signup',
        component:Signup
    },

]

export const router=createRouter({
    routes,
    history:createWebHistory()
})