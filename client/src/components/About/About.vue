<template>
    <div>
        <p class="text-5xl font-medium font-Roboto text-center dark:text-white">Sponsors</p>
        <ul class="flex justify-center">
            <li class="mx-10 md:mx-5"  v-for="(sponsor,index) in sponsors" :key="index">
                <img class="md:h-48 md:w-48 w-36 my-20 h-20" :src="sponsor.path" :alt="sponsor.name">
            </li>
        </ul>
    </div>
</template>

<script setup>
    const sponsors=[
        {name:'iphone',path:'/public/img/img1.png'},
        {name:'samsung',path:'/public/img/img2.png'},
        {name:'xiaomi',path:'/public/img/img3.png'}
    ]
</script>