/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

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
		children: []
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
