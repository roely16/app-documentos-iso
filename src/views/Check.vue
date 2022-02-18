
<template>
	<div>
		<DataCard>

			<template #table>

				<!-- Filtro -->

				<Filtro @update="fetchData()" />

				<Table :data="data_table">

					<template #action="item">
						<v-btn
							text
							small
							color="primary"
							:to="{name: 'document_detail_check', params: {id: item.documentoid}}"
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
				fetchDataAction: 'fetchData'
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
				data_table: state => state.check.data_table
			})
		},
		mounted(){

			const userData = JSON.parse(localStorage.getItem('app-documentos-iso'))

			this.setArea(userData.codarea)

			this.fetchData()

		}
	}
</script>