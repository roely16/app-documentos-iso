<template>
	<div>

		<v-alert
			color="info"
			outlined
			type="info"
		>
		<h3 class="text-h5">
			Generación de QR
		</h3>

		<p>
			Antes de enviar su documento a revisión será necesario que incruste el código QR correspondinente a su firma.
		</p>

		<p>
			A continuación puede previsualizar la ubicación de la sección de firmas y configurarla a su conveniencia.
		</p>

		<v-divider
			class="my-4 info"
			style="opacity: 0.22"
		></v-divider>

		<v-row
			align="center"
			no-gutters
		>
			<v-col class="shrink">
				<v-btn
					color="info"
					outlined
					:disabled="!enabled_preview"
					@click="processPreview()"
				>
					Vista Previa
				</v-btn>
			</v-col>
		</v-row>
		</v-alert>

	</div>
</template>

<script>

	import { mapState } from "vuex"

	export default {

		methods: {
			
			processPreview(){

				this.$emit('process')

			}
		},
		computed: {
			...mapState({
				enabled_preview: state => state.upload_document.enabled_preview
			})
		}

	}
</script>