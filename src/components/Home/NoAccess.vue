<template>
	<div>
		<lottie :options="animation" :height="500" />
		<slot name="message"></slot>
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
				animation: {
					animationData: require('@/assets/lottie/no_access.json')
				}
			}
		}		
	}
</script>