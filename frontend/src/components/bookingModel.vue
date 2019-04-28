<template>
  <div v-if="activityToBook" class="booking-model slide-in-fwd-center">
    <span @click="close" class="close-btn">X</span>
    <div class="wrapper-book">
      <div class="top-section">
        <h1 class="title">{{activityToBook.title}}</h1>
      </div>
      <form class="flex column space-around" action>
        <div class="date-picker">
          <date-picker class="picker"></date-picker>
        </div>
        <!-- <input class="time-picker" type="time" placeholder="pick time"> -->
        <select name id>
          <option class="select-placeholder" value disabled selected>Guests</option>

          <option value>1</option>
          <option value>2</option>
          <option value>3</option>
          <option value>4</option>
          <option value>5</option>
        </select>
        <div class="book-btn-container">
          <button @click="book(activityToBook)" class="book-btn">Book Now</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import datePicker from "./date-picker";

export default {
  data() {
    return {};
  },
  props: ["activityToBook"],
  components: {
    datePicker
  },
  methods: {
    book(activityToBook) {
     
      this.$emit("booked");
    },
    close() {
      this.activityToBook = null;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");
select {
  width: 82%;
  margin-top: 18px;
  margin-bottom: 18px;
  height: 40px;
}
.book-btn-container {
  display: flex;
  width: 82%;
  justify-content: flex-end;
}
.wrapper-book {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
.date-picker {
  width: 82%;
}
.close-btn {
  text-align: right;
  font-size: 1.2em;
  font-weight: 600;
  font-family: "Lato", sans-serif;
  cursor: pointer;
}
.shablon-txt {
  color: hsl(33, 68%, 76%);
  font-weight: 600;
  font-family: "Lato", sans-serif;
}
.title {
  font-size: 2rem;
  padding-bottom: 33px;
}
.top-section {
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.book-btn {
  background: #db3955;
  border: none;
  padding: 12px;
  width: 36%;
  color: white;
  font-weight: 600;
  text-align: center;
}
.booking-model {
  left: 38vw;
  top: 19vh;
  position: fixed;
  background: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  z-index: 999999999999;
  width: 366px;
  height: 371px;
  color: #383838;
}

.main-img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
input {
  border: 1px solid;
}
</style>
