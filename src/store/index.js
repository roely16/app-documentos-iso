import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login from './login'
import home from './home'
import modal from './modal'
import create_qr from './create_qr'
import upload_document from './upload_document'
import table from './table'
import pdf_preview from './pdf_preview'

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		login: login,
		home: home,
		modal: modal,
		create_qr: create_qr,
		upload_document: upload_document,
		table: table,
		pdf_preview: pdf_preview
	}
})
