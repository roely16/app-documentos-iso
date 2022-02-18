<template>
	<div>
		<v-row>
			<v-col cols="3">
				<v-autocomplete @change="() => { $emit('update') }" v-model="area" :items="filters.areas" item-text="descripcion" item-value="codarea" class="input-rounded" label="Sección o Área" outlined></v-autocomplete>
			</v-col>
			<v-col cols="3">
				<v-autocomplete v-model="tipo" :items="filters.tipos" item-text="nombre" item-value="estadoid" class="input-rounded" label="Tipo" outlined></v-autocomplete>
			</v-col>
			<v-col cols="3">
				<v-autocomplete v-model="estado" :items="filters.estados" item-text="nombre" item-value="tipodocumentoid" class="input-rounded" label="Estado" outlined></v-autocomplete>
			</v-col>
		</v-row>
	</div>
</template>

<style>
	.input-rounded{
		border-radius: 10px;
	}
</style>

<script>

	import { mapActions, mapState, mapMutations } from "vuex"

	export default {

		methods: {
			...mapActions({
				fethFilters: 'filter/fetchFilters'
			}),
			...mapMutations({
				setArea: 'filter/setArea',
				setTipo: 'filter/setTipo',
				setEstado: 'filter/setEstado'
			})
		},
		computed: {

			...mapState({
				filters: state => state.filter.filters,
			}),
			area: {
				get(){
					return this.$store.state.filter.area
				},
				set(value){
					this.setArea(value)
				}
			},
			tipo: {
				get(){
					return this.$store.state.filter.tipo
				},
				set(value){
					this.setTipo(value)
				}
			},
			estado: {
				get(){
					return this.$store.state.filter.estado
				},
				set(value){
					this.setEstado(value)
				}
			}

		},
		mounted(){

			this.fethFilters()

		}

	}
</script>