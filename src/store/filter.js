import axios from 'axios'

const namespaced = true

const state = {
	filters: {},
	area: null,
	tipo: null,
	estado: null
}

const mutations = {

	setFilters: (state, payload) => {
		state.filters = payload
	},
	setArea: (state, payload) => {
		state.area = payload
	},
	setTipo: (state, payload) => {
		state.tipo = payload
	},
	setEstado: (state, payload) => {
		state.estado = payload
	}

}

const actions = {

	async fetchFilters({commit}){

		const response = await axios.get(process.env.VUE_APP_API_URL + 'get_filters')

		commit('setFilters', response.data)

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}