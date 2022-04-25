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
		<v-row v-if="permissions.editable" class="text-right">
			<v-col class="mb-0 pb-0" cols="12">
				<v-btn @click="confirmDelete" color="error" small text>
					Eliminar
					<v-icon right>
						mdi-delete
					</v-icon>
				</v-btn>
				<v-btn @click="fetchEditInfo(id)" color="primary" small text>Editar
					<v-icon right>
						mdi-pencil
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import Swal from "sweetalert2"

	import { mapState, mapActions } from "vuex"

	export default {
		
		methods: {
			...mapActions({
				fetchEditInfo: 'document_detail/fetchEditInfo',
				fetchDeleteDocument: 'document_detail/fetchDeleteDocument'
			}),
			confirmDelete(){

				Swal.fire({
					title: '¿Está seguro?',
					text: "El documento será eliminado junto con su historial de versiones y no será posible recuperarlo!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si, ELIMINAR!',
					cancelButtonText: 'Cancelar'
				}).then((result) => {

					if (result.isConfirmed) {
						
						this.fetchDeleteDocument(this.id)

					}
					
				})

			}
		},
		computed: {

			...mapState({
				document: state => state.document_detail.document,
				permissions: state => state.routes.permissions 
			}),
			id: function(){
				return this.$route.params.id
			}

		}

	}
</script>