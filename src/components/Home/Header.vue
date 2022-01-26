<template>
	<div>
		<v-row class="mt-4">
			<v-col cols="6">
				<h1>Inicio</h1>
			</v-col>
			<v-col cols="6" class="text-right" align="right">
				<v-btn elevation="0" small fab>
					<v-icon light>mdi-magnify</v-icon>
				</v-btn>
				<v-btn elevation="0" class="ml-4 mr-4" small fab>
					<v-icon light>mdi-bell</v-icon>
				</v-btn>	
				<Account />			
			</v-col>
			<!-- <v-col cols="3" align="right">
				
			</v-col> -->
		</v-row>
	</div>
</template>

<script>

	import Account from '@/components/Home/Account'

	export default {
		components: {
			Account
		},
		data: () => ({
			
		}),
	}
</script>