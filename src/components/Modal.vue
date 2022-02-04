<template>
	<div>
		<v-dialog
			v-model="show"
			:width="width"
			@click:outside="setShow(false)"
			:scrollable="scrollable"
			:fullscreen="fullscreen"
			@keydown.esc="setShow(false)"
		>
			<slot v-if="!loading" name="content"></slot>

			<v-card v-if="loading">
				<v-card-text>
					<Loading />
				</v-card-text>
			</v-card>

		</v-dialog>

	</div>
</template>

<script>

	import { mapState, mapMutations } from "vuex"

	import Loading from '@/components/Table/Loading'

	export default {
		props: {
			width: String,
			scrollable: Boolean,
			fullscreen: {
				type: Boolean,
				default: false
			}
		},
		components: {
			Loading
		},
		methods: {

			...mapMutations({
				setShow: 'modal/setShow'
			})

		},
		computed: {

			...mapState({
				show: state => state.modal.show,
				loading: state => state.modal.loading
			})

		}

	}
</script>