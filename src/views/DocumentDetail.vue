<template>
	<div>

		<v-card  min-height="700" class="pl-4 pt-4 pr-4 pb-4" outlined elevation="2" style="border-radius: 10px">
			<v-card-text v-if="!loading">
				<v-row>
					<v-col cols="8">
						<v-card outlined elevation="0" min-height="250">
							<v-card-text>
								<Info>
									
									<template #estado="item">
										<v-chip label>
											{{ item.value }}
										</v-chip>
									</template>

									<template v-slot:[tipo_documento]="item">
										<v-chip label>
											{{ item.value }}
										</v-chip>
									</template>
								</Info>								
							</v-card-text>
						</v-card>
					</v-col>
					<v-col>
						<v-row>
							<v-col class="pb-0" cols="12">
								<PDFViewer :height_loading="250" :height="250" />
							</v-col>
							<v-col class="pt-0" cols="12">
								<v-row>
									<v-col>
										<span class="overline">Versión {{ preview_version }}</span>
									</v-col>
									<v-col class="text-right">
										<v-btn @click="() => {
											setModalContent('pdf_preview')
											setShow(true)	
										}" icon>
											<v-icon>mdi-fullscreen</v-icon>
										</v-btn>
									</v-col>
								</v-row>
								
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<v-card elevation="0" outlined>
							<v-tabs v-model="tab">
								<v-tab>Versiones</v-tab>
							</v-tabs>
							<v-tabs-items v-model="tab">
								<v-tab-item>
									<Versions :add_version="add_version" />
								</v-tab-item>
							</v-tabs-items>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-text>

				<Loading v-if="loading" />

			</v-card-text>
		</v-card>
		
		<Modal :fullscreen="modal_content === 'form_version' || modal_content === 'form_detail_version' ? true : false" :scrollable="true" max_width="100px" width="900">
			<template #content>
				<FullScreenPDF v-if="modal_content === 'pdf_preview'" />
				<FormVersion :fetchParams="fetchParams" fetchRoot :fetchData="fetchData" version v-if="modal_content === 'form_version'"></FormVersion>
				<FormDetailVersion :show_update="show_update" v-if="modal_content === 'form_detail_version'" />
			</template>
		</Modal>
	</div>
</template>

<script>

	import Info from '@/components/DocumentDetail/Info'
	import Loading from '@/components/Table/Loading'
	import PDFViewer from '@/components/PDFViewer'
	import Modal from '@/components/Modal'
	import Versions from '@/components/DocumentDetail/Versions'
	import FullScreenPDF from '@/components/DocumentDetail/PDFPreview'
	import FormVersion from '@/components/UploadDocument/Form'
	import FormDetailVersion from '@/components/DocumentDetail/FormDetailVersion'

	import { mapState, mapActions, mapMutations } from 'vuex'

	export default {
		props: {
			add_version: {
				type: Boolean,
				default: true
			},
			show_update: {
				type: Boolean,
				default: false
			}
		},
		components: {
			Info,
			Loading,
			PDFViewer,
			Modal,
			Versions,
			FullScreenPDF,
			FormVersion,
			FormDetailVersion
		},
		data(){
			return{
				tab: 0,
				tipo_documento: 'tipo de documento',
				seccion: 'sección',
				fetchData: 'document_detail/fetchVersions',
				fetchParams: this.$route.params.id
			}
		},
		methods: {
			...mapActions({
				fetchDetail: 'document_detail/fetchDetail',
				fetchFormDocument: 'upload_document/fetchFormDocument',
			}),
			...mapMutations({
				setShow: 'modal/setShow',
				setModalContent: 'modal/setModalContent'
			})
		},
		computed: {
			...mapState({
				loading: state => state.document_detail.loading,
				modal_content: state => state.modal.modal_content,
				preview_version: state => state.document_detail.preview_version
			})
		},
		mounted(){

			const id = this.$route.params.id

			this.fetchDetail(id)

			this.fetchFormDocument()

		}
	}
</script>