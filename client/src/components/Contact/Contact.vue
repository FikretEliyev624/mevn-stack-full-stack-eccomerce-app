<template>
    <div class="dark:bg-gray-800 hero">
        <form @submit="sendMessage">
            <section class="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="mt-6 ">
        <div class="items-center -mx-2 md:flex">
            <div class="w-full mx-2">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Name</label>

                <input required v-model="contactData.name" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text">
            </div>

            <div class="w-full mx-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>

                <input required v-model="contactData.email" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="email">
            </div>
            <div class="w-full mx-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Subject</label>

                <input required v-model="contactData.subject" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text">
            </div>
        </div>

        <div class="w-full mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Message</label>

            <textarea required v-model="contactData.message" class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
        </div>

        <div class="flex justify-center mt-6">
            <button type="submit" class="px-4 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Send
                Message
            </button>
        </div>
    </div>
</section>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
export default {
    data(){
        return{
            contactData:{
                name:'', 
                email:'', 
                subject:'', 
                message:''
            }
        }
    },
    methods:{
        sendMessage(e){
            e.preventDefault();
            const url='http://localhost:5000/contact'
            axios.post(url,this.contactData)
            .then(res=>{
                this.contactData.name=''
                this.contactData.email=''
                this.contactData.subject=''
                this.contactData.message=''
                console.log(res);
                this.$toast.success(res.data, {position: 'top'})
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>