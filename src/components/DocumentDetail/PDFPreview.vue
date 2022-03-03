<template>	
	<v-card>
		<v-card-title class="text-h5 grey lighten-2">
			Vista Previa
			<v-spacer></v-spacer>
			<v-btn
				icon
				@click="setShow(false)"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-text class="mt-5">
			<PDFViewer fullscreen />
		</v-card-text>
	</v-card>
</template>

<script>

	import { mapMutations } from "vuex"

	import PDFViewer from '@/components/PDFViewer'

	export default {
		
		components: {
			PDFViewer
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			})
		}

	}
</script>