
<template>
  <div class="home-page">

    <cover-img @searched="toggleMap"></cover-img>
    <main class="grid">
    </main>

  </div>
</template>
<script>
import resultCmp from "../components/resultCmp";
import navbarMenu from "../components/navbar-menu-cmp";
import coverImg from "../components/cover-img-cmp";
import { EventBus } from "@/eventBus.js";

export default {
  data() {
    return {
      currRoute: null,
      location: { name: null, lat: null, long: null },
      route: null
    };
  },

  created() {
    this.$store.dispatch({type:'checkIfLoggedOn'});
    this.$store.dispatch({ type: "loadFourActivities" });
    this.currRoute = this.route;
  },
  methods: {
    toggleMap(route) {
      console.log('From home', route);
      
      this.$router.push({ path: "/results", query: { route } });
    }
  },
  emitBus(){
    
  },
  watch: {
    currRoute: {
      deep: true,
      immediate: true,
      handler(n, o) {
        this.route = n;
      }
    }
  },

  computed: {
    activitiesForDisplay() {
      return this.$store.getters.activitiesForDisplay;
    }
  },
  components: {
    // googleMap,
    navbarMenu,
    coverImg,
    resultCmp,

  }
};
</script>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #ccc;
  height: 150px;
  align-items: center;
  a {
  }
  h1 {
    font-size: 2em;
    align-self: center;
  }
}
main > div {
  height: auto;
}
.links {
  width: 20%;
}
.homepage-form {
  width: 100%;
  position: relative;
  height: 100%;
  background-color: hsla(0, 0%, 91%, 0.85);
  padding: 1em 0;
}
.option-section {
  border: 1px solid red;
  padding: 10px 1rem 2em;
  margin: 1em 0;
}
form {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(150, 150, 150, 0.5);
  input {
    padding: 0.4em 0.8em;
  }
}

.preview-list {
}

body {
  background: #03a9f4;
}
</style>
