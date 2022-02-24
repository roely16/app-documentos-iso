<template>
	<div>
		<v-row class="mb-2">
			<v-col cols="10">
				<v-text-field filled prepend-icon="mdi-magnify" class="input-rounded" hide-details dense outlined placeholder="Buscar..."></v-text-field>
			</v-col>
		</v-row>

		<v-divider></v-divider>

		<v-expansion-panels class="elevation-0 scroll">
			<v-expansion-panel
				v-for="(area,i) in areas"
				:key="i"
				elevation="0"
				class="elevation-0"
			>
				<v-expansion-panel-header class="overline">
					{{ area.descripcion }}
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-list
						subheader
						two-line
						flat
					>
						<v-list-item-group
							multiple
							v-model="colaboradores"
						>
							<v-list-item :value="empleado.nit" v-for="(empleado, key) in area.empleados" :key="key">
								<template v-slot:default="{ active }">
									<v-list-item-action>
										<v-checkbox
											:input-value="active"
											color="primary"
										></v-checkbox>
									</v-list-item-action>

									<v-list-item-content>
										<v-list-item-title>
											{{ empleado.nombre }} {{ empleado.apellido }}
										</v-list-item-title>
									</v-list-item-content>
								</template>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<style>
	.scroll{
		overflow-y: auto;
		max-height: 600px;
	}
	.input-rounded{
		border-radius: 10px;
	}
</style>

<script>

	import { mapState, mapMutations } from "vuex"

	export default {

		data(){
			return{
				show_search: false
			}
		},
		methods: {
			...mapMutations({
				setColaboradores: 'permission/setColaboradores'
			})
		},
		computed: {
			...mapState({
				areas: state => state.permission.areas
			}),
			colaboradores: {
				get(){
					return this.$store.state.permission.colaboradores
				},
				set(value){
					this.setColaboradores(value)
				}
			}
		}

	}
</script>