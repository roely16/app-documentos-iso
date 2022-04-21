const namespaced = true

const state = {
	module: null,
	permissions: {}
}

const mutations = {
	setModule: (state, payload) => {
		state.module = payload
	},
	setPermissions: (state, payload) => {
		state.permissions = payload
	}
}

export default {
	namespaced,
	state,
	mutations
}