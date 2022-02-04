<template>
	<div>
		<lottie :options="defaultOptions" :height="500"></lottie>
	</div>
</template>

<script>

	import Lottie from 'vue-lottie';

	export default {
		components: {
			'lottie': Lottie
		},
		data(){
			return{
				defaultOptions: {
					animationData: require('@/assets/lottie/loading.json'),
				},
			}
		}
	}
</script>