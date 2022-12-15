<template>
    <div class="hero dark:bg-gray-800">
        <div class="btn-group my-10">
            <button @click="gotoPrevious" class="btn dark:btn-primary btn-info text-white md:btn-md btn-sm"><font-awesome-icon icon="fa-solid fa-angle-left" /></button>
            <button @click="setPage(page)" v-for="page in pages" :key="page" class="btn dark:btn-primary btn-info text-white md:btn-md btn-sm">{{page+1}}</button>
            <button @click="gotoNext" class="btn dark:btn-primary btn-info text-white md:btn-md btn-sm"><font-awesome-icon icon="fa-solid fa-angle-right" /></button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
           
        }
    },
    methods:{
        gotoNext(){
            this.$store.commit('gotoNext')
            this.$store.dispatch('getProducts')
        },
        gotoPrevious(){
            this.$store.commit('gotoPrevious')
            this.$store.dispatch('getProducts')
        },
        setPage(index){
            this.$store.commit('setPage',index)
            this.$store.dispatch('getProducts')
        }

    },
    computed:{
        ...mapGetters(['pages'])
    }
}
</script>