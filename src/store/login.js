import axios from 'axios'

import router from '../router'

const namespaced = true

const state = {
	loggin: false,
	loginSuccess: false,
	errorMessage: null
}

const mutations = {
	setLoggin: (state, payload) => {
		state.loggin = payload
	},
	setErrorMessage: (state, payload) => {
		state.errorMessage = payload
	},
	setLoginSuccess: (state, payload) => {
		state.loginSuccess = payload
	}
}

const actions = {
	async doLogin({commit}, payload){

		try {
			
			commit('setLoggin', true)
			
			const response = await axios.post(process.env.VUE_APP_API_URL + 'login', payload)

			commit('setLoginSuccess', true)

			localStorage.setItem('app-documentos-iso', JSON.stringify(response.data))

		} catch (error) {
			
			commit('setErrorMessage', error.response.data.message)

		}

		commit('setLoggin', false)
	
		router.push('/home')
	},
	async doLogout(){

		localStorage.removeItem('app-documentos-iso')

		router.push('/')

	}
}

export default {
	namespaced,
	state,
	mutations,
	actions
}