<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-text-field v-model="search" label="Buscar..." outlined hide-details prepend-inner-icon="mdi-magnify" ></v-text-field>
			</v-col>
			<v-col align="right">
				<v-btn @click="() => {
					form = 'create'
					fetchAreas()	
				}" text>
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<Table :search_prop="search" :data="data_table">
					<template #action="item">
						<v-btn @click="() => {
							form = 'edit'	
							fetchPermissionDetail(item)
						}" color="primary" icon>
							<v-icon>
								mdi-information
							</v-icon>
						</v-btn>
					</template>
					<template #accesos="item">
						<v-chip :color="acceso.option.color" class="mr-2 mt-2" v-for="(acceso, key) in item.accesos" :key="key" label>
							{{ acceso.option.nombre }}
						</v-chip>
					</template>
				</Table>
			</v-col>
		</v-row>
		
		<Modal width="1000" scrollable>
			<template #content>
				<Form v-if="form === 'create'"></Form>
				<FormEdit v-if="form === 'edit'"></FormEdit>
			</template>
		</Modal>	

	</div>
</template>

<script>

	import Table from '@/components/Table/Table'
	import Modal from '@/components/Modal'
	import Form from '@/components/Config/Form'
	import FormEdit from '@/components/Config/FormEditPermission'

	import { mapActions, mapState } from 'vuex'

	export default {
		components: {
			Table,
			Modal,
			Form,
			FormEdit
		},
		data(){
			return{
				search: null,
				form: null
			}
		},
		methods: {
			...mapActions({
				fetchAreas: 'permission/fetchAreas',
				fetchPermissions: 'permission/fetchPermissions',
				fetchPermissionDetail: 'permission/fetchPermissionDetail'
			})
		},
		computed: {
			...mapState({
				data_table: state => state.permission.data_table
			})
		},
		mounted(){

			this.fetchPermissions()

		}
	}
</script>