<template>
	<div>
		<v-row justify="center" class="text-center">
			<v-col align-self="center" cols="12">
				<!-- <lottie :options="defaultOptions" :height="500" :width="400"/> -->
			</v-col>
		</v-row>

		<v-row>
			<v-col v-for="(option, key) in menu" :key="key">
				<Option :data="option" :title="option.nombre" />
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import animationData from '@/assets/lottie/loading-rocket.json';
	import Option from '@/components/Home/Option'

	import { mapActions, mapState } from 'vuex';

	export default {
		components: {
			Option
		},
		data(){
			return{
				defaultOptions: {
					animationData: animationData,
				},
				animationSpeed: 1,
				options: [
					{
						name: 'Subir Documentos',
						animation: {
							animationData: require('@/assets/lottie/document.json'),
						},
						to: 'upload_document'
					},
					{
						name: 'Verificación',
						animation: {
							animationData: require('@/assets/lottie/document_check.json')
						},
						to: 'check'
					},
					{
						name: 'Publicación',
						animation: {
							animationData: require('@/assets/lottie/add-document.json')
						},
						to: 'publication'
					},
					{
						name: 'Configuración',
						animation: {
							animationData: require('@/assets/lottie/settings.json'),	
						},
						to: 'create_qr'
					}
				]
			}
		},
		methods: {
			...mapActions({
				fetchMenu: 'home/fetchMenu'
			})
		},
		computed: {
			...mapState({
				menu: state => state.home.menu
			})
		},
		mounted(){

			this.fetchMenu()

		}	
	}
</script>