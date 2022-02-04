<template>
	<div>
		<v-breadcrumbs class="ml-0 pl-0" large :items="items">
			<template v-slot:divider>
				<v-icon>mdi-chevron-right</v-icon>
			</template>
		</v-breadcrumbs>
	</div>
</template>

<script>
	export default {
		
		computed: {

			items: function(){

				return this.$route.meta.breadcrum

			}

		}
	}
</script>