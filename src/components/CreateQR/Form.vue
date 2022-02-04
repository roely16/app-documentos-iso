<template>
	<div>

		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				Generar QR
			</v-card-title>
			<v-card-text class="mt-4">
				<v-row>
					<v-col cols="6">
						<v-form>
							<v-card outlined>
								<v-card-title>Documento</v-card-title>
								<v-card-text>
									<v-row>
										<v-col>
											<v-file-input v-model="file" placeholder="Seleccione un archivo..." prepend-icon="" class="input-bordered" hide-details outlined></v-file-input>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
							<v-card class="mt-4" outlined>
								<v-card-title>Firmas</v-card-title>
								<v-card-text>
									<v-row align="center" v-for="(signature, key) in signatures" :key="key">
										<v-col class="text-right" cols="3">
											<v-chip label>
												<span class="text-overline">
													{{ signature.tag }}
												</span>
											</v-chip>
										</v-col>
										<v-col>
											<v-row>
												<v-col cols="12">
													{{ signature.name }}
													<br>
													<strong>
														{{ signature.role }}
													</strong>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
							<v-card class="mt-4" outlined>
								<v-card-title>Ajustes</v-card-title>
								<v-card-text>
									<v-row >
										<v-col cols="4">
											<span class="font-weight-bold">Líneas Nombre</span>
											<v-text-field v-model="settings.lineas_nombre" dense type="number" class="input-rounded" outlined hide-details></v-text-field>
										</v-col>
										<v-col cols="4">
											<span class="font-weight-bold">Líneas Puesto</span>
											<v-text-field v-model="settings.lineas_puesto" dense type="number" class="input-rounded" outlined hide-details></v-text-field>
										</v-col>
										<v-col cols="4">
											<span class="font-weight-bold">Posición Vertical</span>
											<v-text-field v-model="settings.posicion_y" dense type="number" class="input-rounded" outlined hide-details></v-text-field>
										</v-col>
										<v-col cols="4">
											<span class="font-weight-bold">Margen Horizontal</span>
											<v-text-field v-model="settings.margen_horizontal" dense type="number" class="input-rounded" outlined hide-details></v-text-field>
										</v-col>
										<v-col cols="4">
											<span class="font-weight-bold">Margen Vertical</span>
											<v-text-field v-model="settings.margen_vertical" dense type="number" class="input-rounded" outlined hide-details></v-text-field>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>

							<v-row class="mt-4">
								<v-col>
									<v-btn :loading="processing" :disabled="processing" @click="processPDF({settings: settings, file: file})" elevation="0" color="primary">
										Procesar
									</v-btn>
									<v-btn @click="setShow(false)" class="ml-4" elevation="0" color="error">
										Cancelar
									</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-col>
					<v-col cols="6">
						<embed :src="pdf_path" width="100%" height="700" />
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

	</div>
</template>

<style>
	.input-bordered{
		border-radius: 10px;
	}
</style>

<script>

	import { mapState, mapMutations, mapActions } from "vuex"

	export default {
		data(){
			return{
				settings: {
					margen_horizontal: 15,
					margen_vertical: 15,
					posicion_y: 15,
					posicion_x: 15,
					lineas_nombre: 1,
					lineas_puesto: 1
				},
				file: null
			}
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			}),
			...mapActions({
				processPDF: 'create_qr/processPDF'
			})
		},
		computed: {

			...mapState({
				signatures: state => state.create_qr.signatures,
				processing: state => state.create_qr.processing,
				pdf_path: state => state.create_qr.file
			})

		}

	}
</script>