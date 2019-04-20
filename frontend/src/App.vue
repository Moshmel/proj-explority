<template>
  <div id="app">
    <navbar-cmp></navbar-cmp>
    <router-view></router-view>
  </div>
</template>
  <script>
  import navbarCmp from "./components/navbar-menu-cmp";
  export default {
    data(){
      return{
        // activitiesForDisplay:null
      }
    },
    name:'App',
    components:{
      navbarCmp,
    },
    methods: {

    },
    created() {

    }
    
  }
  </script>
<style lang="scss">
.router-view{

}
</style>
