<template>
	<div>
		<v-hover v-slot="{ hover }">
			<v-card :to="{name: data.url}" :elevation="hover ? 12 : 0" :color="hover ? '#0A306D' : 'white'" outlined min-height="150" style="border-radius: 10px; cursor: pointer">
				<v-card-text>
					<lottie :options="{
						animationData: require('@/assets/lottie/' + data.icon)	
					}" :height="200"/>
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

	export default {
		props: {
			title: String,
			data: Object
		},	
		components: {
			'lottie': Lottie
		},
		
	}
</script>