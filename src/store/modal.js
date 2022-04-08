const namespaced = true

const state = {
	show: false,
	loading: false,
	modal_content: null,
	fullscreen: true
}

const mutations = {
	setShow: (state, payload) => {
		state.show = payload

		if (!payload) {
			state.fullscreen = true
			state.modal_content = null
			state.loading = false
		}
	},
	setLoading: (state, payload) => {
		state.loading = payload
	},
	setModalContent: (state, payload) => {
		state.modal_content = payload
	},
	setFullScreen: (state, payload) => {
		state.fullscreen = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}