<template>
	<div>
		<v-card :outlined="outlined" :elevation="elevation" style="border-radius: 10px">
			<v-card-text v-if="show_search" class="mt-4">
				<v-row align="center">
					<v-col cols="4">
						<slot name="search">
							<v-text-field v-model="search" hide-details clearable prepend-inner-icon="mdi-magnify" placeholder="Buscar..." outlined class="input-rounded"></v-text-field>
						</slot>
					</v-col>
					<v-col class="text-right">
						<slot name="action">
						</slot>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-text>
				<slot name="table"></slot>
			</v-card-text>
		</v-card>
	</div>
</template>

<style>
	.input-rounded{
		border-radius: 10px;
	}
	.card-rounded{
		border-radius: 10px;
	}
</style>

<script>

	import { mapMutations } from "vuex"

	export default {
		props: {
			outlined: {
				type: Boolean,
				default: true
			},
			elevation: {
				type: Number,
				default: 2
			},
			show_search: {
				type: Boolean, 
				default: true
			}
		},
		methods: {
			...mapMutations({
				setSearch: 'table/setSearch'
			})
		},
		computed: {
			search: {
				get(){
					return this.$store.state.table.search
				},
				set(value){
					this.setSearch(value)
				}
			}
		}
	}
</script>