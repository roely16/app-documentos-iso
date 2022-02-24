import axios from 'axios'

import Swal from 'sweetalert2'

const namespaced = true

const state = {
	areas: [],
	options: [],
	options_select: [],
	colaboradores: [],
	saving: false,
	data_table: {}
}

const mutations = {
	setAreas: (state, payload) => {
		state.areas = payload
	},
	setOptions: (state, payload) => {
		state.options = payload
	},
	setOptionCheck: (state, payload) => {

		let result = state.options.filter(option => option.id == payload.id)

		if (result) {
			
			result[0].check = !result[0].check

			if (result[0].check) {
				
				state.options_select.push(payload.id)

			}else{

				// Eliminar del array
				let filter_result = state.options_select.filter(option => option != payload.id)

				state.options_select = filter_result

			}

		}

	},
	setColaboradores: (state, payload) => {
		state.colaboradores = payload
	},
	setSaving: (state, payload) => {
		state.saving = payload
	},
	setDataTable: (state, payload) => {
		state.data_table = payload
	},
	resetForm: (state) => {
		state.options_select = []
		state.colaboradores = []
	}
}

const actions = {

	async fetchAreas({commit}){

		commit('resetForm')

		commit('modal/setLoading', true, {root: true})

		commit('modal/setShow', true, {root: true})

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_areas')

		commit('setAreas', response.data)

		const response_options = await axios.get(process.env.VUE_APP_API_URL + 'get_menu_options')

		commit('setOptions', response_options.data)

		commit('modal/setLoading', false, {root: true})

	},

	async savePermission({commit, state, dispatch}){

		commit('setSaving', true)

		const data = {
			colaboradores: state.colaboradores,
			permisos: state.options_select
		}

		await axios.post(process.env.VUE_APP_API_URL + 'save_permission', data)

		commit('setSaving', false)

		Swal.fire(
			'Excelente!',
			'Los permisos han sido registrados exitosamente!',
			'success'
		).then(() => {

			dispatch('fetchPermissions')
			commit('modal/setShow', false, {root: true})

		})

	},

	async fetchPermissions({commit}){

		commit('table/setLoading', true, {root: true})

		const response = await axios.get(process.env.VUE_APP_API_URL + 'get_permissions')

		commit('setDataTable', response.data)

		commit('table/setLoading', false, {root: true})

		console.log(response.data)

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}