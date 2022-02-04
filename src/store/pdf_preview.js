const namespaced = true

const state = {
	processing_preview: false,
	path_preview: ''
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