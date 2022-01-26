<template>
	<div>
		<v-hover
			v-slot="{ hover }"
		>
			<v-card :elevation="hover ? 12 : 0" :color="hover ? '#0A306D' : 'grey lighten-2'" outlined min-height="150" style="border-radius: 10px; cursor: pointer">
				<v-card-text>
					<lottie :options="data.animation" :height="100"/>
				</v-card-text>
				<v-card-text :class="['text-h5', 'font-weight-bold', 'text-center', 'mt-0', 'pt-0', hover ? 'white--text': null]">
					{{ title }}
				</v-card-text>
			</v-card>
		</v-hover>
	</div>
</template>

<script>

	import Lottie from 'vue-lottie';
	//import animationData from '@/assets/lottie/loading-rocket.json';

	export default {
		props: {
			title: String,
			data: Object
		},	
		components: {
			'lottie': Lottie
		},
		data: () => {
			return{
				defaultOptions: {
					animationData: require('@/assets/lottie/loading-rocket.json'),
				},
			}
		}
	}
</script>