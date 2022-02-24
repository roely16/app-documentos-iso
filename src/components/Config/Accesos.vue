<template>
	<div>
		<v-row>
			<v-col v-for="(option, key) in options" :key="key" cols="6">
				<v-hover v-slot="{ hover }">
					
					<v-card @click="setOptionCheck(option)" class="rounded-card" :elevation="hover ? 2 : 0" :color="hover ? option.check ? 'success' : 'grey lighten-3' : option.check ? 'success' : 'grey lighten-4'" outlined min-height="150">

						<v-card-text>
							<lottie :options="{
								animationData: require('@/assets/lottie/' + option.icon)	
							}" :height="75"/>
						</v-card-text>

						<v-card-text :class="['overline', 'font-weight-bold', 'text-center', 'mt-0', 'pt-0']">
							{{ option.nombre }}
						</v-card-text>

					</v-card>
				</v-hover>
			</v-col>
		</v-row>
		
		<v-row>
			<v-col>
				<v-alert
					icon="mdi-information"
					prominent
					text
					type="info"
				>
					Es necesario que primero seleccione a los colaboradores a los cuáles desean agregarles permiso de acceso, y luego seleccionar las opciones del menu a las cuales podrá acceder.  
				</v-alert>
			</v-col>
		</v-row>
	</div>
</template>

<style>
	.rounded-card{
		border-radius: 10px; 
		cursor: pointer;
		border-width: 1px
	}
</style>

<script>

	import Lottie from 'vue-lottie';

	import { mapState, mapMutations } from "vuex"

	export default {
		
		components: {
			'lottie': Lottie
		},
		methods: {
			...mapMutations({
				setOptionCheck: 'permission/setOptionCheck'
			})
		},
		computed: {
			...mapState({
				options: state => state.permission.options
			})
		}
		
	}
</script>