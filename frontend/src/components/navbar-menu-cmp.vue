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
    <sign-up-modal v-if="showSignUpModal" @close="showSignUpModal=false"></sign-up-modal>
    <login-modal v-if="showSignInModal" @close="showSignInModal=false"></login-modal>
    <!-- <p>{{userCount}} Connected Users</p>            -->
    <booked-pop-up :text="txt"></booked-pop-up>
    <transition name="fade">
      <ul class="navbar-items flex space-between" v-bind:class="{ responnav: hamburger }">
        <a class="icon" @click="hamburger=!hamburger">
          <i class="fa fa-bars"></i>
        </a>
        <li v-if="getUser">hi {{user.username}}!</li>
        <router-link to="/my-activities">
          <li
            @click="hamburger=!hamburger"
            class="menu-option my-activities-btn fade-in"
            v-if="getUser"
            v-bind:class="{ responli: hamburger }"
          >My activities</li>
        </router-link>

        <li
          class="menu-option fade-in-slow"
          @click="onDisconnect"
          v-if="getUser"
          v-bind:class="{ responli: hamburger }"
        >Sign-out</li>
        <li
          class="menu-option fade-in-slow"
          @click="showSignInModal=true"
          v-if="!getUser"
          v-bind:class="{ responli: hamburger }"
        >Log In</li>
        <li
          class="menu-option fade-in-slow"
          v-if="!getUser"
          @click="showSignUpModal=true"
          v-bind:class="{ responli: hamburger }"
        >Sign Up</li>
        <router-link to="/about">
          <li
             @click="hamburger=!hamburger"
            class="menu-option my-activities-btn fade-in-slow"
            v-bind:class="{ responli: hamburger }"
          >About</li>
        </router-link>
      </ul>
    </transition>
  </section>
</template>


<script>
import loginModal from "./loginModal";
import signUpModal from "./signUpModal";
import bookedPopUp from "./bookedPopUp.vue";
import { EventBus } from "@/eventBus";
export default {
  name: "navbar-menu",
  created() {
    EventBus.$on("usercount", online => {
      this.userCount = online;
    });
    this.$store.dispatch({ type: "checkIfLoggedOn" });

    // this.user = this.$store.getters.user;
  },

  methods: {
    onDisconnect() {
       this.hamburger=!this.hamburger;
      this.$store.dispatch({ type: "disconnectUser" });
    }
  },
  data() {
    return {
      hamburger: false,
      showSignInModal: false,
      showSignUpModal: false,
      userCount: 1,
      txt: "",
      user: "",
      isConnected: false
    };
  },
  computed: {
    getUser: function() {
      this.user = this.$store.getters.user;
      return this.$store.getters.user;
    }
  },
  components: {
    bookedPopUp,
    loginModal,
    signUpModal
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Bree+Serif");
@import url("https://fonts.googleapis.com/css?family=Faster+One|Marck+Script|Reenie+Beanie");
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

.navbar-items .icon {
  display: none;
}
.my-activities-btn {
  padding-bottom: 18px;
}

.menu-option {
  cursor: pointer;
  color: white;
  text-decoration: none;
}
li {
  font-size: 18px;
  font-family: cursive;
}
.title-container h1,
p {
  font-size: 2em;
  font-family: "Bree Serif", serif;
  position: relative;
  top: -6px;
  left: 23px;
}
.title {
}
p {
  font-size: 1.3rem;
}
.navbar-menu {
  top: 0;
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
  font-family: "Dosis", "san-serif";
}
.navbar-items {
  margin-right: 60px;
  width: 350px;

  font-size: 1.3rem;
}
p {
}
img {
  height: 3vh;
  transform: scale(0.1);
}
h1 {
  font-size: 2rem;
  margin-top: 6px;
  color: white;
}

@media screen and (max-width: 600px) {
  .navbar-items li {
    display: none;
  }
  .navbar-items .icon {
    cursor: pointer;
    color: white;
    display: block;
    position: fixed;
    right: 10px;
    top: 0;
    margin-top: 19px;
    margin-right: 9px;
    font-size: 29px;
  }
  .responnav {
    margin-top: 113px;
    display: block;
    position: fixed;
    width: 100vw;
  }
  .responli {
    display: block !important;
    border-top: 1px solid rgb(235, 235, 235);
    background-color: white;
    color: #484848;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 26px;
  }
}
</style>