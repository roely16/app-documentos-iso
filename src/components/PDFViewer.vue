<template>
	<div>
		<object :style="fullscreen ? 'min-height: 85vh' : null" v-if="!processing_preview" :data="path ? env + path : env + path_preview" type="application/pdf" width="100%" :height="height" />

		<Uploading :height="height_loading" v-if="processing_preview" />

	</div>
</template>

<script>

	import { mapState } from "vuex"

	import Uploading from '@/components/Uploading'

	export default {
		props: {
			height: {
				type: [Number, String],
				default: 600
			},
			height_loading: Number,
			path: String,
			fullscreen: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState({
				processing_preview: state => state.pdf_preview.processing_preview,
				path_preview: state => state.pdf_preview.path_preview
			}),
			env: function(){
				return process.env.VUE_APP_API_URL
			}
		},
		components: { 
			Uploading 
		}
	}
</script>