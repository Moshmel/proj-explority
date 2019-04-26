
<template>
  <section class="my-activities ">
    <div class="personal-details">
      <div class="user-img">
        <img src="../../img/review2.jpg">
      </div>
      <div class="bottom-personal-details">
        <h2>Username : &nbsp &nbsp {{user.username}}</h2>
        <h2>Email : &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{user.email}}</h2>
      </div>
    </div>
    <div class="right-section">
      <div class="attended-activities">
        <h1> favorited</h1>
            <div class="carousel-container">
          <carousel
            adjustableHeight="true"
            navigationEnabled="true"
            paginationEnabled="false"
            speed="300"
          >
            <slide class="slide" v-for="activity in favorited" :key="activity.googleId">
              <activity-preview :activity="activity"></activity-preview>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="booked-activities"> <h1>booked</h1>
                  <div class="carousel-container">
          <carousel
            adjustableHeight="true"
            navigationEnabled="true"
            paginationEnabled="false"
            speed="300"
          >
            <slide class="slide" v-for="activity in attended" :key="activity.googleId">
              <activity-preview :activity="activity"></activity-preview>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import activityPreview from './activityPreviewMyActivities';
import { Carousel, Slide } from 'vue-carousel';
export default {
  data() {
    return {
      favorited: this.$store.getters.userFavoritedActivities.favorited,
      attended: this.$store.getters.userAttendedActivities.attended,
      user: this.$store.getters.user
    };
  },
  mounted() {},
  created() {
    // var id = this.$route.params.id;
    // activityService.getById(id).then(res => {
    //   this.activity = res.activity;
    //   console.log(this.activity);
    // });
  },
  methods: {},
  components: {
    Carousel,
    Slide,activityPreview
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Dosis:600");
.slide {
  width: 256px;
}
.right-section{
  width:66%;
  margin-top:26px;
}
.wrapper {
  margin: 0 auto;
}
h1{
      font-size: 42px;
font-family: 'Dosis', sans-serif;
    
}
.bottom-personal-details {
  border-top: 1px solid rgb(228, 228, 228);
  padding-top: 26px;
}
h2 {
  margin-bottom: 16px;
  font-family: Dosis;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.375em !important;
  color: rgb(72, 72, 72) !important;
}
.my-activities {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 70px;
  width: 90vw;
  padding-top: 30px;
}
.user-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 26px;
}
.my-activities img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.personal-details {
  margin-top: 26px;
  width: 325px;
  border: 1px solid rgb(228, 228, 228);
}
.carousel-container{
  margin-top:32px
}
</style>
