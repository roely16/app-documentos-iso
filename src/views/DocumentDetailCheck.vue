<template>

	<DocumentDetail :show_update="true" :add_version="false" />

</template>

<script>

	import DocumentDetail from './DocumentDetail.vue'

	export default {

		components: {
			DocumentDetail
		}

	}
</script>