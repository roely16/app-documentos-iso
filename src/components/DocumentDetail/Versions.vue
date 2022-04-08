<template>
	<div>
		<v-row>
			<v-col>
				<DataCard :outlined="false" :elevation="0">

					<template #search>
						<v-text-field v-model="search" hide-details clearable prepend-inner-icon="mdi-magnify" placeholder="Buscar..." outlined class="input-rounded"></v-text-field>
					</template>

					<template #table>
						<Table :data="versions" :search_prop="search" external_search>

							<template #action="item">
								
								<v-menu offset-y>
									<template v-slot:activator="{ on, attrs }">
										<v-btn v-bind="attrs" v-on="on" color="blue-grey darken-1" icon>
											<v-icon>
												mdi-download
											</v-icon>
										</v-btn>
									</template>
									<v-list>
										<v-list-item
											v-for="(option, index) in options_menu"
											:key="index"
											:href="option.url + item.documentoid + '/' + option.option" 
											target="_blank"
										>
											<v-list-item-title>{{ option.title }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
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
		data(){
			return{
				options: ['PDF', 'Original'],
				search: ''
			}
		},
		methods: {
			...mapActions({
				fetchVersions: 'document_detail/fetchVersions',
				sendToViewer: 'document_detail/sendToViewer',
				fetchSeguimiento: 'document_detail/fetchSeguimiento',
				fetchFormDocument: 'upload_document/fetchFormDocument',
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
			}),
			options_menu(){

				let options = ['PDF', 'Original']

				let result = []

				options.forEach(option => {
					

					result.push({
						title: option, 
						url: process.env.VUE_APP_API_URL + 'download_document/',
						option: option.toLowerCase()
					})

				});

				return result

			}
		},
		mounted(){

			const id = this.$route.params.id

			const name_route = this.$route.path.split('/')

			this.fetchVersions({id: id, route_name: name_route[2]})

		}
	}
</script>