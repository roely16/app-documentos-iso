module.exports = {
	transpileDependencies: [
		'vuetify'
	],
	devServer: {
		host: 'localhost'
	},
	publicPath: process.env.NODE_ENV === 'production' ? '/apps/documentos-iso/' : '/',
	pwa: {
		workboxOptions: {
			skipWaiting: true
		}
	}
}
