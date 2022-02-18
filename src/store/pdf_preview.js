const namespaced = true

const state = {
	processing_preview: false,
	path_preview: 'https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf#toolbar=0&navpanes=0&scrollbar=0'
}

const mutations = {
	setProcessingPreview: (state, payload) => {
		state.processing_preview = payload
	},
	setPathPreview: (state, payload) => {
		state.path_preview = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}