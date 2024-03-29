<template>
		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				Subir Documento
				<v-spacer></v-spacer>
				<v-btn
					icon
					@click="setShow(false)"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text style="height: 700px;">
				<v-form ref="form" v-model="valid" @submit.prevent="uploadDocument()">
					<v-row class="mt-4">
						<v-col cols="4">
							<v-row>
								<v-col v-if="!version" cols="12">
									<v-autocomplete @change="getAcronimoTipo(documento.tipo_documento)" :rules="[v => !!v]" v-model="documento.tipo_documento" :items="tipos_documento" item-text="nombre" item-value="tipodocumentoid" outlined hide-details label="Tipo de Documento"></v-autocomplete>
								</v-col>
								<v-col v-if="!version" cols="12">
									<v-text-field :hint="'Los ceros serán agregados de manera automática.  Resultado: ' + zeros" persistent-hint :rules="[v => !!v]" v-model="documento.codigo" outlined label="Código">
										<template v-slot:prepend-inner>
											<span class="overline">
												<!--
													/*
														* Primer elemento Tipo de Documento
														* Segundo elemento Coordinación o Sección
													*/
												-->
												{{ acronimo_tipo_documento ? acronimo_tipo_documento : 'XX' }}-{{ acronimo_seccion ? acronimo_seccion : 'XX' }}
											</span>
											<v-divider class="ml-2 mr-2" vertical></v-divider>
										</template>
									</v-text-field>
								</v-col>
								<v-col class="pt-0" v-if="Object.keys(code_alert).length != 0" cols="12">
									<v-alert class="mb-0" prominent :type="code_alert.type" dense>
										{{ code_alert.message }}
									</v-alert>
								</v-col>
								<v-col v-if="!version" cols="12">
									<v-text-field :rules="[v => !!v]" v-model="documento.nombre" outlined hide-details label="Nombre del Documento"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field :rules="[v => !!v]" v-model="documento.version" outlined hide-details label="Versión"></v-text-field>
								</v-col>
								<v-col v-if="!version" cols="12">
									<v-autocomplete :rules="[v => !!v]" v-model="documento.tipo_almacenamiento" :items="tipos_almacenamiento" outlined hide-details label="Tipo de Almacenamiento"></v-autocomplete>
								</v-col>
								<v-col cols="12">
									<v-autocomplete :rules="[v => !!v]" v-model="documento.elabora" :items="colaboradores" item-text="nombre" item-value="nit" outlined hide-details label="Elabora"></v-autocomplete>
								</v-col>
							</v-row>

							<v-divider class="mt-4 mb-4"></v-divider>

							<v-row>
								<v-col cols="12">
									<v-file-input :rules="[v => !!v]" v-model="pdf" show-size prepend-icon="" hide-details outlined label="Documento PDF"></v-file-input>
								</v-col>
								<v-col cols="12">
									<v-file-input :rules="[v => !!v]" v-model="original" show-size prepend-icon="" hide-details outlined label="Documento Original (Word, Excel)"></v-file-input>
								</v-col>
							</v-row>

							<v-divider class="mt-4 mb-4"></v-divider>

							<v-row>
								<v-col>
									<v-textarea v-model="documento.comentarios" label="Comentarios" outlined></v-textarea>
								</v-col>
							</v-row>
						</v-col>
						<v-col v-if="TipoSelect(documento.tipo_documento ? documento.tipo_documento : detail_version.tipodocumentoid).generar_qr == 'S'" cols="6">
														
							<PDFViewer v-if="(processing_preview || show_preview) && !error_pdf" />
							
							<ProcessPreview @process="process()" v-if="(!processing_preview && !show_preview) || error_pdf" :enabled_preview="enabled_preview" />
							
							<v-row v-if="error_pdf">
								<v-col>
									<v-alert
										prominent
										type="error"
										text
										icon="mdi-alert-circle"
									>
										<span class="overline">
											El documento se encuentra en un formato que no es compatible.  Probar de nuevo con un nuevo documento.
										</span>
									</v-alert>
								</v-col>
							</v-row>
							
						</v-col>

						<v-col cols="8" justify="center" v-if="!TipoSelect(documento.tipo_documento ? documento.tipo_documento : detail_version.tipodocumentoid).generar_qr && documento.tipo_documento">
							<QR />
							<v-row align="center" justify="center">
								<v-col cols="6">
									<v-alert icon="mdi-information" prominent text type="info">
										<span class="overline">
											El tipo de documento no requiere generar QR.
										</span>
									</v-alert>
								</v-col>
							</v-row>
						</v-col>
						<v-col v-if="TipoSelect(documento.tipo_documento ?  documento.tipo_documento : detail_version.tipodocumentoid).generar_qr == 'S'">
							<ConfigPDF @process="process()" v-if="(processing_preview || show_preview) && !error_pdf" />
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-row dense>
					<v-col>
						<v-btn :disabled="(uploading || error_pdf || !code_alert.available) && !version" :loading="uploading" @click="upload()" elevation="0" color="primary" large class="mr-2">
							Aceptar
						</v-btn>
						<v-btn :disabled="uploading" @click="setShow(false)" elevation="0" color="error" large>
							Cancelar
						</v-btn>
					</v-col>						
				</v-row>
			</v-card-actions>
		</v-card>	
</template>

<script>

	import PDFViewer from '@/components/PDFViewer'
	import ProcessPreview from '@/components/UploadDocument/ProcessPreview'
	import ConfigPDF from '@/components/UploadDocument/ConfigPDF'
	import QR from '@/components/QR'

	import { 
		mapState, 
		mapMutations, 
		mapActions,
		mapGetters 
	} from 'vuex'

	export default {
		components: {
			PDFViewer,
			ProcessPreview,
			ConfigPDF,
			QR
		},
		props: {
			version: {
				type: Boolean,
				default: false
			},
			fetchData: [String, Array],
			fetchRoot: {
				type: Boolean,
				default: false
			},
			fetchParams: [String, Array, Object]
		},
		data(){
			return{
				documento: {
					tipo_documento: null,
					codigo: null,
					nombre: null,
					tipo_almacenamiento: null,
					elabora: null,
					comentarios: null,
					version: null,
					parent_documentoid: this.$route.params.id ? this.$route.params.id : null
				},
				pdf: null,
				original: null,
				valid: true
			}
		},
		methods: {
			...mapMutations({
				setEnabledPreview: 'upload_document/setEnabledPreview',
				setShow: 'modal/setShow',
				resetForm: 'upload_document/resetForm'
			}),
			...mapActions({
				fetchPreview: 'upload_document/fetchPreview',
				uploadDocument: 'upload_document/uploadDocument',
				getAcronimoTipo: 'upload_document/getAcronimoTipo',
				getAcronimoSeccion: 'upload_document/getAcronimoSeccion',
				checkCode: 'upload_document/checkCode'
			}),
			process(){
				this.fetchPreview({documento: this.documento, pdf: this.pdf})
			},
			upload(){

				this.$refs.form.validate()

				if (this.valid) {

					this.documento.codigo_zeros = this.zeros
					
					this.uploadDocument({
						documento: this.documento, 
						pdf: this.pdf, 
						original: this.original, 
						fetchData: this.fetchData,
						fetchRoot: this.fetchRoot,
						fetchParams: this.fetchParams
					})

				}

			}
		},
		computed: {
			...mapState({
				tipos_documento: state => state.upload_document.tipos_documento,
				tipos_almacenamiento: state => state.upload_document.tipos_almacenamiento,
				colaboradores: state => state.upload_document.colaboradores,
				processing_preview: state => state.pdf_preview.processing_preview,
				show_preview: state => state.upload_document.show_preview,
				uploading: state => state.upload_document.uploading,
				show_modal: state => state.modal.show,
				acronimo_tipo_documento: state => state.upload_document.acronimo_tipo_documento,
				acronimo_seccion: state => state.upload_document.acronimo_seccion,
				error_pdf: state => state.upload_document.error_pdf,
				detail_version: state => state.document_detail.detail_version,
				code_alert: state => state.upload_document.code_alert
			}),
			...mapGetters({
				TipoSelect: 'upload_document/TipoSelect'
			}),
			enabled_preview(){

				if (this.pdf && this.documento.elabora) {
					
					this.setEnabledPreview(true)

					return true
				}

				this.setEnabledPreview(false)

				return false

			},
			zeros: function(){

				if (this.documento.codigo) {
					
					return this.documento.codigo.padStart(4, '0')

				}

				return ''
			}
		},
		watch: {
			show_modal: function(val){
				
				if (!val) {
					
					this.resetForm()
					
				}
				
			},
			'documento.codigo': function(){

				this.checkCode(this.zeros)

			}
		},
		mounted(){

			this.getAcronimoSeccion()

		}
	}
</script>