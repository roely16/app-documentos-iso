<template>
	<div>
		<v-container class="full-height">
			<v-row align="center" style="height: 100vh">
				<v-col cols="6">
					<welcome />
				</v-col>
				<v-col cols="6">
					<Form />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>

	import Form from '@/components/Login/Form'
	import Welcome from '@/components/Login/Welcome'

	export default {
		components: {
			Form,
			'welcome': Welcome
		}
	}
</script>