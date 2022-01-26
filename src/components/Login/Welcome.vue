<template>
	<div>
		<lottie :options="defaultOptions" :height="600" :width="600"/>
	</div>
</template>

<script>

	import Lottie from 'vue-lottie';
	import animationData from '@/assets/lottie/login.json';

	export default {
		components: {
			'lottie': Lottie
		},
		data(){
			return{
				defaultOptions: {
					animationData: animationData,
				},
				animationSpeed: 1
			}
		}		
	}
</script>