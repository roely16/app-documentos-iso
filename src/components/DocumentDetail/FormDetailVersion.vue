<template>
	<v-card>
		<v-card-title class="text-h5 grey lighten-2">
			Seguimiento
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
			<v-row class="mt-4">
				<v-col cols="6">

					<InfoVersion />
					
					<v-card elevation="0" class="mt-4" outlined>
						<v-tabs v-model="tab">
							<v-tab v-if="show_update">Actualización</v-tab>
							<v-tab>Bitácora</v-tab>
						</v-tabs>
						<v-tabs-items v-model="tab">
							<v-tab-item v-if="show_update">
								<CambioEstado />
							</v-tab-item>
							<v-tab-item>
								<Bitacora />
							</v-tab-item>
						</v-tabs-items>
					</v-card>
					
				</v-col>
				<v-col cols="6">
					<PDFViewer :path="detail_version.pdf_path" :height="700"></PDFViewer>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>

	import { mapMutations, mapState } from "vuex"

	import PDFViewer from "../PDFViewer.vue"
	import Bitacora from '@/components/DocumentDetail/Bitacora'
	import InfoVersion from '@/components/DocumentDetail/InfoVersion'
	import CambioEstado from '@/components/DocumentDetail/CambioEstado'

	export default {
		props: {
			show_update: {
				type: Boolean,
				default: false
			},
			show_bitacora: {
				type: Boolean,
				default: true
			}
		},
		components: { 
			PDFViewer,
			Bitacora,
			InfoVersion,
			CambioEstado 
		},
		data(){
			return{
				tab: 0
			}	
		},
		methods: {
			...mapMutations({
				setShow: "modal/setShow"
			})
		},
		computed: {
			...mapState({
				document: state => state.document_detail.document,
				detail_version: state => state.document_detail.detail_version
			})
		}
		
	}
</script>