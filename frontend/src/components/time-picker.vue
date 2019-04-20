<template>
    
  <div class="calendar">
    <input
    @keydown='no'
      type="text"
      v-model="date"
      @focus="focus()"
      @blur="blur()"
      placeholder="Pick a date"
    >
    <div 
      class="calendar-layout"
      v-if="active"
      @mousedown.prevent
    >
      <div class="calendar-header">
        <div class="row">
          <i 
            class="material-icons"
            @click="setPreviousMonth()"
          >
            <img src="https://img.icons8.com/metro/26/000000/chevron-left.png">
          </i>
          <div class="calendar-title">
            {{ monthYearFormatted }}
          </div>
          <i
            class="material-icons"
            @click="setNextMonth()"
          >
        <img src="https://img.icons8.com/metro/26/000000/chevron-right.png">
              </i>
        </div>
        <div class="calendar-days">
          <div 
            class="day"
            v-for="day in days"
            :key="day"
          >
            {{ day | trimThreeChar }}
          </div>
        </div>
      </div>
      <div class="calendar-body">
        <div 
          class="calendar-row"
          v-bind:class="{ 'swipe-left': swipeLeft, 'swipe-right': swipeRight }"
          v-for="(row, index) in calendarDays"
          :key="index"
        >
          <div 
            class="calendar-day"
            :class="{disabled: isDisabled(cell), selected: isSelected(cell)}"
            v-bind:style="{height: cellHeightUnit}"
            v-for="(cell, index) in row"
            :key="index"
            @click="selectDay(cell)"
          >
            {{ cell.day }}
          </div>
        </div>
      </div>
      <div class="calendar-footer">
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
html,
body {
  margin: 0;
  font-family: "Google Sans", "Avenir";
}

#app {
  height: 100vh;
  width: 100%;
  background-color: #db3955;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 10vh 0;
  .container {
    width: 300px;
    height: auto;
    font-size: 20px;
    text-align: center;
    border-radius: 4px;
    padding: 20px;
  }
  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #db3955;
    border: 2px solid #fff;
    border-radius: 4px;
    color: #fff;
    font-family: "Google Sans";
    &:focus {
      outline: none;
      border: 2px solid #fff;
    }
    &::placeholder {
      color: #e9e9e9;
      font-style: italic;
    }
  }
}

.calendar {
  width: 100%;
  position: relative;
  .calendar-layout {
    position: absolute;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    animation: appear 0.3s ease forwards;
    .calendar-header {
      width: 100%;
      background-color: #ff4364;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      box-sizing: border-box;
      padding: 0 4px;
      .row {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .calendar-title {
          font-size: 16px;
        }
        i {
          font-size: 16px;
          cursor: pointer;
        }
      }
      .calendar-days {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        .day {
          max-width: calc(100% / 7);
          padding: 4px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .calendar-body {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      overflow: hidden;
      .calendar-row {
        display: flex;
        flex-direction: row;
        transition: all 0.15s ease;
        .calendar-day {
          width: calc(100% / 7);
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #f9f9f9;
          font-size: 14px;
          color: #606060;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          &.disabled {
            background-color: #f3f3f3 !important;
          }
          &.selected {
            color: #ff4364;
            &:after {
              width: 100%;
            }
          }
          &:after {
            content: "";
            height: 3px;
            width: 0px;
            background: #ff4364;
            position: absolute;
            bottom: 0;
            transition: all 0.3s ease;
          }
          &:hover {
            color: #ff4364;
          }
          &:hover:after {
            width: 100%;
          }
        }
        &.swipe-left {
          opacity: 0;
          transform: translateX(10px);
        }
        &.swipe-right {
          opacity: 0;
          transform: translateX(-10px);
        }
      }
    }
    .calendar-footer {
    }
  }
}

@keyframes appear {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(5px);
    opacity: 1;
  }
}
</style>












  `,
