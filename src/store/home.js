import axios from 'axios'

const namespaced = true

const state = {
	loading: false,
	menu: []
}

const mutations = {
	setMenu: (state, payload) => {
		state.menu = payload
	}
}

const actions = {
	async fetchMenu({commit}){

		const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

		const data = {
			user: userData.nit
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_menu', data)

		commit('setMenu', response.data)

	}
}

export default {
	namespaced,
	state,
	mutations,
	actions
}