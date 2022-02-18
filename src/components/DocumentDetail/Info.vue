<template>
	<div class="mb-4">
		<v-row align="center" v-for="(value, label) in document" :key="label">
				<v-col class="pb-1" cols="4">
					<h3 class="text-capitalize">
						{{ label }}:
					</h3>
				</v-col>
				<v-col class="pb-1">
					<slot v-bind="{ label, value }" :name="label">
						<h3 class="font-weight-light">
							{{ value }}
						</h3>
					</slot>
				</v-col>

		</v-row>
	</div>
</template>

<script>

	import { mapState } from "vuex"

	export default {

		computed: {

			...mapState({
				document: state => state.document_detail.document
			})

		}

	}
</script>