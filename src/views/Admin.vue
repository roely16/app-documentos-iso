
<template>
	<div>
		<DataCard>

			<template #search>
				<v-text-field v-model="search" hide-details clearable prepend-inner-icon="mdi-magnify" placeholder="Buscar..." outlined class="input-rounded"></v-text-field>
			</template>

			<template #table>

				<!-- Filtro -->

				<Filtro @update="fetchData()" />

				<Table :search_prop="search" external_search :data="data_table_filter">

					<template #action="item">
						<v-btn
							text
							small
							color="primary"
							:to="{name: 'document_detail_admin', params: {id: item.documentoid}}"
						>
							<v-icon>mdi-information</v-icon>
						</v-btn>
					</template>

					<template #estado="item">
						<v-chip :color="item.estado.color" label>
							{{ item.estado.nombre }}
						</v-chip>
					</template>

					<template #tipo_documento="item">
						<v-chip label>
							{{ item.tipo_documento }}
						</v-chip>
					</template>

				</Table>
			</template>

		</DataCard>
			
		<Modal fullscreen :scrollable="true" max_width="100px" width="900">
			<template #content>
				<Form :fetchData="fetchDataAction" :fetchParams="null"></Form>
			</template>
		</Modal>
	</div>
</template>

<script>

	import DataCard from '@/components/Home/DataCard'
	import Table from '@/components/Table/Table'
	import Modal from '@/components/Modal'
	import Form from '@/components/UploadDocument/Form'
	import Filtro from '@/components/Check/Filter'

	import { mapState, mapActions, mapMutations } from 'vuex'

	export default {
		components: {
			DataCard,
			Table,
			Modal,
			Form,
			Filtro
		},
		data(){
			return{
				fetchDataAction: 'fetchData',
				search: null
			}
		},
		methods: {
			...mapActions({
				fetchData: 'check/fetchData',
				fetchFormDocument: 'upload_document/fetchFormDocument',
				fetchDetail: 'document_detail/fetchDetail'
			}),
			...mapMutations({
				setShow: 'modal/setShow',
				setArea: 'filter/setArea'
			}),
			showForm(){

				this.fetchFormDocument()
				
				this.setShow(true)
			}
		},
		computed: {
			...mapState({
				data_table: state => state.check.data_table,
				area: state => state.filter.area,
				tipo: state => state.filter.tipo,
				estado: state => state.filter.estado
			}),
			data_table_filter: function(){

				if (this.data_table.items && (this.tipo || this.estado)) {
					
					let result = this.data_table.items.filter(item => this.tipo && this.estado ? (item.tipodocumentoid == this.tipo && item.estadoid == this.estado) : (item.tipodocumentoid == this.tipo || item.estadoid == this.estado))
					
					return {
						headers: this.data_table.headers,
						items: result
					}

				}
				
				return this.data_table
				
			}
		},
		mounted(){	

			this.fetchData()

		}
	}
</script>