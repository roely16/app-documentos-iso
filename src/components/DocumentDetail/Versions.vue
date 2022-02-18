<template>
	<div>
		<v-row>
			<v-col>
				<DataCard :outlined="false" :elevation="0">
					{{ versions }}
					<template #table>
						<Table :data="versions">

							<template #action="item">
								<v-btn @click="sendToViewer(item)" icon>
									<v-icon>
										mdi-cast
									</v-icon>
								</v-btn>
								<v-btn @click="() => {

									fetchSeguimiento(item)

								}" color="primary" icon>
									<v-icon>
										mdi-information
									</v-icon>
								</v-btn>
							</template>

							<template #estado="item">
								<v-chip :color="item.estado.color" label>
									{{ item.estado.nombre }}
								</v-chip>
							</template>

						</Table>
					</template>
					<template #action>
						<v-btn v-if="add_version" :disabled="!allow_create_version" @click="() => {

							setModalContent('form_version')
							setShow(true)

						}" text>
							<v-icon>
								mdi-plus
							</v-icon>
						</v-btn>
					</template>
				</DataCard>
			</v-col>
		</v-row>
		
	</div>
</template>

<script>

	import Table from '@/components/Table/Table'
	import DataCard from '@/components/Home/DataCard'

	import { mapActions, mapState, mapMutations } from 'vuex'

	export default {
		props: {
			add_version: {
				type: Boolean,
				default: true
			}
		},
		components: {
			Table,
			DataCard
		},
		methods: {
			...mapActions({
				fetchVersions: 'document_detail/fetchVersions',
				sendToViewer: 'document_detail/sendToViewer',
				fetchSeguimiento: 'document_detail/fetchSeguimiento'
			}),
			...mapMutations({
				setShow: 'modal/setShow',
				setModalContent: 'modal/setModalContent',
				setLoading: 'modal/setLoading',
				setDetailVersion: 'document_detail/setDetailVersion'
			}),
			showDetail(item){
				console.log(item)
			}
		},
		computed: {
			...mapState({
				versions: state => state.document_detail.versions,
				allow_create_version: state => state.document_detail.allow_create_version
			})
		},
		mounted(){

			const id = this.$route.params.id

			this.fetchVersions(id)

		}
	}
</script>