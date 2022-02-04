/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

import CreateQR from '../views/CreateQR.vue'
import UploadDocument from '../views/UploadDocument'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
			breadcrum: [
				{
					text: 'Inicio',
					disabled: false,
					href: '#/',
				}
			],
		},
		children: [
			{
				path: '/home/creacion_qr',
				name: 'create_qr',
				component: CreateQR,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Generación de QR',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/subir_documento',
				name: 'upload_document',
				component: UploadDocument,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Subir Documentos',
							disabled: true,
							href: '#/',
						}
					],
				}
			}
		]
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {

	let usuario = JSON.parse(localStorage.getItem('app-documentos-iso'))

	if (to.name != 'login') {
		
		if (!usuario) {
			
			return next('/');

		}

	}

	if (to.name == 'login') {

		if (usuario) {
			
			return next('/home');

		}

	}

	next();

})

export default router
