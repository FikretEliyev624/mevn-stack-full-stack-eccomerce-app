<template>
    <Advertising/>
    <Filter/>
    <Products/>
    <Pagination/>
</template>


<script>
    import Advertising from "./Advertising.vue"
    import Filter from "./Filter.vue"
    import Products from "./Products.vue"
    import Pagination from "./Pagination.vue"
export default {
    components:{
    Advertising,
    Filter,
    Products,
    Pagination
},
}
</script>