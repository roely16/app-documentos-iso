<template>
	<div class="mb-4">
		<v-row align="center" v-for="(value, label) in document" :key="label">
			<v-col class="pb-1" cols="4">
				<h3 class="text-capitalize">
					{{ label }}:
				</h3>
			</v-col>
			<v-col class="pb-1">
				<slot v-bind="{ label, value }" :name="label">
					<h3 class="font-weight-light">
						{{ value }}
					</h3>
				</slot>
			</v-col>
		</v-row>
		<v-row v-if="permissions.editable" class="text-right">
			<v-col class="mb-0 pb-0" cols="12">
				<v-btn color="error" small text>
					Eliminar
					<v-icon right>
						mdi-delete
					</v-icon>
				</v-btn>
				<v-btn @click="fetchEditInfo(id)" color="primary" small text>Editar
					<v-icon right>
						mdi-pencil
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import { mapState, mapActions } from "vuex"

	export default {
		
		methods: {
			...mapActions({
				fetchEditInfo: 'document_detail/fetchEditInfo'
			}),
		},
		computed: {

			...mapState({
				document: state => state.document_detail.document,
				permissions: state => state.routes.permissions 
			}),
			id: function(){
				return this.$route.params.id
			}

		}

	}
</script>