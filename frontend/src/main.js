import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync'

import BootstrapVue from 'bootstrap-vue'

import App from './App.vue';
import store from './store/store'
import Index from './components/site/Index.vue';
import Auth from './components/admin/Auth.vue';
import AdminIndex from './components/admin/Index.vue';
import Blockroutes from './components/Blockroutes.vue';
import Itempage from './components/site/Itempage.vue';


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',

  routes: [{
    path: '/',
    component: Blockroutes
  }, {
    path: '/authentication',
    component: Auth
  }, {
    path: '/admin',
    component: AdminIndex
  }, {
    path: '/index',
    component: Index
  }, {
    path: '/site/item/:id',
    component: Itempage
  }, {
    path: '*',
    redirect: '/'
  }]
})

sync(store, router)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

