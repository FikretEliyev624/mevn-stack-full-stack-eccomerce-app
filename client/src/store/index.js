import { createStore } from "vuex";
import {router} from "../router"
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
export const store=createStore({
    state:{
        Theme:'dark',
        user_name:'',
        user_token:'',
        products:[],
        carts:[],
        cartsItem:[],
        pageNumber:0,
        numberOfPages:0,
        pages:[],
        searchName:'',
        Subtotal:0,
        cartsLen:0,
        filterItems:['Samsung','iPhone','Xiaomi'],
        signupData:{
            username:'',
            email:'',
            password:'',
            confirmation:''
        },
        signinData:{
            email:'',
            password:'',
        }
        
    },getters:{
        user_name:state=>state.user_name,
        user_token:state=>state.user_token,
        products:state=>state.products,
        pageNumber:state=>state.pageNumber,
        pages:state=>new Array(state.numberOfPages).fill(null).map((v,i)=>i),
        checkSearch:state=>state.searchName.length>0?false:true,
        carts:state=>state.carts,
        cartsItem:state=>state.cartsItem,
        Subtotal:state=>state.Subtotal,
        cartsLen:state=>state.cartsLen
    },
    mutations:{
        changeTheme(state,_){
           document.documentElement.classList.toggle(state.Theme)
           if( document.documentElement.classList.contains(state.Theme)){
            localStorage.setItem('Theme',state.Theme)
           }else{
            localStorage.removeItem('Theme')
           }
        },
        getNumberOfPages(state,payload){
            state.numberOfPages=payload
        },
        getProducts(state,payload){
            state.products=payload
        },
        gotoNext(state,_){;
            state.pageNumber=Math.min(state.numberOfPages-1,state.pageNumber+1)
        },
        gotoPrevious(state,_){
            state.pageNumber=Math.max(0,state.pageNumber-1)
            
        },
        setPage(state,payload){
            state.pageNumber=payload
        },
        searchItem(state,payload){
            state.searchName=payload
        },
        filterData(state,payload){
            state.filterItems.map(item=>item==payload)
        },
        sendCarts(state,payload){
            state.carts=payload
        },
        getUserName(state,payload){
            state.user_name=payload
        },
        getCartsItem(state,payload){
            state.cartsItem=payload
        },
        getSubTotal(state,payload){
            state.Subtotal=payload
        },
        getCartsLen(state,payload){
            state.cartsLen=payload
        }
    },
    actions:{
        async userSignin({commit,state}){
            const url='http://localhost:5000/users/signin'
           await axios.post(url,state.signinData)
            .then(res=>{
                console.log(res.data.user.username);
                localStorage.setItem('user_token',res.data.token)
                localStorage.setItem('user_name',res.data.user.username)
                //commit('getUserName',res.data.user.username)
                createToaster({position: 'top'}).success('Successfully logged in')
                router.push({name:'Home'})
            })
            .catch(err=>{
                createToaster({position: 'top'}).error(err.response.data)
            })
        },
        async userSignup({state}){
            const url='http://localhost:5000/users/signup'
           await axios.post(url,state.signupData)
            .then(res=>{
                console.log(res.data)
                createToaster({position: 'top'}).success("Congratulations, your account has been successfully created.")
                router.push({name:'Signin'})
            })
            .catch(err=>{
                createToaster({position: 'top'}).error(err.response.data)
            })
        },
        async getProducts({commit,state}){
            await axios.get(`http://localhost:5000/products?page=${state.pageNumber}`)
            .then(res=>{
                commit('getNumberOfPages',res.data.totalPages)
                commit('getProducts',res.data.posts)
            })
            .catch(err=>{
                console.log(err);
            })
        },
        async searchProducts({commit,state}){
            await axios.get('http://localhost:5000/products/all')
            .then(res=>{
                commit('getProducts',res.data.posts.filter(product=>product.name.toLowerCase().includes(state.searchName.toLowerCase())))
            })
            .catch(err=>{
                console.log(err);
            })
        },
        async filterProducts({commit},payload){
            await axios.get('http://localhost:5000/products/all')
            .then(res=>{
                commit('getProducts',res.data.posts.filter(product=>product.category.includes(payload)))
            })
            .catch(err=>{
                console.log(err);
            })
        },
        async addToCart({commit},{productId,quantity}){
            const token=localStorage.getItem('user_token')
            await axios.post('http://localhost:5000/carts/create',{productId,quantity},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(res=>{
                createToaster({position: 'top'}).success("Product was successfully added to your cart.")
                commit('getCartsItem',res.data.items)
                commit('getCartsLen',res.data.items.length)
                
            })
            .catch(err=>{
                console.log(err)
                createToaster({position: 'top'}).error(err.response.data.message)
                router.push({name:'Signin'})
            })
        },
        async getCarts({commit}){
            const token=localStorage.getItem('user_token')
            await axios.get('http://localhost:5000/carts/',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }).then(res=>{
                commit('getCartsItem',res.data.items)
                commit('getSubTotal',res.data.subTotal)
                commit('getCartsLen',res.data.items.length)
            }).catch(
                err=>console.log(err)
            )
        },
         deleteCart({commit},payload){
            const token=localStorage.getItem('user_token')
             axios.delete('http://localhost:5000/carts/delete-cart/',{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data:{
                    "productId":payload
            }})
                .then((res)=>{
                    createToaster({position: 'top'}).info("Remove Item from the Shopping Cart ")
                commit('getCartsItem',res.data.items.filter(item=>item.id!==payload))
                commit('getSubTotal',res.data.subTotal)
                commit('getCartsLen',res.data.items.length)
                console.log(res);
            })
        },
        emptyCart({commit}){
            const token=localStorage.getItem('user_token')
             axios.delete('http://localhost:5000/carts/empty-cart/',{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                })
                .then((res)=>{
                    createToaster({position: 'top'}).warning("Remove All Items from the Shopping Cart ")
                commit('getCartsItem',res.data.items)
                commit('getSubTotal',res.data.subTotal)
                commit('getCartsLen',res.data.items.length)
            })
        }
    }
})
