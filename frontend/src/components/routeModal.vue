<template>
  <transition name="modal-fade">
    <div class="modal-backdrop slide-in-fwd-center">
      <div class="modal">
        <button class="close-button" @click="close">x</button>
        <div class="map-container" v-show="!isLoading">
          <GmapMap
            :center="{lat:10, lng:10}"
            :zoom="14"
            ref="map"
            map-type-id="terrain"
            style="width: 788px;
    height: 255px;"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            />
          </GmapMap>
        </div>
        <h1 class="plan-title">My Plan :</h1>
        <div class="carousel-container">
          <carousel
            adjustableHeight="true"
            navigationEnabled="true"
            paginationEnabled="false"
            speed="300"
          >
            <slide class="slide" v-for="activity in plannedActivities" :key="activity.googleId">
              <activity-preview :activity="activity"></activity-preview>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/eventBus.js";
import mapService from "../services/mapService.js";
import activityPreview from './activityPreviewSmall'
import GoogleMap from "./GoogleMap";
import { Carousel, Slide } from 'vue-carousel';
export default {
    props:["route","plannedActivities"],
  data() {
    return {
      currRoute: null,
      center: { lat: 32, lng: -33 },
      map:null
    };
  },
    methods: {
     getRoute: function () {
       this.directionsService = new google.maps.DirectionsService()
       this.directionsDisplay = new google.maps.DirectionsRenderer()
       this.directionsDisplay.setMap(this.$refs.map.$mapObject)
       var vm = this
       vm.directionsService.route({
        //  origin: this.coords,
         origin: {lat: 52.370216 , lng: 4.895168},
        //  destination: this.destination,
         destination: {lat: 52.520008 , lng: 	13.404954},
         travelMode: 'DRIVING'
       }, function (response, status) {
         if (status === 'OK') {
           vm.directionsDisplay.setDirections(response)
         } else {
           console.log('Directions request failed due to ' + status)
         }
       })
     },

          geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
      initRoute() {
      mapService.initMap(this);
      this.resetMap();
      this.directionReq.origin = this.route.origin;
      this.directionReq.destination = this.route.destination;
      this.directionReq.travelMode = google.maps.DirectionsTravelMode.DRIVING;
      this.directionReq.unitSystem = google.maps.UnitSystem.METRIC;
    },
        resetMap() {
      this.map = new google.maps.Map(this.$refs.map.$el, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 14
      });
    },
        close() {
      this.$emit("close");
    }  
  },
  components: {
    GoogleMap,    Carousel,
    Slide,activityPreview
  },
  created() {
      this.currRoute=this.route;
    // if (typeof this.$route.query.route !== "string") {
    //   localStorage.setItem("route", JSON.stringify(this.$route.query.route));
    // }
    //   this.currRoute = JSON.parse(localStorage.getItem("route"));
  },
  mounted(){
        this.$refs.map.$mapPromise.then((map) => {
        map.panTo({lat: 1.38, lng: 103.80})
        // initMap();
        this.getRoute()
        })
  }
  
};
</script>

<style scoped>
.plan-title {
  padding-left: 150px;
  margin-top: 40px;
  font-family: Dosis;
  font-size: 28px;
}
.map-container {
  margin: 0 auto;
}
.carousel-container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 36px;
}
.close-button {
  width: 21px;
  text-align: center;
  border-radius: 50%;
  background-color: lightblue;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}
.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 999999999999;
  width: 1300px;
  height: 700px;
}
.slide {
  width: 256px;
}
</style>
