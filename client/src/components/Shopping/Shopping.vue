<template>
    <div class="dark:bg-gray-800">
        <div class="overflow-x-auto my-32">
  <table class="table w-full">
    <!-- head -->
    <thead class="dark:bg-gray-800">
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Catagory</th>
        <th>Name</th>
        <th>Price</th>
        <th>Total</th>
        <th>Amount</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(cart,index) in cartsItem" :key="cart._id">
        <th>{{index+1}}</th>
        <td class="mask"><img class="w-16" :src="`${url}/${cart.image}`" alt=""/></td>
        <td>#<span>{{cart.category}}</span></td>
        <td>{{cart.name}}</td>
        <td><span>{{cart.price}}</span>$</td>
        <td><span>{{cart.price*cart.quantity}}</span>$</td>
        <td><input v-model="cart.quantity" class="w-16 h-7 md:h-10 input input-success text-2xl" type="text" /></td>
        <td><button @click="deleteCart(cart.productId)" class="text-2xl btn btn-ghost text-red-600 hover:bg-transparent"><font-awesome-icon icon="fa-solid fa-trash-can" /></button></td>
      </tr>
    </tbody>
  </table>
</div>
    <div class="flex items-center justify-center">
      <div class="flex flex-col">
        <p class="text-2xl text-center text-white">Total: <span>{{Subtotal}}</span>$</p>
      <div class="btn-group my-10">
        <button class="btn text-white btn-success">Buy All</button>
        <button @click="$store.dispatch('emptyCart')"  class="btn text-white btn-error">Delete All</button>
      </div>
      </div>
    </div>
    </div>
</template>


<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
  onMounted(()=>(store.dispatch('getCarts')))
  const store=useStore()
  const deleteCart=(id)=>{
    store.dispatch('deleteCart',id)
  }
  const url='http://localhost:5000/uploads'
  const cartsItem=computed(()=>store.getters.cartsItem)
  const Subtotal=computed(()=>store.getters.Subtotal)
</script>