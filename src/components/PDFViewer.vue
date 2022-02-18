<template>
	<div>
		<object v-if="!processing_preview" :data="path ? path : path_preview" type="application/pdf" width="100%" :height="height" />

		<Uploading :height="height_loading" v-if="processing_preview" />

	</div>
</template>

<script>

	import { mapState } from "vuex"

	import Uploading from '@/components/Uploading'

	export default {
		props: {
			height: {
				type: Number,
				default: 600
			},
			height_loading: Number,
			path: String
		},
		computed: {
			...mapState({
				processing_preview: state => state.pdf_preview.processing_preview,
				path_preview: state => state.pdf_preview.path_preview
			})
		},
		components: { 
			Uploading 
		}
	}
</script>