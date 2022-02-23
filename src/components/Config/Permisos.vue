<template>
	<div>
		<v-row>
			<v-col>

			</v-col>
			<v-col align="right">
				<v-btn text>
					<v-icon>
						mdi-plus
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<Table :data="{headers: [], items: []}" />
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import Table from '@/components/Table/Table'

	export default {
		components: {
			Table
		}
	}
</script>