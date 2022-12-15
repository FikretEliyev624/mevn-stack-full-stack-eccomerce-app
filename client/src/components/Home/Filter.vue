<template>
   <div class="hero dark:bg-gray-800">
    <div class="my-32 flex">
        <div class="md:mr-5 mr-1 ">
    <select @change="$store.dispatch('filterProducts',$event.target.value)"  class="select dark:select-info dark:bg-info dark:text-white select-sm md:select-md select-primary w-full max-w-sm font-bold font-Roboto">
        <option disabled selected value="">Category</option>
        <option  v-for="(item,index) in $store.state.filterItems" :key="index" :value="item">{{item}}</option>
    </select>
        </div>
        <div class="md:ml-5 ml-1">
            <div class="form-control">
                <div class="input-group">
                <input v-model="$store.state.searchName" type="search" placeholder="Search…" class="input dark:text-white  dark:bg-yellow-300 md:input-md md:w-96 input-sm input-bordered" />
                <button :disabled="$store.getters.checkSearch" @click="$store.dispatch('searchProducts')"  class="btn btn-square dark:text-white btn-primary dark:btn-info px-3 md:btn-md btn-sm text-xl md:text-2xl">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>
</div>
        </div>
    </div>
   </div>
</template>

<script setup>

</script>
