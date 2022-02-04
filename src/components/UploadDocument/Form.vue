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
									<v-col cols="12">
										<v-autocomplete :rules="[v => !!v]" v-model="documento.tipo_documento" :items="tipos_documento" item-text="nombre" item-value="tipodocumentoid" outlined hide-details label="Tipo de Documento"></v-autocomplete>
									</v-col>
									<v-col cols="12">
										<v-text-field :rules="[v => !!v]" v-model="documento.codigo" outlined hide-details label="Código"></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-text-field :rules="[v => !!v]" v-model="documento.nombre" outlined hide-details label="Nombre del Documento"></v-text-field>
									</v-col>
									<v-col cols="12">
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
							<v-col cols="6">
								
								<PDFViewer v-if="processing_preview || show_preview" />
								
								<ProcessPreview @process="process()" v-if="!processing_preview && !show_preview" :enabled_preview="enabled_preview" />
								
							</v-col>
							<v-col>
								<ConfigPDF @process="process()" v-if="processing_preview || show_preview" />
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-row dense>
						<v-col>
							<v-btn :disabled="uploading" :loading="uploading" @click="upload()" elevation="0" color="primary" large class="mr-2">
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

	import { 
		mapState, 
		mapMutations, 
		mapActions 
	} from 'vuex'

	export default {
		components: {
			PDFViewer,
			ProcessPreview,
			ConfigPDF,
		},
		data(){
			return{
				documento: {
					tipo_documento: null,
					codigo: null,
					nombre: null,
					tipo_almacenamiento: null,
					elabora: null,
					comentarios: null
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
				uploadDocument: 'upload_document/uploadDocument'
			}),
			process(){

				this.fetchPreview({documento: this.documento, pdf: this.pdf})

			},
			upload(){

				this.$refs.form.validate()

				if (this.valid) {

					this.uploadDocument({documento: this.documento, pdf: this.pdf, original: this.original})

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
				show_modal: state => state.modal.show
			}),
			enabled_preview(){

				if (this.pdf && this.documento.elabora) {
					
					this.setEnabledPreview(true)

					return true
				}

				this.setEnabledPreview(false)

				return false

			}
		},
		watch: {
			show_modal: function(val){
				
				if (!val) {
					
					this.resetForm()
					
				}
				
			}
		}
	}
</script>