<template>
		
		<v-menu bottom offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					rounded
					v-bind="attrs"
					v-on="on"
					elevation="0"
				>
					<!--

						/** 
							* TODO: Corregir el botón para que se adapte a la foto de perfil
						*/

					-->
					<v-avatar>
						<img
							style="z-index: 1"
							:src="userData.imagen_perfil"
							alt="John"
							contain
						>
					</v-avatar>
					<span class="ml-2">
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
</template>

<script>

	import { mapActions } from "vuex"

	export default {
		data(){

			let self = this

			return{
				options: [
					{ 
						title: 'Configuración',
						icon: 'mdi-cog',
						onPress: () => { console.log('configuration') } 
					},
					{ 
						title: 'Salir',
						icon: 'mdi-logout',
						onPress: () => { self.logout() } 
					},
				],
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