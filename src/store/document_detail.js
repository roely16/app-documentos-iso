import axios from 'axios'

import Swal from 'sweetalert2'

const namespaced = true

const state = {
	document: {},
	loading: false,
	versions: {},
	preview_version: null,
	allow_create_version: false,
	detail_version: {},
	bitacora: [],
	saving_bitacora: false,
	comentario: null,
	adjuntos: [],
	cambio_estado: null,
	make_qr: false,
	document_info_edit: {}
}

const mutations = {
	setDocument: (state, payload) => {
		state.document = payload
	},
	setLoading: (state, payload) => {
		state.loading = payload
	},
	setVersions: (state, payload) => {
		state.versions = payload
	},
	setPreviewVersion: (state, payload) => {
		state.preview_version = payload
	},
	setAllowCreateVersion: (state, payload) => {
		state.allow_create_version = payload
	},
	setDetailVersion: (state, payload) => {
		state.detail_version = payload
	},
	setBitacora: (state, payload) => {
		state.bitacora = payload
	},
	setSavingBitacora: (state, payload) => {
		state.saving_bitacora = payload
	},
	setComentario: (state, payload) => {
		state.comentario = payload
	},
	setAdjuntos: (state, payload) => {
		state.adjuntos = payload
	},
	clearFormBitacora: (state) => {
		state.comentario = null
		state.adjuntos = []
		state.cambio_estado = null
	},
	setCambioEstado: (state, payload) => {
		state.cambio_estado = payload
	},
	setMakeQR: (state, payload) => {
		state.make_qr = payload
	},
	setDocumentInfoEdit: (state, payload) => {
		state.document_info_edit = payload
	}
}

const actions = {

	async fetchDetail({commit}, payload){
		
		try {
			
			commit('setLoading', true)

			const data = {
				id: payload
			}

			const response = await axios.post(process.env.VUE_APP_API_URL + 'get_detail_document', data)

			commit('setDocument', response.data.documento)

			commit('setDetailVersion', response.data.full_document)

			commit('setLoading', false)

			commit('pdf_preview/setPathPreview', response.data.pdf_path, {root: true})

			commit('setPreviewVersion', response.data.full_document.version )

		} catch (error) {
			
			console.log(error)

		}
		
	},

	async fetchVersions({commit}, payload){

		commit('table/setLoading', true, {root: true})

		const data = {
			id: payload.id,
			route_name: payload.route_name
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'document_versions', data)

		commit('setVersions', response.data)

		commit('table/setLoading', false, {root: true})

		commit('setAllowCreateVersion', response.data.allow_create_version)

		console.log(state.document)

	},

	async sendToViewer({commit}, payload){
		
		commit('pdf_preview/setProcessingPreview', true, {root: true})

		const data = {
			id: payload.documentoid,
			preview: true
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_detail_document', data)

		commit('pdf_preview/setPathPreview', response.data.pdf_path, {root: true})

		commit('setPreviewVersion', payload.version )

		commit('pdf_preview/setProcessingPreview', false, {root: true})

	},

	async changeState({state, dispatch, commit}){

		try{

			commit('setSavingBitacora', true)

			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			let formData = new FormData()

			let i = 1;

			state.adjuntos.forEach(adjunto => {
				
				formData.append('file' + i, adjunto)
				i++

			});

			const data = {
				comentario: state.comentario,
				id: state.detail_version.documentoid,
				usuario: userData.usuario,
				number_files: i - 1,
				cambio_estado: state.cambio_estado,
				estado_anterior: state.detail_version.estadoid
			}

			formData.append('data', JSON.stringify(data))
			
			const response = await axios.post(process.env.VUE_APP_API_URL + 'change_state', formData)

			console.log(response.data)

			dispatch('fetchBitacora')

			commit('clearFormBitacora')
			commit('setSavingBitacora', false)

			dispatch('fetchDetail', state.detail_version.documentoid)

			Swal.fire(
				'Excelente!',
				'La bitácora ha sido actualizada exitosamente!',
				'success'
			).then(() => {

				commit('modal/setShow', false, {root: true})

			})

		} catch(error){

			console.log(error)

		}

	},

	async fetchBitacora({state, commit}){

		const data = {
			id: state.detail_version.documentoid
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_bitacora', data)

		commit('setBitacora', response.data)

	},

	async fetchSeguimiento({commit, dispatch}, payload){

		const data = {
			id: payload.documentoid,
			preview: true
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_detail_document', data)

		payload.pdf_path = response.data.pdf_path

		commit('setDetailVersion', payload)

		commit('modal/setModalContent', 'form_detail_version', {root: true})

		dispatch('fetchBitacora')
		
		commit('modal/setShow', true, {root: true})

	},

	async fetchMakeQR({state, commit}){

		const data = {
			tipo_documento: state.detail_version.tipodocumentoid
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'check_qr_document_type', data)

		commit('setMakeQR', response.data.qr)

	},

	async fetchEditInfo({commit}, payload){
		
		const data = {
			id: payload
		}

		const response = await axios.post(process.env.VUE_APP_API_URL + 'get_detail_edit', data)
		
		commit('setDocumentInfoEdit', response.data)

		commit('modal/setModalContent', 'edit_info', {root: true})
		commit('modal/setFullScreen', false, {root: true})
		commit('modal/setShow', true, {root: true})

	},

	async fetchUpdateInfo({state, commit, dispatch}){

		const response = await axios.post(process.env.VUE_APP_API_URL + 'update_detail_info', state.document_info_edit)

		if (response.status === 200) {
			
			Swal.fire(
				'Excelente!',
				'La información del documento ha sido actualizada!',
				'success'
			).then(() => {

				commit('modal/setShow', false, {root: true})
				dispatch('fetchDetail', state.document_info_edit.documentoid)

			})

		}

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}