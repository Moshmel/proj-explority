
<template>
  <div class="wrapper">
    <div class="activity grid">
      <div>
        <img class="main-img" :src="activity.imgs">
      </div>
      <div class="info">
        <p class="type">{{activity.type}}</p>
        <div class="flex space-between de">
          <h1 class="title">{{activity.title}}</h1>
          <button class="book-btn" type="button">Book now!</button>
        </div>
        <img
          src="https://img.icons8.com/ios-glyphs/24/000000/marker.png"
          style="margin-left: -6px;"
        >
        <span>{{activity.address}}</span>
        <star-rating
          :rating="activity.rating"
          :inline="false"
          :star-size="20"
          :read-only="true"
          :show-rating="true"
          :round-start-rating="false"
        ></star-rating>
        <p>rated : {{activity.ratingCount}} times</p>
        <div class="about">
          <h1>About Exprience</h1>
          <p>
            The session is for those who have an interest in becoming a barista, or for people to develop an existing coffee skill set.
            This course focuses on the key skills required to set your grinder, make espresso, and foam and texture milk for cappuccinos.
            We will also cover some fundamental info on the daily care and maintenance of your equipment.
          </p>
          <p>
            voluptate, dignissimos deleniti totam quasi provident explicabo
            quaerat nesciunt numquam nisi!s
          </p>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="side-reviews">
        <h1>Guest reviews</h1>
        <h2>{{activity.rating}} star rating</h2>
      </div>
      <div class="reviews-section">
        <div class="review-item">
          <div class="user-details flex">
            <img
              src="https://res.cloudinary.com/explority/image/upload/v1556370947/review1_ckvqym.jpg"
            >
            <div class="user-name">
              <h3>Mariah Davidson</h3>
              <star-rating
                :rating="activity.rating"
                :inline="true"
                :star-size="20"
                :read-only="true"
                :show-rating="false"
              ></star-rating>
            </div>
          </div>
          <p>This tour was amazing. I had a great time even though it was raining during our tour. Mayno is such a sweet lady... she gave me a gift, she’s very polite and she really made sure that I would enjoy the whole kawaii experience in Harajuku.</p>
        </div>
        <div class="review-item">
          <div class="user-details flex">
            <img
              src="https://res.cloudinary.com/explority/image/upload/v1556370946/review2_acdcli.jpg"
            >
            <div class="user-name">
              <h3>Dan Brodvick</h3>
              <star-rating
                :rating="activity.rating"
                :inline="true"
                :star-size="20"
                :read-only="true"
                :show-rating="false"
              ></star-rating>
            </div>
          </div>
          <p>My wife and I wanted to experience the Kawaii culture and Mayno did such a great job showing us around. She was so nice - It was pouring rain and she moved the time around so we would be able to enjoy the tour without the rain.</p>
        </div>
        <div class="review-item">
          <div class="user-details flex">
            <img
              src="https://res.cloudinary.com/explority/image/upload/v1556370946/review3_up4ryd.jpg"
            >
            <div class="user-name">
              <h3>Sarah Atir</h3>
              <star-rating
                :rating="activity.rating"
                :inline="true"
                :star-size="20"
                :read-only="true"
                :show-rating="false"
              ></star-rating>
            </div>
          </div>
          <p>sweet lady... she gave me a gift, she’s very polite and she really made sure that I would enjoy the whole kawaii experience in Harajuku. We went to different cute stores... all of them were unique.</p>
        </div>
      </div>
    </div>
    <div class="my-comment flex">
      <div class="side-leave-comment">
        <h1>Leave a Comment!</h1>
      </div>
      <div class="leave-comment">
        <div class="review-title-section grid">
          <input v-model="newReview.title" type="text" placeholder="Title">
        </div>
        <star-rating class="star" v-model="newReview.rating" :star-size="20"></star-rating>
        <div>
          <textarea v-model="newReview.txt" name id cols="30" rows="10"></textarea>
        </div>
        <div class="bottom-btn">
          <button class="comment-btn" @click="sendReview" type="button">Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

import StarRating from "vue-star-rating";
import activityService from "@/services/activity-Service.js";
import utilService from "@/services/utilService.js";
export default {
  data() {
    return {
      socket: io("localhost:3003"),
      showRating: false,
      activity: {},
      newReview: {
        id: utilService.makeId(9),
        txt: null,
        rating: 0,
        user: this.$store.getters.user,
        createdTime: Date.now()
      },
      showRating: false,
      isConnect: this.$store.getters.isConnected,
      addReview: false
    };
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      console.log(data);
    });
  },
  created() {
    var id = this.$route.params.id;

    activityService.getById(id).then(res => {
      this.activity = res.activity;
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
    }
  },
  components: {
    StarRating
  },
  methods: {
    socketAction() {
      this.activity.creator = {
        name: "Danny",
        email: "Dannyboris1993@gmail.com",
        bookedEvent: ["mcdonalds"]
      };
      var loggedUser = localStorage.getItem("userSession");
      this.socket.emit("send_msg", this.activity);
    },
    trigerReviewBtn() {
      this.addReview = !this.addReview;
    },
    sendReview() {
      let activity = this.activity;
      let review = { ...this.newReview };
      activity.reviews.push(review);
      activityService.update(activity);
    },
    setRating(rating) {
      this.newReview.rating = rating;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Dosis:600");
.book-btn {
  border-radius: 5px;
  background: #a5467d;
  color: white;
  font-family: "Dosis", sans-serif;
  /* font-weight: 600; */
  letter-spacing: 0.1em;
  bottom: 0%;
  font-size: 18px;
  height: 52px;
  width: 148px;
}
.comment-btn {
  padding: 10px 22px;
  color: rgb(0, 132, 137);
  border: 2px solid rgb(0, 132, 137);
  background-color: white;
}
.bottom-btn {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.star {
  margin-top: 24px;
  margin-bottom: 8px;
}
textarea {
  margin-bottom: 24px;
  width: 100%;
}
.leave-comment {
  width: 70vw;
}
.side-leave-comment h1 {
  display: inline-block;
}
.side-leave-comment {
  width: 34vw;
}
.side-leave-comment {
  font-size: 32px;
  color: #484848;
  font-family: "Dosis", sans-serif;
  margin-bottom: 18px;
}
.review-title-section input {
  height: 27px;
}
.review-title-section {
  margin-top: 24px;
  font: 18px cursive;
}
.leave-comment h1 {
  font: 32px cursive;
}
.leave-comment button {
  margin-right: 2px;
}
.review-item p {
  margin-top: 24px;
  font-size: 18px;
  font-family: "Dosis", sans-serif;
  line-height: 1.6;
}
.user-name {
  margin-left: 23px;
  margin-top: 5px;
  font-size: 16px;
}
.user-details img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.review-item {
  height: 180px;
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid #efefef;
}
.side-reviews h1 {
  font-size: 32px;
  color: #484848;
  font-family: "Dosis", sans-serif;
  margin-bottom: 18px;
}
.side-reviews h2 {
  font-size: 18px;
  color: #484848;
  font-family: "Dosis", sans-serif;
  margin-bottom: 18px;
}
.side-reviews {
  width: 442px;
  //  border: 1px solid #9999;
  height: 620px;
}
.reviews-section {
  width: 885px;
  //  border: 1px solid #9999;
}
.about {
  margin-top: 40px;
}
.about p {
  font-size: 18px;
  font-family: cursive;
  max-width: 645px;
  margin-top: 36px;
}
.about h1 {
  font-size: 18px;
  font-family: "Dosis", sans-serif;
}
.wrapper {
  margin: 0 auto;
  margin-top: 116px;
  width: 85vw;
}
.type {
  font-size: 14px;
  margin-bottom: 6px;
  font-family: sans-serif;
  margin-left: 7px;
}
.info {
  margin-left: 42px;
  width: 40vw;
}
.title {
  font-size: 46px;
  font-family: "Dosis", sans-serif;
  margin-bottom: 34px;
}
.activity {
  margin-bottom: 84px;
  grid-template-columns: 1fr 50vw;
  grid-template-rows: auto;
}
.main-img {
  width: 100%;
  height: auto;
}

@media screen and (max-width: 768px){
  .activity {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .info {
    width: 80vw;
  }
  .side-reviews:first-child {
    height: 100px;
  }
  .review-item {
    width: 85vw;
  }
  .my-comment{
    display: grid;
  }
}

@media only screen and (max-width: 600px) {
  .info {
    margin-left: 0px;
    width: 90vw;
  }
  .review-item {
    height: auto;
  }
  .review-item p {
    width: 80vw;
  }
}

</style>
