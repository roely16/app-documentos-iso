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
			},
			loop: {
				type: Boolean,
				default: true
			}
		},
		components: {
			'lottie': Lottie
		},
		data(){
			return{
				defaultOptions: {
					animationData: require('@/assets/lottie/empty_box.json'),
					loop: this.loop
				},
			}
		}
	}
</script>