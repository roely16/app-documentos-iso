<template>
	<div>
		<v-row v-if="documents.length > 0">
			<v-col cols="12">
				<v-row justify="center" align="center">
					<v-col class="text-left">
						<v-btn :disabled="page === 1" @click="page--" icon>
							<v-icon>
								mdi-chevron-left
							</v-icon>
						</v-btn>
						<v-btn :disabled="page === number_pages" @click="page++" icon>
							<v-icon>
								mdi-chevron-right
							</v-icon>
						</v-btn>
						{{ ((page - 1) * page_size) + 1 }}-{{ page * page_size > documents_filtered.length ? documents_filtered.length : page * page_size}} de {{ documents_filtered.length }}

						<v-badge
							:content="checked.length"
							:value="checked.length"
							color="error"
							overlap
						>
							<v-btn @click="confirmDelete(checked)" text :disabled="checked.length == 0" class="ml-4" color="error">
								Eliminar
							</v-btn>
						</v-badge>
					</v-col>
					<v-col>
						<v-text-field v-model="search" hide-details clearable prepend-inner-icon="mdi-magnify" placeholder="Buscar..." outlined class="input-rounded"></v-text-field>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12">
				<v-card elevation="0" v-for="(document, key) in document_paginated" :key="key">
					<v-card-text>
						<v-row justify="center" align="center">
							<v-col cols="12">
								<v-checkbox :label="document.nombre" v-model="document.checked" hide-details dense></v-checkbox>
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider></v-divider>
				</v-card>
			</v-col>
		</v-row>

		<v-row v-else class="text-center" justify="center">
			<v-col cols="12">
				<lottie :options="defaultOptions" :height="height"></lottie>
			</v-col>
			<v-col cols="6">
				<span class="overline text-h6">
					Por favor selecciona una coordinación o sección
				</span>
			</v-col>
		</v-row>
	</div>
</template>

<style>
	.input-rounded{
		border-radius: 10px;
	}
	.card-rounded{
		border-radius: 10px;
	}
</style>

<script>

	import Swal from 'sweetalert2'
	import Lottie from 'vue-lottie';

	import { mapState, mapActions } from "vuex"

	export default {

		components: {
			'lottie': Lottie
		},
		data(){
			return{
				page: 1,
				page_size: 10,
				search: null,
				defaultOptions: {
					animationData: require('@/assets/lottie/info.json'),
					loop: this.loop
				},
				height: 200
			}
		},
		methods: {

			...mapActions({
				deleteDocuments: 'depuration/deleteDocuments'
			}),
			confirmDelete(payload){

				Swal.fire({
					title: '¿Está seguro?',
					text: "Al hacerlos los documentos dejarán de estar disponibles en el Portal ISO!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Si, ELIMINAR!'
				}).then((result) => {

					if (result.isConfirmed) {
						
						this.deleteDocuments(payload)

					}

				})

			}

		},
		computed: {
			...mapState({
				documents: state => state.depuration.documents
			}),
			documents_filtered: function(){

				if (this.search) {
					
					const results = this.documents.filter(document => document.nombre.toLowerCase().includes(this.search.toLowerCase()))

					return results
				}
				
				return this.documents
				
			},
			document_paginated: function(){

				return this.documents_filtered.slice((this.page - 1) * this.page_size, this.page * this.page_size)

			},
			number_pages: function(){

				return Math.ceil(this.documents.length / this.page_size)

			},
			checked: function(){

				const results = this.documents.filter(document => document.checked)

				return results

			}
		}

	}
</script>