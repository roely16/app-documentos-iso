<template>
	<div>
		<v-row class="mt-4">
			<v-col cols="3" v-for="(option, key) in menu" :key="key">
				<Option :data="option" :title="option.nombre" />
			</v-col>
		</v-row>

		<v-row v-if="menu.length <= 0">
			<v-col>
				<NoAccess>
					<template #message>
						<v-row>
							<v-col class="text-center">
								<span class="text-h4">
									Es necesario que solicite acceso al administrador.
								</span>
							</v-col>
						</v-row>
					</template>
				</NoAccess>
			</v-col>
		</v-row>
	</div>
</template>

<script>

	import Option from '@/components/Home/Option'
	import NoAccess from '@/components/Home/NoAccess'

	import { mapActions, mapState } from 'vuex';

	export default {
		components: {
			Option,
			NoAccess
		},
		data(){
			return{
				
			}
		},
		methods: {
			...mapActions({
				fetchMenu: 'home/fetchMenu'
			})
		},
		computed: {
			...mapState({
				menu: state => state.home.menu
			})
		},
		mounted(){

			this.fetchMenu()

		}	
	}
</script>