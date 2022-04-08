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
			<v-card-text style="height: 350px;">
				<v-row class="mt-4">
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
						<v-btn type="submit" elevation="0" color="primary" large class="mr-2">
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
				fetchUpdateInfo: 'document_detail/fetchUpdateInfo'
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
				document_info_edit: state => state.document_detail.document_info_edit
			})
		}
	}
</script>