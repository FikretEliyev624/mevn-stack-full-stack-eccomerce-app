<template>
    <button @click="changeTheme" class="block py-2 pr-4 text-2xl pl-3 hover:bg-transparent">
        <span  class="text-white hidden dark:inline"><font-awesome-icon icon="fa-solid fa-moon" /></span>   
        <span  class="text-yellow-400 inline dark:hidden"><font-awesome-icon icon="fa-solid fa-sun" /></span>
       
    </button>
</template>

<script>
export default {
    created(){
         if(localStorage.getItem('Theme')){
                document.documentElement.classList.add('dark')
        }
    },
    methods:{
        changeTheme(){
            this.$store.commit('changeTheme')
        },
        
    }
    
}
</script>