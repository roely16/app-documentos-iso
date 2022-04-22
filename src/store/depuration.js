import axios from 'axios'

import Swal from 'sweetalert2'

const namespaced = true

const state = {
	sections: [],
	documents: [],
	select_section: null
}

const mutations = {
	setSections: (state, payload) => {
		state.sections = payload
	},
	selectSection: (state, payload) => {

		state.sections.forEach(section => {
			section.selected = false
		});
		
		let result = state.sections.filter(section => section.seccionid == payload.seccionid)

		if (result.length > 0) {
			
			result[0].selected = true

			state.select_section = payload
		}

	},
	setDocuments: (state, payload) => {
		state.documents = payload
	}
}

const actions = {
	
	async fetchSections({commit}){

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_iso_sections')

		commit('setSections', response.data.secciones)

	},
	async fetchSectionDetail({commit}, payload){

		commit('selectSection', payload)

		const data = {
			seccionid: payload.seccionid
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_section_documents', data)

		commit('setDocuments', response.data.documentos)

	},
	async deleteDocuments({dispatch, state}, payload){

		const data = {
			documents: payload
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'delete_documents_portal', data)

		if (response.data.status === 200) {
			
			Swal.fire(
				'Excelente!',
				response.data.message,
				'success'
			).then(() => {

				dispatch('fetchSectionDetail', state.select_section)

			})

		}

		console.log(response.data)

	}

}


export default {
	namespaced,
	state,
	mutations,
	actions
}