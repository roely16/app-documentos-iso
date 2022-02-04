/* eslint-disable no-unused-vars */
import axios from 'axios'

const namespaced = true

const state = {
	loading: false,
	signatures: [],
	processing: false,
	file: ''
}

const mutations = {
	setSignatures: (state, payload) => {
		state.signatures = payload
	},
	setProcessing: (state, payload) => {
		state.processing = payload
	},
	setFile: (state, payload) => {
		state.file = payload
	}
}

const actions = {

	async obtenerFirmas({commit}){

		try {
			
			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			const data = {
				nit: userData.nit
			}

			const response = await axios.post(process.env.VUE_APP_API_URL + 'obtener_firmas', data)

			commit('setSignatures', response.data.firmas)

			commit('modal/setShow', true, {root: true})

		} catch (error) {
			
			console.log(error)

		}

	},
	async processPDF({commit}, payload){

		try {
			
			let formData = new FormData()

			formData.append('file', payload.file)
			formData.append('settings', JSON.stringify(payload.settings))

			const response = await axios.post(process.env.VUE_APP_API_URL + 'process_pdf', formData)

			commit('setFile', response.data.destinationPath)

			console.log(response.data)

			//commit('setProcessing', true)

		} catch (error) {
			
			console.log(error)

		}

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}