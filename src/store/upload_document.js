import axios from 'axios'

import Swal from 'sweetalert2'

const namespaced = true

const state = {
	data_table: {},
	loading_data: false,
	tipos_documento: [],
	tipos_almacenamiento: [],
	colaboradores: [],
	enabled_preview: false,
	show_preview: false,
	settings: {
		lineas_nombre: 1,
		lineas_puesto: 1,
		posicion_vertical: 15,
		margen_horizontal: 15
	},
	uploading: false
}

const mutations = {
	setDataTable: (state, payload) => {
		state.data_table = payload
	},
	setLoadingData: (state, payload) => {
		state.loading_data = payload
	},
	setFormData: (state, payload) => {
		state.tipos_documento = payload.tipos_documento
		state.tipos_almacenamiento = payload.tipos_almacenamiento
		state.colaboradores = payload.colaboradores
	},
	setEnabledPreview: (state, payload) => {
		state.enabled_preview = payload
	},
	setShowPreview: (state, payload) => {
		state.show_preview = payload
	},
	setUploading: (state, payload) => {
		state.uploading = payload
	},
	resetForm: (state) => {
		state.loading_data = false
		state.enabled_preview = false
		state.show_preview = false
		state.uploading = false
		state.settings = {
			lineas_nombre: 1,
			lineas_puesto: 1,
			posicion_vertical: 15,
			margen_horizontal: 15
		}
	}
}

const actions = {

	async fetchData({commit}){

		try {
	
			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			const payload = {
				nit: userData.nit
			}

			commit('table/setLoading', true, {root: true})
			
			const response = await axios.post(process.env.VUE_APP_API_URL + 'get_documentos_revision', payload)

			commit('setDataTable', response.data)

			commit('table/setLoading', false, {root: true})

		} catch (error) {
	
			console.log(error)

		}

	},
	async fetchFormDocument({commit}){

		try {
			
			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			const payload = {
				nit: userData.nit
			}

			commit('modal/setLoading', true, {root: true})
			
			const response = await axios.post(process.env.VUE_APP_API_URL + 'get_form_create', payload)

			commit('modal/setLoading', false, {root: true})

			commit('setFormData', response.data)

		} catch (error) {
			
			console.log(error)

		}

	},
	async fetchPreview({commit, state}, payload){

		try {
			
			let formData = new FormData()

			formData.append('file', payload.pdf)
			formData.append('file_preview', payload.pdf)
			formData.append('documento', JSON.stringify(payload.documento))
			formData.append('settings', JSON.stringify(state.settings))

			commit('setShowPreview', false)
			commit('pdf_preview/setProcessingPreview', true, {root: true})

			const response = await axios.post(process.env.VUE_APP_API_URL + 'upload_document', formData)

			commit('pdf_preview/setPathPreview', response.data.path_preview, {root: true})

			commit('pdf_preview/setProcessingPreview', false, {root: true})
			commit('setShowPreview', true)

		} catch (error) {
			
			console.log(error)

		}

	},
	// eslint-disable-next-line no-unused-vars
	async uploadDocument({commit, dispatch}, payload){

		try {
			
			commit('setUploading', true)

			let formData = new FormData()

			formData.append('file', payload.pdf)
			formData.append('file_preview', payload.pdf)
			formData.append('documento', JSON.stringify(payload.documento))
			formData.append('settings', JSON.stringify(state.settings))
			formData.append('original', payload.original)
			formData.append('save', true)

			const response = await axios.post(process.env.VUE_APP_API_URL + 'upload_document', formData)

			if (response.data.status == 200) {
				
				Swal.fire(
					'Excelente!',
					'El documento ha sido registrado exitosamente!',
					'success'
				).then(() => {

					commit('modal/setShow', false, {root: true})

				})

			}

			commit('setUploading', false)

			dispatch('fetchData')

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