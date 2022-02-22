<template>
	<div>
		<v-card elevation="0" min-height="350">
			<v-card-text>
				<v-row>
					<v-col cols="12">
						<v-textarea v-model="comentario" hide-details counter="4000" :rows="3" label="Comentario" placeholder="Agregar un comentario a la bitácora" outlined></v-textarea>
					</v-col>
					<v-col>
						<v-file-input hide-details v-model="adjuntos" counter show-size multiple outlined prepend-icon="" label="Adjuntar archivos">
							<template v-slot:selection="{ index, text }">
								<v-chip
									v-if="index < 2"
									color="primary"
									dark
									label
									small
								>
									{{ text }}
								</v-chip>

								<span
									v-else-if="index === 2"
									class="text-overline grey--text text--darken-3 mx-2"
								>
									+{{ adjuntos.length - 2 }} Archivo(s)
								</span>
							</template>
						</v-file-input>
					</v-col>
				</v-row>

				<v-divider></v-divider>

				<v-row class="mt-4"  align="center">
					<v-col cols="6">
						<v-autocomplete
							v-model="estadoSelect"
							:items="detail_version.estados"
							chips
							color="blue-grey lighten-2"
							label="Cambiar Estado"
							item-text="nombre"
							item-value="estadoid"
							outlined
							hide-details
						>
							<template v-slot:selection="data">
								<v-chip
									v-bind="data.attrs"
									:input-value="data.selected"
									:color="data.item.color"
								>
									<v-icon class="mr-1">
										{{ data.item.icon }}
									</v-icon>
									{{ data.item.nombre }}
								</v-chip>
							</template>

							<template v-slot:item="data">
								<template>
									<v-list-item-avatar>
										<v-icon>
											{{ data.item.icon }}
										</v-icon>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title v-html="data.item.nombre"></v-list-item-title>
									</v-list-item-content>
								</template>
							</template>

						</v-autocomplete>

					</v-col>
					<v-col align="right">
						<v-btn :loading="saving_bitacora" :disabled="(!comentario  && !estadoSelect) || saving_bitacora" @click="changeState(estadoSelect)" elevation="0" color="primary">Aceptar</v-btn>
						<v-btn @click="clearFormBitacora()" elevation="0" class="ml-2" color="error">Cancelar</v-btn>
					</v-col>
				</v-row>

				<v-row v-if="alert_msg.alert_message">
					<v-col>
						<v-alert
							icon="mdi-information"
							prominent
							text
							type="info"
						>
							{{ alert_msg.alert_message }}
						</v-alert>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>

	import { mapActions, mapState, mapMutations } from "vuex"

	export default {

		methods: {
			...mapActions({
				changeState: 'document_detail/changeState'
			}),
			...mapMutations({
				setComentario: 'document_detail/setComentario',
				setAdjuntos: 'document_detail/setAdjuntos',
				setCambioEstado: 'document_detail/setCambioEstado',
				clearFormBitacora: 'document_detail/clearFormBitacora'
			}),
		},
		computed: {
			...mapState({
				saving_bitacora: state => state.document_detail.saving_bitacora,
				detail_version: state => state.document_detail.detail_version
			}),
			comentario: {
				get(){
					return this.$store.state.document_detail.comentario
				},
				set(value){
					this.setComentario(value)
				}
			},
			adjuntos: {
				get(){
					return this.$store.state.document_detail.adjuntos
				},
				set(value){
					this.setAdjuntos(value)
				}
			},
			estadoSelect: {
				get(){
					return this.$store.state.document_detail.cambio_estado
				},
				set(value){
					this.setCambioEstado(value)
				}
			},
			alert_msg: function(){

				let result = this.detail_version.estados.filter(item => item.estadoid === this.estadoSelect)

				return result.length > 0 ? result[0] : false
			}
		}

	}
</script>