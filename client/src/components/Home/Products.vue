<template>
    <div class="hero dark:bg-gray-800">
        <ul v-if="products.length>0" class="flex flex-wrap md:flex md:flex-row flex-col">
            <li class="mx-[80px] md:my-12 my-10" v-for="product in products" :key="product._id">
                <div class="card w-48 md:w-72 dark:bg-gray-500 bg-base-100 shadow-xl dark:shadow-2xl">
                    <figure class="md:px-10 md:pt-10 px-5 pt-5">
                        <img crossorigin="anonymous" class="md:w-48 w-32" :src="`${url}/${product.image}`" :alt="product.name">
                    </figure>
                    <div class="card-body items-center text-center">
                        <div class="dark:text-white">
                            <p class="md:text-xl text-lg font-bold font-Roboto">#<span>{{product.category}}</span></p>
                            <p class="md:text-lg text-base font-medium font-Roboto">{{product.name}}</p>
                            <p class="md:text-base text-sm"><span>{{product.price}}</span> $</p>
                        </div>
                        <div class="card-actions">
                            <button class="btn md:btn-md btn-sm text-base md:text-xl btn-info text-white">
                                <font-awesome-icon icon="fa-solid fa-credit-card" />
                            </button>
                            <button @click="addToCart(product._id,1)" class="btn md:btn-md btn-sm text-base md:text-xl btn-success text-white">
                                <font-awesome-icon icon="fa-solid fa-cart-plus" />
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
            <div v-else class="flex justify-center">
                <div class="alert alert-warning shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Warning: No results!</span>
            </div>
            </div>
            </div>
    </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    data(){
        return{
            url:'http://localhost:5000/uploads',
            userToken:localStorage.getItem('user_token')
        }
    },
    mounted(){
        this.getProducts()
        this.$store.state.carts
    },
    methods:{
        getProducts(){
            this.$store.dispatch('getProducts')
        },
        addToCart(productId,quantity){
            this.$store.dispatch('addToCart',{productId,quantity})
        }
    },

    computed:{
        ...mapGetters(['products','searchProducts']),
        //...mapActions(['addToCart'])
    }
}
</script>