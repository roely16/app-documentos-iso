<template>
	<lottie :options="defaultOptions" :height="height"></lottie>
</template>

<script>

	import Lottie from 'vue-lottie';

	export default {
		props: {
			height: {
				type: Number,
				default: 500
			}
		},
		components: {
			'lottie': Lottie
		},
		data(){
			return{
				defaultOptions: {
					animationData: require('@/assets/lottie/uploading.json'),
				},
			}
		}
	}
</script>