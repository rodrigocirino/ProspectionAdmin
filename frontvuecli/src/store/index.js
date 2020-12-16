import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
* Vuex lost data on refesh page, use storage or cookies for this.
*
* Use a variable
*   this.$store.state.logged
* Modifie a variable
*   this.$store.commit('loggedIn')
*/

export default new Vuex.Store({
  state: {
    logged: false,//TODO : true para fins de teste,
    emailLoggedIn: undefined
  },
  mutations: {
    loggedIn(state){
      state.logged = true;
    },
    loggedOut(state){
      state.logged = false;
      state.emailLoggedIn = undefined;
    },
    setEmailLoggedIn(state, payload){
      state.emailLoggedIn = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
