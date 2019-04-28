<template>
  <div class="main-places">
    <booking-model :activityToBook="activityToBook" @booked="onBooked"></booking-model>
    <!-- <plan-list :addedActivities="addedActivities"></plan-list> -->
    <category-cmp @filter="filter"></category-cmp>
    <button
      class="plan-btn"
      type="button"
      @click="showRouteModal=!showRouteModal"
    >Plan ({{plannedCount}})</button>
    <div class="flex column container-search-area">
      <div class="flex search-area">
        <input class="text-input" v-model="currRoute.origin" type="text">
        <input class="text-input" v-model="currRoute.destination" type="text">

        <button class="search-btn" @click="onSearch">Search</button>
      </div>
      <!-- routeModal -->
    </div>
    <route-modal
      :plannedActivities="plannedActivities"
      :route="currRoute"
      v-if="showRouteModal"
      @close="showRouteModal=false"
    ></route-modal>
    <!-- <div class="added-places">
          <h1 >Current Plan <span class="activity-count">({{addedActivities.length }}) </span></h1>
          <button @click='showAdded' class="showAdded">My Plan</button>
    </div>-->
    <activity-list
      :addedActivities="addedActivities"
      @viewDetails="viewDetails"
      @book="book"
      @addToPlan="addToPlan"
      :activities="activities"
      @finishedloading="finishedloading"
    ></activity-list>
  </div>
</template>

<script>
import routeModal from "./routeModal.vue";
import categoryCmp from "./category-cmp";
import activityList from "./activityList";
import bookingModel from "./bookingModel";
import activityService from "@/services/activity-Service.js";
export default {
  props: ["activities", "addedActivities"],
  components: {
    categoryCmp,
    activityList,
    bookingModel,
    routeModal
  },
  data() {
    return {
      showRouteModal: false,
      plannedActivities: [],
      currRoute: {},
      activityToBook: null
    };
  },
  methods: {
    finishedloading() {
      this.$emit("finishedloading");
    },
    onBooked() {
      this.$emit("booked");
     
    },
    onSearch() {
      this.$emit("searched", this.currRoute);
    },
    addToPlan(activity) {
      this.plannedActivities.push(activity);
      this.$store.dispatch({type:'addToFavorite',activity : activity});
          this.$store.dispatch("updateUser");
    },
    book(activity) {

      this.$store.dispatch({type:'bookAnActivity',activity:activity});
          this.$store.dispatch("updateUser");
    },
    filter(filterBy) {
      this.$emit("filter", filterBy);
    },
    viewDetails(activity) {
      activityService.getByGoogleId(activity).then(res => {
        console.log("this is the res", res);
        this.$router.push("/activity/" + res._id);
      });
    },
    showAdded() {
      
    }
  },
  created() {
   
    this.$store.dispatch("updateUser");
    if (localStorage.getItem("route")) {
      this.currRoute = JSON.parse(localStorage.getItem("route"));
      
      plannedActivities.push({ a: 4 });
    }
 
  },
  computed: {
    plannedCount() {
      return this.plannedActivities.length;
    }
  }
};
</script>

<style scoped>
.container-search-area {
  margin: 0 auto;
}
.plan-btn {
  width: 78px;
  padding: 7px;
  border-radius: 3px;
  border: 1px solid #484848;
  background: white;
  color: #484848;
  font-weight: 400;
  font-size: 13px;
  font-family: cursive;
  margin-top: 16px;
}
.text-input {
  width: 180px;
  margin-left: 24px;
  margin-top: 22px;
}
.main-places {
  margin: 0 auto;
  border-right: 1px solid #ccc;
  padding-top: 16px;
}
.added-places {
  text-align: right;
  margin-right: 22px;
}

.added-places button {
  width: 38%;
  margin: 20px auto;
  padding: 7px;
  border-radius: 10px;
  background: #ff191993;
  border: 1px solid #ff1919de;
  color: white;
  font-weight: 400;
  font-size: 1.1em;
}
.search-area {
  margin: 0 auto;
  display: inline-block;
  margin-bottom: 16px;
}
.activity-count {
  font-weight: 800;
  text-align: right;
  color: #a5467d;
}
input {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  height: 30px;
}

.search-btn {
  height: 40px;
  width: 100px;
  margin-top: 30px;
  margin-left: 78px;

  padding: 7px;
  border-radius: 3px;
  border: 1px solid #a5467d;
  background: white;
  color: #a5467d;
  font-weight: 400;
  font-size: 18px;
  font-family: Dosis;
}
.move {
  transform: translate(0, 50px);
}
@media only screen and (max-width: 730 px) {
  .container-search-area {
    flex-direction: column-reverse !important;
  }
}
</style>
