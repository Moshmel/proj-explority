
<template>
  <section class="cover-img slide-in-fwd-center">
    <!-- <img ref="vid"  src="../../public/img/bg.jpg"> -->
    <div class="flex">
      <div class="form-container flex fade-in">
        <div class="flex main-conteiner">
          <div class="inner-container">
            <h1 class="form-title">Plan your road trip!</h1>
            <form action class="flex column">
              <div class="input-container">
                <lable>From</lable>
                <img src="https://img.icons8.com/ios/35/000000/near-me.png">
                <input v-model="route.origin" type="text"  class="text-input">
              </div>
              <div class="input-container">
                <lable>To</lable>
                <img src="https://img.icons8.com/ios/35/000000/treasure-map.png">
                <input
                  v-model="route.destination"
                  type="text"
                  class="text-input"
                  
                >
              </div>
              <div class="flex btn-ctn">
                <button class="search-btn" @click="onSearchClick">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </section>
</template>s

<script>
import { EventBus } from "@/eventBus";
export default {
  name: "navbar-menu",
  data() {
    return {
      route: {
        origin: "Berlin",
        destination: "Amsterdam"
      }
    };
  },
  methods: {
    onSearchClick() {
      this.$emit("searched", this.route);
    },
    getFixedRoute(e) {
      var origin = e.target.getAttribute("value").split(",")[0];
      var dest = e.target.getAttribute("value").split(",")[1];
      var route = { origin: origin, destination: dest };
      this.$emit("searched", route);
    }
  },
  mounted() {
    this.$refs.vid.playbackRate = 1.2;
    this.$refs.vid.addEventListener("timeupdate", function() {
      if (this.currentTime >= 7.4) {
        this.pause();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.main-conteiner {
  padding-left: 49px;
  padding-top: 40px;
  padding-bottom: 49px;
  padding-right: 10px;
}
.btn-ctn {
  justify-content: flex-end;
  width: 302px;
}
.form {
  text-align: center;

  width: 100%;
}
.cover-img {
  width:100vw;
  font-family: "Lato";
  text-transform: uppercase;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  -ms-flex-direction: column;
  flex-direction: column;
  display: -ms-flexbox;
  background-image: url("https://res.cloudinary.com/explority/image/upload/v1556370950/bgimg_fb3uzq.png");
}
.right-section {
  border: 3px solid;
  color: white;
}
.right-section span {
  display: flex;
}
.input-container {
  position: relative;
  width: 80%;
  img {
    position: absolute;
    top: 34%;
    left: 87%;
    opacity: 0.5;
  }
}

img {
  height: auto;
}
.form-title {
  color: black;
  font-family: sans-serif;
  font-size: 1.6rem;
  width: 349px;
  margin-bottom: 16px;
}
.form-container {
  color: black;
  position: absolute;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  top: 160px;
  left: 172px;
  background-color: white;
  border-radius: 5px;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    visibility: initial;
  }
}

.text-input {
  margin-top: 8px;
  width: 300px;
  height: 46px;
  font-size: 22px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
}
.search-btn {
  padding: 16px;
  margin-top: 34px;

  background: #8d0f22;
  color: #fff;
  border-radius: 4px;
  border: 1px solid #fff;
  cursor: pointer;
  width: 100px;
}
</style>