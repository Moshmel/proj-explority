<template>
     <div class="main-container">
      <google-map :route="currRoute"></google-map>
    </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
export default {
  data() {
    return {
      currRoute: null
    };
  },
  props: ["route"],
  components: {
    GoogleMap
  },
  created() {
    if (typeof this.$route.query.route !== "string") {
      localStorage.setItem("route", JSON.stringify(this.$route.query.route));
    }
      this.currRoute = JSON.parse(localStorage.getItem("route"));
  }
};
</script>

<style scoped>
.main-container{
}
</style>
