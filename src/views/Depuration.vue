<template>
	<div>
		<DataCard :show_search="false">
			<template #table>
				<v-row class="mb-4 mt-4">
					<v-col class="sections-container" cols="5">
						<v-row>
							<v-col cols="12" sm="12" md="6" lg="6" v-for="(section, key) in sections" :key="key">
								<v-hover>
									<template v-slot:default="{hover}">
										<v-card @click="fetchSectionDetail(section)" :elevation="hover ? 6 : section.selected ? 24 : 0" v-bind:class="{ 'card-selected': section.selected}" :style="'background-color: ' + section.color" dark outlined min-height="150">
											<v-card-text>
												<span class="text-h6 font-weight-bold">
													{{ section.nombre.toUpperCase() }}
												</span>
											</v-card-text>
										</v-card>
									</template>
								</v-hover>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="7">
						<ListDocuments />
					</v-col>
					
				</v-row>

			</template>
		</DataCard>
	</div>
</template>

<style scoped>

	.card-selected{
		border: 3px solid black;
	}
	.card-title{
		word-break: break-word
	}
	.sections-container{
		max-height: 700px;
		overflow-y: scroll;
	}

</style>

<script>

	import { mapActions, mapState } from 'vuex'

	import DataCard from '@/components/Home/DataCard'
	import ListDocuments from '@/components/Depuration/ListDocuments'

	export default {
		components: {
			DataCard,
			ListDocuments,
		},
		methods: {
			...mapActions({
				fetchSections: 'depuration/fetchSections',
				fetchSectionDetail: 'depuration/fetchSectionDetail'
			})
		},
		computed: {

			...mapState({
				sections: state => state.depuration.sections,
			}),
		},
		mounted(){
			this.fetchSections()
		}
	}
</script>