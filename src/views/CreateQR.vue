<template>
	<div>
		<v-row>
			<v-col>
				<data-card>
					<template #action>
						<v-btn @click="obtenerFirmas(true)" text>
							<v-icon>
								mdi-plus
							</v-icon>
						</v-btn>
					</template>
				</data-card>
			</v-col>
		</v-row>

		<Modal :width="width">

			<template #content>
				<Form />
			</template>

		</Modal>
	</div>
</template>

<script>

	import { mapActions } from 'vuex'

	import DataCard from '@/components/Home/DataCard'
	import Modal from '@/components/Modal'
	import Form from '@/components/CreateQR/Form'

	export default {
		components: {
			'data-card': DataCard,
			Modal,
			Form
		},
		data(){
			return{
				width: '1000'
			}
		},
		methods: {

			...mapActions({
				obtenerFirmas: 'create_qr/obtenerFirmas'
			})

		}
	}
</script>