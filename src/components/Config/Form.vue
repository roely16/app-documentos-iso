<template>
	<v-card>
		<v-card-title class="text-h5 grey lighten-2">
			Agregar Permisos
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
			<v-row>
				<v-col class="mt-4">
					<Usuarios />
				</v-col>
				<v-col class="mt-4">
					<Accesos />
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions class="mb-4 mt-4">
			<v-row dense>
				<v-col>
					<v-btn @click="savePermission()" :disabled="options_select.length == 0 || colaboradores.length == 0 || saving" :loading="saving" elevation="0" color="primary" large class="mr-2">
						Aceptar
					</v-btn>
					<v-btn @click="setShow(false)" elevation="0" color="error" large>
						Cancelar
					</v-btn>
				</v-col>						
			</v-row>
		</v-card-actions>
	</v-card>	
</template>

<script>

	import Usuarios from '@/components/Config/Usuarios'
	import Accesos from '@/components/Config/Accesos'

	import { mapMutations, mapState, mapActions } from "vuex"

	export default {

		components: {
			Usuarios,
			Accesos
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			}),
			...mapActions({
				savePermission: 'permission/savePermission'
			})
		},
		computed: {
			...mapState({
				options_select: state => state.permission.options_select,
				colaboradores: state => state.permission.colaboradores,
				saving: state => state.permission.saving
			})
		}

	}

</script>