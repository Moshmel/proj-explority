<template>
  
  <div class=" main-container">

    <img class="loading" src="../../public/img/loader2.gif" v-if="isLoading" />
    <main-places :route="route"  @booked="onBooked" :addedActivities="addedActivities" 
                  @view="view" @filter="filter" @addToPlan = "addToPlan" 
                  @searched="onSearched" :activities="activities" v-show="!isLoading" @finishedloading="finishedloading">
             
    </main-places>

    <div class="map-container"  v-show="!isLoading">
      <gmap-map class="map"  ref="map" :center="center" :zoom="14">
        <gmap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" style="width:100%; height:100%;"
          @click="center=marker.position"></gmap-marker>
      </gmap-map>
    </div>
   
  </div>
</template>

<script>
import mapService from "../services/mapService.js";
import { MapElementFactory } from "vue2-google-maps";
import activityService from "@/services/activity-Service.js";
import categoryCmp from "../components/category-cmp";
import activityPreview from "../components/activityPreview";
import { EventBus } from "@/eventBus.js";

import mainPlaces from "../components/mainPlaces";
export default {
  props: ["route"],
  components: {
    categoryCmp,
    activityPreview,
    mainPlaces,

  },
  name: "GoogleMap",
  watch: {
    addedActivities: (n, o) => {
    }
  },
  data() {
    return {
      isLoading:true,
      addedActivities: [],
      markers: [],
      filterBy: null,
      cities: [],
      currRoute: null,
      markerTypes: {
        park: "https://img.icons8.com/color/26/000000/forest.png",
        restaurant: "https://img.icons8.com/color/26/000000/dining-room.png",
        locality: "https://img.icons8.com/material-two-tone/30/000000/city.png",
        default: "https://img.icons8.com/color/16/000000/region-code.png"
      },
      currRoute: {},
      directionReq: {
        origin: null,
        destination: null
      },

      directions: null,
      geocoder: null,
      places: null,
      directionsDisplay: null,
      map: null,

      activities: [],
      center: { lat: 32, lng: -33 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
    this.$gmapApiPromiseLazy().then(() => {
      this.getRoute();
    });
    if (localStorage.getItem("added"))
      this.addedActivities = JSON.parse(localStorage.getItem("added"));
    if (localStorage.getItem("markers")) {
      this.markers = JSON.parse(localStorage.getItem("markers"));
      this.markers.forEach(marker => {
        // new google.maps.Marker({
        //   position: { lat: marker.lat(), lng: marker.lng() },
        //   map: this.map,
        //   icon: "https://img.icons8.com/metro/26/000000/pin.png"
        // });
      });
    }
    setTimeout(()=>{
      this.filter('All')},4000)
      
  },

  methods: {
    finishedloading(){
      this.isLoading=false;
    },
    onBooked() {
      this.$store.dispatch("onbooked");
    },
    onSearched(route) {
      this.currRoute = route;
      this.getRoute();
    },
    view(activity) {
    },
    removeActivity(googleId) {
      var idx = this.addedActivities.findIndex(activity => {
        return activity.googleId === googleId;
      });
      this.addedActivities.splice(idx, 1);
    },
    handleScroll(event) {},
    scrollDown() {
      window.scrollTo(0, 750);
    },
    addToPlan(activity) {
      var found = this.addedActivities.find(act => {
        return act.googleId === activity.googleId;
      });
      if (found) {
        //TODO ALREADY ADDED ACTIVITY

        return;
      }
      this.addedActivities.push(activity);
      var address = activity.address;
      this.geocoder.geocode({ address }, (r, s) => {
        var lat = r[0].geometry.location.lat();
        var lng = r[0].geometry.location.lng();
        var myLatLng = new google.maps.LatLng({ lat, lng });
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(
          "<div><strong>" +
            activity.title +
            `<img width=50 height=50 src=${activity.imgs[0]}>` +
            "</strong><br>" +
            "activity ID: " +
            activity.googleId +
            "<br>" +
            activity.address +
            "</div>"
        );
       var marker=  new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          animation: google.maps.Animation.DROP,
          icon: "https://img.icons8.com/ios/25/000000/pin-filled.png"
        });
        marker.addListener("click", function() {
          infowindow.open(this.map, marker);
        });
        this.markers.push(myLatLng);
        // marker.addListener("click", () => {
        //   infowindow.open(this.map, marker);
        // });

        localStorage.setItem("added", JSON.stringify(this.addedActivities));
        localStorage.setItem("markers", JSON.stringify(this.markers));
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
    filter(filterBy) {
      this.getRoute(filterBy);
    },
    getRoute(filterBy) {
      this.activities = [];
      this.initRoute();
      this.directions.route(this.directionReq, (res, status) => {
        //route
        if (status == google.maps.DirectionsStatus.OK)
          new google.maps.DirectionsRenderer({
            map: this.map,
            directions: res
          });
        var points = res.routes[0].overview_path;
        this.scanRoute(points, filterBy);
      });
    },
    scanRoute(route, filterBy) {
      route.forEach((point, idx) => {
        var lat = point.lat();
        var lng = point.lng();
        var latlng = new google.maps.LatLng({ lat, lng });
        if (idx % ((Math.random() * 10) | 0) === 0) {
          new google.maps.Marker({
            position: latlng,
            map: this.map,
            icon: this.markerTypes.default
          });
        }
        if (idx % 30 === 0) {
          this.places.nearbySearch(
            { location: latlng, radius: 2000, type: filterBy },
            (r, s) => {
              if (r) {
                r.forEach(place => {
                  if (place.types.includes("locality"))
                    this.cities.push(place.name);
                  if (!place.rating || !place.photos) return;
                  var lat = place.geometry.location.lat();
                  var lng = place.geometry.location.lng();
                  var modifiedPlace = { imgs: [] };
                  if (place.photos)
                    place.photos.forEach(photo => {
                      modifiedPlace.imgs.push(
                        photo.getUrl({ maxWidth: 350, maxHeight: 400 })
                      );
                    });
                  modifiedPlace.address = place.vicinity;
                  modifiedPlace.added = false;
                  modifiedPlace.reviews = [];
                  modifiedPlace.googleId = place.place_id;
                  modifiedPlace.title = place.name;
                  modifiedPlace.rating = place.rating || 0;
                  modifiedPlace.ratingCount = place.user_ratings_total || 0;
                  modifiedPlace.type = place.types[0];
                  modifiedPlace.isPremium = place.rating > 4.5 ? true : false;
                  modifiedPlace.price = place.price_level || 0;
                  this.activities.push(modifiedPlace);
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    icon:
                      this.markerTypes[place.types[0]] ||
                      this.markerTypes.default,

                    map: this.map,
                    title: `${place.types[0]}, ${place.name}`
                  });
                });

              }
            }
          );
        }
      });
      
    },

    view(activity) {
      activityService.getByGoogleId(activity).then(res => {
        this.$router.push("activity/" + res._id);
      });
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  created() {
    
    this.getRoute(this.route);
  }
};
</script>
<style scoped lang=scss>
.map {
  width: 60vw;
  height: calc(100vh - 100px);
  filter: grayscale(20%);

  border-left: 0.1px solid #999;
}
.main-container {
  margin:0 auto;
  margin-top:70px;
  height: calc(100vh - 70px);
  width:95vw;
  
  overflow: hidden;
  border-top: 1px #ccc solid;
  display:flex;
}
.loading{
  position:fixed;
margin-left:45vw;
margin-top:45vh;

}



</style>
