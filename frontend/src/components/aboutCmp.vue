
<template>
  <section class="about-cmp">
  <div class="about-us-img">
    <!-- <img src="../../img/about-us6.jpg"/> -->
    <parallax :speed-factor="0.3" breakpoint="(min-width: 80px)">
  <img src="https://res.cloudinary.com/explority/image/upload/v1556370948/about-us6_m1j1mq.jpg">
</parallax>
  </div>
  <div class="about-text">
    <h1>About Us</h1>
    <p>
      This project is our finale project at  CodingAcamdemy WEB development  course with Vue,Veux,node.js,MongoDB.
    </p>
    </div>
    <div class="team-members-section">
    <h1>Meet the Team</h1>
      <div class="team-members-container">
      <div class="team-member">
        <div class="team-member-img">
        <img src="https://res.cloudinary.com/explority/image/upload/c_scale,h_307/v1556381403/moshe_profile_1_dvqibi.jpg"/>
        </div>
        <h2>Moshe Melamed</h2>
        <h3>WEB Developer</h3>
        <div class="social-media">
          <img src="https://res.cloudinary.com/explority/image/upload/c_scale,h_45/v1556431891/linkdn_k4sqpj.png"/>
        </div>
      </div>
     <div class="team-member">
        <div class="team-member-img">
        <img src="
https://res.cloudinary.com/explority/image/upload/v1556427575/team-member2_hkb0mt.jpg"/>
        </div>
        <h2>Michael </h2>
        <h3>WEB Developer</h3>
      </div>
      
          <div class="team-member">
        <div class="team-member-img">
        <img src="
https://res.cloudinary.com/explority/image/upload/v1556370946/review3_up4ryd.jpg"/>
        </div>
        <h2>Danny </h2>
        <h3>WEB Developer</h3>
      </div>
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
.social-media img{
  width:25px;
  height: 25px;
}
h2{
  font-family: "Dosis","cursive";
  font-size: 18px;

}
h3{
  font-family:"monospace";
  font-size:14px;
}
.team-members-container{
  display: flex;
  justify-content: space-around;
  width:70vw;
  margin:0 auto;
  margin-top:60px;
  margin-bottom:60px;
  
}
.team-member-img{
  width: 200px;
  height: 250px;
  
  overflow-x: hidden;
}
.team-member-img img{
  width:100%;
  height: 98%;

}
.team-members-section{
  width:70vw;
  margin:0 auto;
}
parallax{
  height:100%;
  overflow-x: hidden;
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
         margin-top: 62px;
        font-size: 36px;
        font-family: 'Dosis', sans-serif;
}
.about-us-img{
 
    margin-top: 70px;
    width: 100vw;
    height: 100vh;
overflow-x: hidden;

}
.about-cmp{
  overflow-x: hidden;
  width:100vw;
}

</style>
