import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import City from './pages/City.vue';
import activityDetails from './components/acitivityDetails.vue';
import addNewAcitivity from './pages/addNewAcitivity.vue';
import myActivities from './components/myActivities.vue'
import resultCmp from './components/resultCmp'
import about from './components/aboutCmp'
Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/about',
      name: 'my-activities',
      component: about
    },
    {
      path: '/my-activities',
      name: 'my-activities',
      component: myActivities
    },
    
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/activity/:id',
      name: 'activity',
      component: activityDetails,
    
    },
    {
      path:'/results',
      name: 'results',
      component: resultCmp,
    },
    {
      path: '/newActivity',
      name: 'NewActivity',
      component: addNewAcitivity
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
  ]
})
