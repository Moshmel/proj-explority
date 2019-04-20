function initMap(vue) {
    vue.map = vue.$refs.map.$mapObject;
    vue.places = new google.maps.places.PlacesService(vue.map);
    vue.directions = new google.maps.DirectionsService();
    vue.geocoder = new google.maps.Geocoder();
    vue.directionsDisplay = new google.maps.DirectionsRenderer(vue.map);
    

}


export default {
    initMap
}