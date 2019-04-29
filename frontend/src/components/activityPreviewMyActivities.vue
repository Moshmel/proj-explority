<template>
  <div class="activity-preview slide-in-fwd-center" @click="viewDetails(activity)">
    
    <img class="main-img" :src="activity.imgs[0]" @load="loaded" alt="">
    <div class="bottom-container">
    <div class="info-container">
      <div class="title-section flex row space-between">
        <h1 class="title-tag">{{title}}</h1>
          <span   class="remove-btn">
            <img src="https://res.cloudinary.com/explority/image/upload/v1556370946/remove-icon_feq8nx.png" @click.stop.prevent="removeActivity(activity.googleId)"/>
          </span>
      </div>
      <star-rating :star-size=15 active-color="#CF4A3F" read-only v-model.number="activity.rating">
      </star-rating>
      <p class="address-tag">{{activity.address}}</p>
      <span class="type-tag">{{type}}</span>
    </div>

    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  props: ["activity"],
  components: {
    StarRating
  },
  computed: {
    title() {
      var title =
        this.activity.title.length > 15
          ? this.activity.title.substring(0, 15) + "..."
          : this.activity.title;
      return title;
    },
    type() {
      var type = this.activity.type;
      if (
        this.activity.type === "point_of_interest" ||
        this.activity.type === "natural_feature"
      )
        type = "Natural Resort";
      else if (this.activity.type.includes("_")) {
        type = this.activity.type.replace("_", " ");
      }
      return type;
    }
  },
  methods: {
    removeActivity(value){
      this.$emit('clicked', value)
    },
    loaded(){
      this.$emit('loaded');
    }
    ,
    addToPlan(activity) {
      this.activity.added = true
      this.$emit("addToPlan", this.activity);
    },
    book(activity) {
      this.$emit("book", activity);
    },
    viewDetails(activity) {
      this.$emit("viewDetails", activity);
    }
  },
  created() {
    this.addedActivities.forEach(act => {
      if (act.googleId === this.activity.googleId) {
        this.activity.added = true;
      }
    });
  }
};
</script>

<style scoped lang="scss">
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

* {
  font-family: "Roboto";
}
.remove-btn{
  height: 18px;
  width: 18px;
}
.remove-btn img{
  width:100%;
  height: auto; 
}
.bottom-btn{
padding: 0 4px;
}
.bottom-container{
    width: 227px;
    height: 94px;
}
.free-span {
  color: #1bc31be6;
  font-size: 15px;
}

.type-tag {
  font-size: 0.9em;
  opacity: 0.4;
}
.title-tag {
  font-weight: 600;
}
.address-tag {
  opacity: 0.6;

  font-weight: 400;
}
.activity-preview {
    margin-bottom:24px;
  position: relative;
  width: 216px;
}
@import url('https://fonts.googleapis.com/css?family=Dosis:600');
.book-btn,.view-details{
  border-radius: 5px;
    background: #a5467d;
    color: white;
    font-family: "Dosis", sans-serif;
    /* font-weight: 600; */
    letter-spacing: 0.1em;
    bottom: 0%;
    font-size: 14px;
    height: 30px;
    width:70px;
    
}
.main-img {
    height: 159px;
    width: 226px;
}
.add-btn {
  align-self: flex-start;
  border: none;
  cursor: pointer;
  background: none;
  /* align-self:center; */
}
.activity-preview h1 {
}
.info-container {
  margin-left: 24px;
  margin: 7px;
  flex-grow: 1;
}
.activity-preview{
  cursor: pointer;
}
</style>
