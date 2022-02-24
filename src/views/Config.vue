<template>
	<div>
		<DataCard :show_search="false">
			<template #table>
				<v-row class="pl-4 pt-4 pr-4 pb-4">
					<v-col cols="3">
						<Menu />
					</v-col>	
					<v-divider vertical></v-divider>				
					<v-col>
						<Permisos />
					</v-col>
				</v-row>
			</template>
		</DataCard>
	</div>
</template>

<script>

	import DataCard from '@/components/Home/DataCard'
	import Menu from '@/components/Config/Menu'
	import Permisos from '@/components/Config/Permisos'

	export default {
		components: {
			DataCard,
			Menu,
			Permisos
		}
	}
</script>