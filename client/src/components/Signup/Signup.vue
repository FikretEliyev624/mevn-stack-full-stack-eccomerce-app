<template>
    <div class="dark:bg-gray-800 hero">
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-16">
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Sign Up</h2>

    <form @submit="userSignup">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                <input  v-model="$store.state.signupData.username" id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                <input  v-model="$store.state.signupData.email" id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                <input  v-model="$store.state.signupData.password" id="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label>
                <input  v-model="$store.state.signupData.confirmation" id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>
        </div>

        <div class="flex justify-end mt-6">
            <button type="submit" class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Sign up</button>
        </div>
    </form>
    
</section>
    </div>
</template>

<script>
    import axios from 'axios'
export default {
    data(){
        return{
           
        }

    },
    methods:{
        userSignup(e){
            e.preventDefault();
            this.$store.dispatch('userSignup')
        }
    }
    }
    
</script>