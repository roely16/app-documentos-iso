
<template>
	<div>
		<DataCard>

			<template #action>
				<v-btn @click="showForm()" text>
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</template>
			<template #table>
				<Table :data="data_table">

					<template #action="item">
						<v-btn
							text
							small
							color="primary"
							:to="{name: 'document_detail', params: {id: item.documentoid}}"
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

	import { mapState, mapActions, mapMutations } from 'vuex'

	export default {
		components: {
			DataCard,
			Table,
			Modal,
			Form
		},
		data(){
			return{
				fetchDataAction: 'fetchData'
			}
		},
		methods: {
			...mapActions({
				fetchData: 'upload_document/fetchData',
				fetchFormDocument: 'upload_document/fetchFormDocument',
				fetchDetail: 'document_detail/fetchDetail'
			}),
			...mapMutations({
				setShow: 'modal/setShow'
			}),
			showForm(){

				this.fetchFormDocument()
				
				this.setShow(true)
			}
		},
		computed: {
			...mapState({
				data_table: state => state.upload_document.data_table
			})
		},
		mounted(){

			this.fetchData()

		}
	}
</script>