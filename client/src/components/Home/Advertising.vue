<template>
    <div class="hero dark:bg-gray-800">
        <carousel :snapAlign="center" :items-to-show="1" :autoplay="3000" :wrapAround="true">
      <template #slides>
        <slide v-for="phone in Phones"  :key="phone.id">
        <img class="md:w-96 w-48" :src="phone.path" alt="">
      </slide>
      </template>
      <template #addons>
        <navigation />
        <pagination />
      </template>

    </carousel>
    </div>
  </template>


<script>
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    
    export default {
      components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
      },
      data(){
        return{
            Phones:[
                {id:1,path:'/reklam/phone1.png'},
                {id:2,path:'/reklam/phone2.png'},
                {id:3,path:'/reklam/phone3.png'},
                {id:4,path:'/reklam/phone4.png'}
            ]
        }
      }
    };
    </script>