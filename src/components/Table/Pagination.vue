<template>
	<div>
		<v-pagination
			v-model="page"
			:length="page_count"
		></v-pagination>
	</div>
</template>

<script>

	import { mapState, mapMutations } from "vuex"

	export default {

		methods: {
			...mapMutations({
				setPage: 'table/setPage'
			})
		},
		computed: {
			...mapState({
				page_count: state => state.table.page_count
			}),
			page: {
				get(){
					return this.$store.state.table.page
				},
				set(value){
					this.setPage(value)
				}
			}
		}

	}
</script>