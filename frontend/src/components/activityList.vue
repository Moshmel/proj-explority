<template>
  <div class="activity-list slide-in-fwd-center">
    <activity-preview
      :addedActivities="addedActivities"
      @book="book"
      @addToPlan="addToPlan"
      v-for="activity in activities"
      :key="activity._id"
      :activity="activity"
      @viewDetails="viewDetails"
      @loaded="loaded"
    ></activity-preview>
  </div>
</template>

<script>
import activityPreview from "./activityPreview";
export default {
  props: ["activities", "addedActivities"],
  created() {
    setTimeout(()=>{
      console.log('emit finish loading')
      this.$emit("finishedloading");
    },4000)
  },
  components: {
    activityPreview
  },
  data() {
    return {
      loadedCount: 0
    };
  },
  methods: {
    loaded() {
      this.loadedCount += 1;
      if (this.loadedCount > 4) {
        this.$emit("finishedloading");
        this.loadedCount = 0;
      }
    },
    addToPlan(activity) {
      this.$emit("addToPlan", activity);
    },
    book(activity) {
      this.$emit("book", activity);
    },
    viewDetails(activity) {
      this.$emit("viewDetails", activity);
    }
  }
};
</script>

<style scoped lang="scss">
$clr1: #a5467d;
.activity-list {
  border-top:1px solid #ccc;
  justify-content: space-evenly;
  margin: 0 auto;
  padding-top: 4px;
  overflow-y: scroll;
  margin-top: 6px;
  height: 500px;
  display: grid;
  grid-template-columns: 341px 341px;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f9f9f9;

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $clr1;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
