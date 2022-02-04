const namespaced = true

const state = {
	show: false,
	loading: false
}

const mutations = {
	setShow: (state, payload) => {
		state.show = payload
	},
	setLoading: (state, payload) => {
		state.loading = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}