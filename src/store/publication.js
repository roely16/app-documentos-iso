import axios from 'axios'

const namespaced = true

const state = {

	data_table: {}

}

const mutations = {

	setDataTable: (state, payload) => {
		state.data_table = payload
	}

}

const actions = {

	async fetchData({commit, rootState}){

		const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

		commit('table/setLoading', true, {root: true})
			
		const data = {
			area: rootState.filter.area,
			usuario: userData.usuario,
			module: rootState.routes.module
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'fetch_documents_publication', data)

		commit('setDataTable', response.data)

		commit('table/setLoading', false, {root: true})

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}