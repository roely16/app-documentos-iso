<template>
	<div>
		<v-row justify="center" class="text-center">
			<v-col align-self="center" cols="12">
				<!-- <lottie :options="defaultOptions" :height="500" :width="400"/> -->
			</v-col>
		</v-row>

		<v-row>
			<v-col v-for="(option, key) in options" :key="key">
				<Option :data="option" :title="option.name" />
			</v-col>
		</v-row>
	</div>
</template>

<script>

	// import Lottie from 'vue-lottie';
	import animationData from '@/assets/lottie/loading-rocket.json';
	import Option from '@/components/Home/Option'

	export default {
		components: {
			// 'lottie': Lottie
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
							loop: true
						}
					},
					{
						name: 'Verificación',
						animation: {
							animationData: require('@/assets/lottie/document_check.json')
						}
					},
					{
						name: 'Publicación',
						animation: {
							animationData: require('@/assets/lottie/add-document.json')
						}
					},
					{
						name: 'Generar QR',
						animation: {
							animationData: require('@/assets/lottie/create-qr.json')
						}
					}
				]
			}
		}	
	}
</script>