import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

import login from './modules/login'
import main from './modules/main'
import people from './modules/people'
import user from './modules/user'
import productions from './modules/productions'

Vue.use(Vuex)

let modules = {
  login,
  main,
  people,
  productions,
  user
}

export default new Vuex.Store({
  actions,
  getters,
  strict: true,
  modules: modules
})