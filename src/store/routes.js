const namespaced = true

const state = {
	module: null
}

const mutations = {
	setModule: (state, payload) => {
		state.module = payload
	}
}

export default {
	namespaced,
	state,
	mutations
}