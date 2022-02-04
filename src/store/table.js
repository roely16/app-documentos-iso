const namespaced = true

const state = {
	loading: false,
	page_count: 0,
	page: 1,
	search: null
}

const mutations = {
	setLoading: (state, payload) => {
		state.loading = payload
	},
	setPageCount: (state, payload) => {
		state.page_count = payload
	},
	setPage: (state, payload) => {
		state.page = payload
	},
	setSearch: (state, payload) => {
		state.search = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}