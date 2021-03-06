import Vue from 'vue'
import Vuex from 'vuex'

const userKey = "userSession";
import activityService from './services/activity-Service.js';
import userService from './services/user-service.js';
import storageService from './services/storageService.js'
import socketService from './services/socket-service.js'
import { EventBus } from '@/eventBus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activitiesForDisplay: null,
    isConnected: false,
    user: 0,
    currActivity: null
  },
  mutations: {
    addToFavorite(state, payload) {
      var found = state.user.userActivities[0].favorited.find(fav => fav.googleId === payload.activity.googleId)

      if (!found) {
        state.user.userActivities[0].favorited.push(payload.activity);
      }
      storageService.saveToStorage(userKey, state.user);
    },
    connectUser(state, payload) {
      state.isConnected = true;
      state.user = payload.user;
      storageService.saveToStorage(userKey, payload.user);

    },
    disconnectUser(state) {
      state.isConnected = false;
      state.user = 0;
      storageService.saveToStorage(userKey, null)
    },
    loadActivities: (state, payload) => {

      state.activitiesForDisplay = payload.activities;
    },
    loadActivity: (state, payload) => {
      state.currActivity = payload
    },

    setNewPlace(state, { currActivity }) {
      let newActivity = activityService.createActivity(currActivity);
      state.currActivity.unshift(newActivity);
    },
    bookAnActivity(state, payload) {
      state.user.userActivities[1].attended.push(payload.activity);
    },
    removeFromActivity(state, payload) {
      let activityTypeId = payload.activity.id;
      let userActivitiesType;
      if (activityTypeId === 0 ) {
        userActivitiesType = state.user.userActivities[activityTypeId].favorited;
      } else {
        userActivitiesType = state.user.userActivities[activityTypeId].attended;
      }
      let length = userActivitiesType.length;
      let searchId = payload.activity.activityIdx;
      for (let index = 0; index < length; index++){
        if(userActivitiesType[index].googleId === searchId){
          let remove = userActivitiesType.splice(index ,1);
          console.log('remove index ' ,remove);
          storageService.saveToStorage(userKey, state.user);
          userService.update(state.user);
          break; 
        }
      }
    }

  },
  getters: {
    userAttendedActivities(state) {
      return state.user.userActivities[1]
    }
    ,
    userFavoritedActivities(state) {
      return state.user.userActivities[0]
    }
    ,
    activitiesForDisplay(state) {
      return state.activitiesForDisplay
    },
    isConnected(state) {
      return state.isConnected
    },
    user(state) {

      return state.user;
    }
  },
  actions: {
    updateUser(context) {
      let curUser = context.getters.user;
      userService.update(curUser);
    },
    bookAnActivity(context, payload) {

      context.commit({ type: 'bookAnActivity', activity: payload.activity });
    },
    userCount(context, payload) {

      EventBus.$emit('usercount', payload.online);
    },
    bookedActivity(context, payload) {

      EventBus.$emit('sendpupup');
    },
    onbooked(context, payload) {
      socketService.emit('booked', { booked: 'bookkk!!' })
    },
    addToFavorite(context, payload) {
      console.log(payload.activity)
      context.commit({ type: 'addToFavorite', activity: payload.activity });
    },
    loadFourActivities(context) {
      activityService.query()
        .then((activities) => {
          context.commit({ type: 'loadActivities', activities: activities.slice(0, 4) })
        })

    },
    loadActivities(context) {

      activityService.query()
        .then((activities) => {
          context.commit({ type: 'loadActivities', activities: activities })
        })
    },
    loadActivity(context, id) {
      activityService.getById(id).then(res => {
        context.commit('loadActivity', res)
      })
    },
    disconnectUser(context) {
      context.commit({ type: 'disconnectUser' });
    },
    checkIfLoggedOn(context) {
      var user = storageService.loadFromStorage(userKey);
      if (user !== null) {
        context.commit('connectUser', { user })

      } else {
        context.commit({ type: 'disconnectUser', });
      }
    },
    addPlace(context, { place }) {
      return activityService.add(place)
      // .then(place => {
      //   context.commit({ type: 'setNewPlace', place })
      // })
    },
    removeFavFromActivity(context, payload) {
      context.commit({ type: 'removeFromActivity', activity:{ id: 0,  activityIdx:payload} })
    },
    removeBookedFromActivity(context,payload) {
      context.commit({ type: 'removeFromActivity', activity:{ id: 1,  activityIdx:payload} })
    }
  }

})
