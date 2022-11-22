<template>
	<div>
		<v-card outlined>
			<v-card-text>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">
								Código
							</span>
						</v-chip>
					</v-col>
					<v-col>
						{{ detail_version.codigo }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">
								Nombre
							</span>
						</v-chip>
					</v-col>
					<v-col>
						{{ detail_version.nombre }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">Tipo</span>					
						</v-chip>
					</v-col>
					<v-col>
						{{ detail_version.tipo_documento }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">Versión</span>					
						</v-chip>
					</v-col>
					<v-col>
						<v-chip label small color="info">
							{{ detail_version.version }}
						</v-chip>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">Elaborado Por</span>					
						</v-chip>
					</v-col>
					<v-col>
						{{ detail_version.elaborado_por }}
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">Estado</span>					
						</v-chip>
					</v-col>
					<v-col>
						<v-chip :color="detail_version.estado.color" small label>
							{{ detail_version.estado.nombre }}
						</v-chip>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-chip small label>
							<span class="text-overline">Comentarios</span>					
						</v-chip>
					</v-col>
					<v-col>
						{{ detail_version.comentarios }}
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>

	import { mapState } from "vuex"

	export default {

		computed: {
			...mapState({
				detail_version: state => state.document_detail.detail_version
			})
		}

	}
</script>