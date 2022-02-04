<template>
	<div>
		<v-row align="center">
			<v-col cols="6">
				<Breadcrum />
			</v-col>
			<v-col cols="6" class="text-right" align="right">
				<v-btn color="white" elevation="0" small fab>
					<v-icon light>mdi-magnify</v-icon>
				</v-btn>
				<v-btn color="white" elevation="0" class="ml-4 mr-4" small fab>
					<v-icon light>mdi-bell</v-icon>
				</v-btn>	
				<Account />			
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import Account from '@/components/Home/Account'
	import Breadcrum from '@/components/Home/Breadcrum'

	export default {
		components: {
			Account,
			Breadcrum
		},
		data: () => ({
			
		}),
	}
</script>