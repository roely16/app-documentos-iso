import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login from './login'
import home from './home'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		login: login,
		home: home
	}
})
