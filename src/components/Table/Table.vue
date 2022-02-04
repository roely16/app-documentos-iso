<template>
	<div>
		<v-data-table
			:headers="data.headers"
			:items="data.items"
			:items-per-page="10"
			class="elevation-0"
			v-if="!loading"
			@page-count="(value) => setPageCount(value)"
			:page="page"
			hide-default-footer
			:search="search"
		>

			<template v-for="(item_table, key) in data.headers" v-slot:[getSlotName(item_table)]="{ item, header }">
				
				<slot v-if="header.custom" v-bind="item" :name="header.value"></slot>

				<span v-if="!header.custom" :key="key">{{ item[header.value] }}</span>
				
			</template>

			<template v-slot:no-results>
				<Empty />
			</template>

		</v-data-table>

		<v-row>
			<v-col cols="12">
				<Loading v-if="loading" />
			</v-col>
		</v-row>

		<v-row v-if="!loading">
			<v-col>
				<Pagination />
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import { mapState, mapMutations } from "vuex"

	import Loading from '@/components/Table/Loading'
	import Empty from '@/components/Table/Empty'
	import Pagination from '@/components/Table/Pagination'

	export default {
		props: {
			data: Object
		},
		components: {
			Loading,
			Pagination,
			Empty
		},
		data () {
			return {
				
			}
		},
		methods: {
			...mapMutations({
				setPageCount: 'table/setPageCount'
			}),
			getSlotName(item){
				return `item.` + item.value
			}
		},
		computed: {
			...mapState({
				loading: state => state.table.loading,
				page: state => state.table.page,
				search: state => state.table.search
			})
		}
	}
</script>