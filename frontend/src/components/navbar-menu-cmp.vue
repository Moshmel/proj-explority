<template>
<section class="navbar-menu flex space-between slide-in-fwd-center">
    <div class="flex align">
    <!-- <img class="logo" src="../../public/img/logo.png" alt=""> -->
       
  <div class="title-container">
       <router-link to="/">
    <h1 class="title">Explority</h1>
       </router-link>

  </div>
    </div>
      <sign-up-modal v-if="showSignUpModal"  @close="showSignUpModal=false"></sign-up-modal>
      <login-modal v-if="showSignInModal" @close="showSignInModal=false" ></login-modal>
      <!-- <p>{{userCount}} Connected Users</p>            -->
    <booked-pop-up :text=txt></booked-pop-up> 
      <ul class="navbar-items flex space-between">
      <li v-if="getUser">hi! {{user.username}}</li>
      <li class="menu-option" @click="onDisconnect" v-if="getUser">Disconnect </li>
      <li class="menu-option" @click="showSignInModal=true" v-if="!getUser" >Log In</li>
         <li class="menu-option" v-if="!getUser" @click="showSignUpModal=true" >Sign Up</li>
      </ul>

</section>
</template>


<script>
import loginModal from './loginModal'
import signUpModal from './signUpModal'
import bookedPopUp from './bookedPopUp.vue'
import {EventBus} from '@/eventBus'
export default {
  name: "navbar-menu",
  created() {

    EventBus.$on('usercount',(online)=>{this.userCount=online})
    this.$store.dispatch({ type: "checkIfLoggedOn" });
   
    // this.user = this.$store.getters.user;
  },

  methods: {
    onDisconnect() {
      this.$store.dispatch({ type: "disconnectUser" });
    }
  },
  data() {
    return {
      showSignInModal:false,
      showSignUpModal:false,
      userCount:1,
      txt:"",
      user: "",
      isConnected:false
    };
  },
  computed: {
getUser:function(){
  this.user=this.$store.getters.user
  return this.$store.getters.user

}
    
  },components:{
    bookedPopUp,loginModal,signUpModal
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');
@import url("https://fonts.googleapis.com/css?family=Faster+One|Marck+Script|Reenie+Beanie");


.menu-option{
  cursor: pointer;
}
li{
  font-size: 18px;
    font-family: cursive;
}
.title-container h1,
p {
  font-size: 2em;
   font-family: 'Bree Serif', serif;
  position: relative;
  top: -6px;
  left: 23px;
}
.title{
 
}
p {
  font-size: 1.3rem;
}
.navbar-menu {
  top:0;
    position: fixed;
    width: 100%;
    height: 70px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 9999;   
     background: #2d7294;
    /* margin-bottom: 7px; */
    color: #ffff;
}
ul {
  align-items: center;
}
a {
  margin-top: 21px;
  

  font-size: 1rem;
  text-decoration: none;
  font-family: sans-serif;
}
li {
  text-decoration: none;
  font-family: "Dosis","san-serif";

}
.navbar-items {
  margin-right: 60px;
  width: 200px;

  font-size: 1.3rem;
}
p {
}
img {
  height: 3vh;
  transform: scale(.1)
}
h1 {
  font-size: 2rem;
  margin-top: 6px;
  color:white;

}
.hide {
}
</style>