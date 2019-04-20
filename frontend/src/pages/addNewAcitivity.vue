<template>

<div class="row">
  <div class="col-75">
    <div class="container">
      <form> 
        <div class="row">
          <div class="col-50">
            <h3>Add new Place</h3>
            <label for="ftitle"><i class="title"></i>Title</label>
            <input type="text" placeholder="Title" v-model="place.title">
            <label for="phone"><i class=""></i>Phone</label>
            <input type="text" placeholder="Phone number" v-model="place.phone">
            <label for="adr"><i class=""></i>Address</label>
            <input type="text" placeholder="Address" v-model="place.address">
            <label for="price"><i class=""></i>Price</label>
            <input type="number" placeholder="Price" v-model="place.price">
            <label for="type">Type</label>
            <div id="type-select">
                <select v-model="place.type">
                     <option value="" selected="selected" disabled="disabled">Select a type of place</option>
                    <option value="food">Food</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="family">Family</option>
                </select>
            </div>

            <label for="open-hour">Hours of Operation</label>
            <select v-model="place.recommendedTime">
                <option value="" selected="selected" disabled="disabled">Select an open hours</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
                <option value="all-day">All-Day</option>
            </select>
            <label for="desc"><i class=""></i>Description</label>
            <textarea rows = "5" cols = "40" v-model="place.desc">Description
            </textarea>
          </div>
        </div>
        <input @click.prevent ="saveNewPlace(place)" value="Save" class="btn">
      </form>
    </div>
  </div>
</div>

</template>
<script>
export default {
   data() {
       return {
           place: {
                "title": null,
                "phone": null,
                "desc": null,
                "mainImg":null,
                "rating": 0,
                "ratingCount": 0,
                "reviews": [],
                "type": null,
                "isPremium": false,
                "recommendedTime": null,
                "price:": null,
                "address": null,
                }      
       } 
   },
   methods: {
       saveNewPlace(place) {
            console.log(place);
                this.$store.dispatch("addPlace", { place })
       }
   } 
}
</script>
<style scoped>
.body {
  font-family: Arial;
  font-size: 17px;
  padding: 8px;
}

* {
  box-sizing: border-box;
}
h3 {
    text-align: center;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 10px 0px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input {
    /* width: 250px; */
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
    border-bottom: 2px solid currentcolor;
    font-weight: bold;
    letter-spacing: .15em;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}

textarea {
    width: 100%;
    resize: none;
}

.type-select {
    margin-bottom: 1em;
    padding: .25em;
    border: 0;
    /* border-bottom: 2px solid currentcolor;  */
    font-weight: bold;
    letter-spacing: .15em;
    border-radius: 0;
}

select {
    margin-bottom: 1em;
    padding: .25em;
    border: 0;
    border-bottom: 2px solid currentcolor; 
    font-weight: bold;
    letter-spacing: .15em;
    border-radius: 0;
}
</style>