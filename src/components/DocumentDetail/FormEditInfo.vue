<template>
	<v-card>
		<v-card-title class="text-h5 grey lighten-2">
			Editar Información
			<v-spacer></v-spacer>
			<v-btn
				icon
				@click="setShow(false)"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-card-title>
		<v-divider></v-divider>
		<v-form @submit.prevent="updateInfo()" v-model="valid" ref="form">
			<v-card-text style="height: 450px;">
				<v-row class="mt-4">
					<v-col cols="5">
						<v-text-field autocomplete="off" :rules="[v => !!v]" v-model="document_info_edit.codigo_numero" outlined hide-details label="Código">
							<template v-slot:prepend-inner>
								<span class="overline">
									{{ document_info_edit.codigo_tipo }} - {{ document_info_edit.codigo_seccion }}
								</span>
								<v-divider class="ml-2 mr-2" vertical></v-divider>
							</template>
						</v-text-field>
					</v-col>
					<v-col v-if="Object.keys(code_alert).length != 0" cols="7">
						<v-alert class="mb-0" prominent :type="code_alert.type" dense>
							{{ code_alert.message }}
						</v-alert>
					</v-col>
					<v-col cols="12">
						<v-textarea :rules="[v => !!v]" :rows="2" v-model="document_info_edit.nombre" hide-details outlined label="Nombre"></v-textarea>
					</v-col>
					<v-col cols="12">
						<v-textarea v-model="document_info_edit.comentarios" hide-details outlined label="Comentarios"></v-textarea>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-row dense>
					<v-col>
						<v-btn :disabled="code_alert.available === false" type="submit" elevation="0" color="primary" large class="mr-2">
							Aceptar
						</v-btn>
						<v-btn @click="setShow(false)" elevation="0" color="error" large>
							Cancelar
						</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-form>
	</v-card>
</template>

<script>
	
	import { mapMutations, mapState, mapActions } from 'vuex'

	export default {
		data(){
			return{
				valid: true
			}
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			}),
			...mapActions({
				fetchUpdateInfo: 'document_detail/fetchUpdateInfo',
				checkCode: 'upload_document/checkCode'
			}),
			updateInfo(){

				this.$refs.form.validate()

				if (this.valid) {
					
					this.fetchUpdateInfo()

				}

			}
		},
		computed: {
			...mapState({
				document_info_edit: state => state.document_detail.document_info_edit,
				code_alert: state => state.upload_document.code_alert
			})
		},
		watch: {
			'document_info_edit.codigo_numero': function(val){

				const data = {
					edit: true,
					value: val
				}

				console.log(data)

				this.checkCode(data)

			}
		}
	}
</script>