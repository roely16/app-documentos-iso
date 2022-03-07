<template>
	<div>
		<v-avatar>
			<v-img :src="require('@/assets/img/logo_muni_verde.png')"></v-img>
		</v-avatar>
		<v-menu bottom offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					rounded
					v-bind="attrs"
					v-on="on"
					elevation="0"
				>
					
					
					<span>
						{{ userData.usuario }}
					</span>
					<v-icon light>mdi-chevron-down</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item
					v-for="(item, index) in options"
					:key="index"
					@click="item.onPress()"
				>
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		</div>
</template>

<script>

	import { mapActions } from "vuex"

	export default {
		
		data(){

			let self = this

			return{
				options: [
					{ 
						title: 'Salir',
						icon: 'mdi-logout',
						onPress: () => { self.logout() } 
					},
				],
				defaultOptions: {
					animationData: require('@/assets/lottie/account.json'),
				},
			}
		},
		methods: {
			...mapActions({
				logout: 'login/doLogout'
			})
		},	
		computed: {

			userData: function(){

				let data = JSON.parse(localStorage.getItem('app-documentos-iso'))

				return data

			}

		}
		
	}
</script>