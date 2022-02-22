/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

import CreateQR from '../views/CreateQR.vue'
import UploadDocument from '../views/UploadDocument'
import Check from '../views/Check.vue'
import DocumentDetail from '../views/DocumentDetail.vue'
import DocumentDetailCheck from '../views/DocumentDetailCheck'
import Publication from '../views/Publication'
import DocumentDetailPub from '../views/DocumentDetailPub'
import Config from '../views/Config'

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
			},
			{
				path: '/home/verificacion',
				name: 'check',
				component: Check,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Verificar Documentos',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/publicacion',
				name: 'publication',
				component: Publication,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Publicar Documentos',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/configuracion',
				name: 'config',
				component: Config,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Configuración',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/publicacion/detalle_documento/:id',
				name: 'document_detail_pub',
				component: DocumentDetailPub,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Publicar Documentos',
							disabled: false,
							href: '#/home/verificacion',
						},
						{
							text: 'Detalle',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/verificacion/detalle_documento/:id',
				name: 'document_detail_check',
				component: DocumentDetailCheck,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Verificar Documentos',
							disabled: false,
							href: '#/home/verificacion',
						},
						{
							text: 'Detalle',
							disabled: true,
							href: '#/',
						}
					],
				}
			},
			{
				path: '/home/subir_documento/detalle_documento/:id',
				name: 'document_detail',
				component: DocumentDetail,
				meta: {
					breadcrum: [
						{
							text: 'Inicio',
							disabled: false,
							href: '#/',
						},
						{
							text: 'Subir Documentos',
							disabled: false,
							href: '#/home/subir_documento',
						},
						{
							text: 'Detalle',
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
