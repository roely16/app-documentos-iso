<template>
	<div>
		<lottie :options="defaultOptions" :height="250"></lottie>
		<h1 class="overline">No existen registros</h1>
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
					animationData: require('@/assets/lottie/empty_box.json'),
					loop: false
				},
			}
		}
	}
</script>