
<template>
  <section class="about-cmp">
  <div class="about-us-img">
    <!-- <img src="../../img/about-us6.jpg"/> -->
    <parallax :speed-factor="0.3" breakpoint="(min-width: 80px)">
  <img src="../../img/about-us6.jpg">
</parallax>
  </div>
  <div class="about-text">
    <h1>About Us</h1>
    <p>
      This project is a finale sprint in CodingAcamdemy WEB development  course with all the latest technologies

    </p>
    </div>
    <div class="team-members-section">
    <h1>Meet the Team</h1>
      <div class="team-members-container">
      <div class="team-member"></div>
      <div class="team-member"></div>
      <div class="team-member"></div>
    </div>
    </div>
  
  </section>
</template>


<script>
import Parallax from "vue-parallaxy";
export default {
  data() {
    return {
     
    };
  },
  mounted() {},
  created() {
   
  },
  methods: {},
  components: {
    Parallax
    
  },
  methods: {}
};
</script>

<style scoped lang="scss">

@import url("https://fonts.googleapis.com/css?family=Dosis:600");
.team-members-container{
  display: flex;
  justify-content: space-between;
  margin-top:60\
  px;
}
.team-member{
  width: 325px;
  height: 290px;
  border:1px solid ;
}
.team-members-section{
    width:70vw;
  margin:0 auto;
}
parallax{
  height:100%;
}
.about-text{
  width:70vw;
  margin:0 auto;
 
 
}
.about-text p{
  margin-top:26px;
  color:#484848;
    font-size: 18px;
    line-height: 1.66667;
    font-family: cursive;
}
 h1{
         margin-top:36px;
        font-size: 36px;
        font-family: 'Dosis', sans-serif;
}
.about-us-img{
 
    margin-top: 73px;
    width: 98vw;
    height: 99vh;


}
.about-us-img img{
  width:100%;
  height: 100%;
}
</style>
