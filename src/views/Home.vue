<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<Header />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<Menu />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>

	import Menu from '@/components/Home/Menu'
	import Header from '@/components/Home/Header'

	export default {
		components: {
			Menu,
			Header
		},
	}
</script>
