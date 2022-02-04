<template>
	<div>
		<object v-if="!processing_preview" :data="path_preview" type="application/pdf" width="100%" height="600" />

		<Uploading v-if="processing_preview" />
	</div>
</template>

<script>

	import { mapState } from "vuex"

	import Uploading from '@/components/Uploading'

	export default {
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