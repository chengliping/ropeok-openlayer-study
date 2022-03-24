import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);
export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations,
  actions,
  modules:{
  }
});
