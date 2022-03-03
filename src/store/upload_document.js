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
	uploading: false,
	acronimo_tipo_documento: null,
	acronimo_seccion: null,
	error_pdf: false
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
		state.acronimo_tipo_documento = null
		state.acronimo_seccion = null
		state.error_pdf = false
	},
	setAcronimoTipo: (state, payload) => {
		state.acronimo_tipo_documento = payload
	},
	setAcronimoSeccion: (state, payload) => {
		state.acronimo_seccion = payload
	},
	setErrorPDF: (state, payload) => {
		state.error_pdf = payload
	}
}

const actions = {

	async fetchData({commit}){

		try {
			
			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			const payload = {
				nit: userData.nit,
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

			commit('setErrorPDF', response.data.error_pdf)

			commit('setShowPreview', true)

		} catch (error) {
			
			console.log(error)

		}

	},
	async uploadDocument({commit, dispatch, state}, payload){

		try {
			
			commit('setUploading', true)

			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			payload.documento.usuario = userData.usuario

			let formData = new FormData()

			formData.append('file', payload.pdf)
			formData.append('file_preview', payload.pdf)

			// Formar el código del documento
			payload.documento.codigo = state.acronimo_tipo_documento + '-' + state.acronimo_seccion + '-' + payload.documento.codigo

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

			dispatch(payload.fetchData, payload.fetchParams, {root: payload.fetchRoot})

		} catch (error) {
			
			console.log(error)

		}

	},
	async getAcronimoTipo({commit}, payload){

		if (payload) {
			
			const data = {
				tipo_documento: payload
			}
	
			const response = await axios.post(process.env.VUE_APP_API_URL + 'get_acronimo_tipo', data)
	
			commit('setAcronimoTipo', response.data)

		}

	},
	async getAcronimoSeccion({commit}, payload){

		if (payload) {
			
			const data = {
				colaborador: payload
			}
	
			const response = await axios.post(process.env.VUE_APP_API_URL + 'get_acronimo_seccion', data)
	
			commit('setAcronimoSeccion', response.data)

		}

	}

}

const getters = {

	TipoSelect: (state) => (id) => {
		let result = state.tipos_documento.filter(tipo => tipo.tipodocumentoid == id)

		if (result.length > 0) {
			
			return result[0]

		}

		return {}
	}

}

export default {
	namespaced,
	state,
	mutations,
	actions,
	getters
}