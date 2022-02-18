<template>
	<v-card max-height="350" class="card-scroll" elevation="0">
		<v-card-text v-if="bitacora.length > 0">
			<v-timeline
				align-top
				dense
			>
				<v-timeline-item
					color="primary"
					small
					v-for="(item, key) in bitacora"
					:key="key"
				>
					<v-row class="pt-1">
						<v-col cols="3">
							<strong>
								{{ item.fecha }}
							</strong>
						</v-col>
						<v-col cols="9">
							<v-row>
								<v-col>
									<strong>{{ item.registrado_por }}</strong>
									<br>

									<div class="mt-2 mb-2">
										<v-chip v-if="item.estado_anterior" label small :color="item.estado_anterior.color">
											{{ item.estado_anterior.nombre }}
										</v-chip>
										<v-icon v-if="item.estado_anterior && item.estado_actual">
											mdi-arrow-right-thick
										</v-icon>
										<v-chip v-if="item.estado_actual" label small :color="item.estado_actual.color">
											{{ item.estado_actual.nombre }}
										</v-chip>
									</div>

									<div class="text-caption">
										{{ item.text_comentario }}
									</div>
								</v-col>
							</v-row>
							<v-row align="center" v-if="item.adjuntos.length > 0">
								<v-col cols="12">
									<v-card outlined>
										<v-card-text class="pt-0 pb-0 pl-0 pr-0">
											<v-list dense>
												<v-list-item v-for="(adjunto, key) in item.adjuntos" :key="key">
													<v-list-item-content>
														<span class="caption">
															<v-btn x-small icon :href="adjunto.url_download" target="_blank">
																<v-icon class="mr-1">
																	mdi-download	
																</v-icon>
															</v-btn>
															
															{{ adjunto.nombre }}
														</span>
													</v-list-item-content>
												</v-list-item>
											</v-list>
										</v-card-text>
									</v-card>
								</v-col>
							</v-row>
							<v-divider class="mt-4"></v-divider>
						</v-col>
					</v-row>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>

		<v-card-text v-if="bitacora.length == 0">
			<Empty :loop="false" :height="300" />
		</v-card-text>
	</v-card>
</template>

<style scoped>
	.card-scroll{
		overflow-y: auto;
	}
</style>

<script>

	import { mapState } from "vuex"
	import Empty from '@/components/Empty'

	export default {
		
		components: {
			Empty
		},
		methods: {
			
		},
		computed: {
			...mapState({
				bitacora: state => state.document_detail.bitacora
			})
		},
      
	}
</script>