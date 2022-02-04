<template>
	<div>
		<v-card class="mb-4" outlined>
			<v-card-title>
				Ajustes
			</v-card-title>
				<v-card-text>
					<v-row align="center">
						<v-col cols="12">
							<span class="font-weight-bold">Posición Vertical</span>
							<v-text-field v-model="settings.posicion_vertical" hide-details dense outlined type="number"></v-text-field>
						</v-col>
						<v-col cols="12">
							<span class="font-weight-bold">Margen Horizontal</span>
							<v-text-field v-model="settings.margen_horizontal" hide-details dense outlined type="number"></v-text-field>
						</v-col>
						<v-col align="center">
							<v-btn @click="process()" elevation="0">
								Vista Previa
							</v-btn>
						</v-col>
					</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>

	import { mapState } from "vuex"

	export default {
		data(){
			return{
				show: false
			}
		},
		methods: {
			process(){

				this.$emit('process')

			}
		},
		computed: {
			...mapState({
				settings: state => state.upload_document.settings
			})
		}
	}
</script>