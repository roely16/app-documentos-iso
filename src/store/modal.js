const namespaced = true

const state = {
	show: false,
	loading: false,
	modal_content: null
}

const mutations = {
	setShow: (state, payload) => {
		state.show = payload
	},
	setLoading: (state, payload) => {
		state.loading = payload
	},
	setModalContent: (state, payload) => {
		state.modal_content = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}