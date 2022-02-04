<template>
	<div>
		<v-container fluid class="home">
			<v-row>
				<v-col>
					<Header />
				</v-col>
			</v-row>

			<v-row v-if="showMenu">
				<v-col>
					<Menu />
				</v-col>
			</v-row>

			<v-row class="mt-4">
				<v-col>
					<router-view></router-view>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<style scoped>
	.home{
		background-color: #f2f2f2; 
		padding-right: 30px; 
		padding-left: 30px; 
		min-height: 100vh
	}
</style>

<script>

	import Menu from '@/components/Home/Menu'
	import Header from '@/components/Home/Header'

	export default {
		components: {
			Menu,
			Header
		},
		computed: {

			showMenu: function(){

				if (this.$route.name === 'home') {
					
					return true

				}

				return false

			}

		}
	}
</script>
