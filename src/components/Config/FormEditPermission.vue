<template>
	<v-card>
		<v-card-title class="text-h5 grey lighten-2">
			Editar Permisos
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
				<v-col cols="4">
					<!-- Información del colaborador -->
					<v-row>
						<v-col cols="12">
							<span class="font-weight-bold">Colaborador</span>
							<h2 class="overline">
								{{ colaborador.nombre }} {{ colaborador.apellido }}
							</h2>
						</v-col>
						<v-col cols="12">
							<span class="font-weight-bold">Sección o Coordinación</span>
							<h2 class="overline">
								{{ colaborador.area }}
							</h2>
						</v-col>
					</v-row>
					
				</v-col>
				<v-divider vertical></v-divider>
				<v-col>
					<v-row>
						<v-col>
							<v-chip label color="error" class="overline">Pendientes</v-chip>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="4" v-for="(pendiente, key) in pendientes" :key="key">
							<v-hover v-slot="{ hover }">
					
								<v-card class="rounded-card" :elevation="hover ? 2 : 0" :color="hover ? 'grey lighten-3' : 'grey lighten-4'" outlined min-height="150">

									<v-card-text>
										<lottie :options="{
											animationData: require('@/assets/lottie/' + pendiente.icon)	
										}" :height="75"/>
									</v-card-text>

									<v-card-text :class="['overline', 'font-weight-bold', 'text-center', 'mt-0', 'pt-0']">
										{{ pendiente.nombre }}
									</v-card-text>

									<v-card-actions class="text-center">
										<v-btn @click="remove_add_permission({action: 'add', id_menu: pendiente.id})" small color="success" text>
											Agregar
										</v-btn>
									</v-card-actions>

								</v-card>
							</v-hover>
						</v-col>

						<v-col v-if="pendientes.length <= 0" cols="12">
							<span class="overline">
								-- SIN PERMISOS PARA AGREGAR --
							</span>
						</v-col>
					</v-row>

					<v-row>
						<v-col>
							<v-chip color="success" label class="overline">Asignados</v-chip>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="4" v-for="(asignado, key) in asignados" :key="key">
							<v-hover v-slot="{ hover }">
					
								<v-card class="rounded-card" :elevation="hover ? 2 : 0" :color="hover ? 'grey lighten-3' : 'grey lighten-4'" outlined min-height="150">

									<v-card-text>
										<lottie :options="{
											animationData: require('@/assets/lottie/' + asignado.icon)	
										}" :height="75"/>
									</v-card-text>

									<v-card-text :class="['overline', 'font-weight-bold', 'text-center', 'mt-0', 'pt-0']">
										{{ asignado.nombre }}
									</v-card-text>
									<v-card-actions class="text-center">
										<v-btn @click="remove_add_permission({action: 'remove', id_menu: asignado.id})" small color="error" text>
											Quitar
										</v-btn>
									</v-card-actions>

								</v-card>
							</v-hover>
						</v-col>

						<v-col v-if="asignados.length <= 0" cols="12">
							<span class="overline">
								-- SIN PERMISOS PARA QUITAR --
							</span>
						</v-col>

					</v-row>
				</v-col>
			</v-row>

		</v-card-text>
	</v-card>
</template>

<script>

	import { mapMutations, mapState, mapActions } from "vuex"

	import Lottie from 'vue-lottie';

	export default {

		components: {
			'lottie': Lottie
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			}),
			...mapActions({
				remove_add_permission: 'permission/remove_add_permission'
			})
		},
		computed: {
			...mapState({
				colaborador: state => state.permission.colaborador,
				pendientes: state => state.permission.pendientes,
				asignados: state => state.permission.asignados
			})
		}

	}
</script>