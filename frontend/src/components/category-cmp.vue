


<template>
  <div class="container">
    <div class="categories flex space-between">
      <div >
        <img ref='global' title="All" value="" @click="filter" src="https://img.icons8.com/ios/25/000000/globe.png">
      </div>
      <div>
        <img   title="Culture" value="museum" @click="filter" src="https://img.icons8.com/ios/25/000000/museum.png">
      </div>
      <div>
        <img  title="Food" value="restaurant" @click="filter"  src="https://img.icons8.com/ios/25/000000/dining-room.png">
      </div>
      <div>
        <img  title="Nature" value="park" @click="filter"  src="https://img.icons8.com/ios/25/000000/forest.png">
      </div>
        <div>
        <img  title="Hostels" value="lodging" @click="filter" src="https://img.icons8.com/ios-glyphs/25/000000/sleeping-in-bed.png">
      </div>
    </div>
  </div>

</template>
<script>
export default {
  mounted(){
    var str="All"
    setTimeout(()=>{
         this.$emit("filter", filterBy);
    },8000)
    
  },
  data() {
    return {
      filterBy: "",
      previouslySelected: null
    };
  },
  methods: {
    filter(event) {
      if (this.previouslySelected)
        this.previouslySelected.classList.remove("active");
      this.filterBy = event.target.getAttribute("value");
      event.target.className += "active";
      this.previouslySelected = event.target;
      this.$emit("filter", this.filterBy);
    }
  },
  mounted() {
    this.$refs.global.className += "active";
    this.previouslySelected = this.$refs.global;
          this.$emit("filter", 'All');
  }
};
</script>

 <style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Abel");

* {
  box-sizing: border-box;
  font-family: "Abel";
}
img{
  cursor: pointer;
}
.active {
  background: #999;
}
.categories {
  display: flex;
  width: 100%;
  justify-content: space-around;
  @media  (max-width: 730px)
{
  
    width: 90vw !important;
  

}
}
.category-title {
  font-size: 2em;
}

.container {
  margin: 13px;
}
.categories img {
  border: 1px solid #999;
  padding: 6px;
  border-radius: 50px;
}
img:hover {
  border-color: rgb(226, 86, 73);
}
span {
  display: block;
  border: none;
  background: none;
}

</style>
