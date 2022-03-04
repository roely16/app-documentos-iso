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

	async fetchFilters({commit, rootState}){

		const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

		const data = {
			usuario: userData.usuario,
			module: rootState.routes.module
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_filters', data)

		commit('setFilters', response.data)
		
	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}