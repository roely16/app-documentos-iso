<template>
	<div>
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
	</div>
</template>

<script>
	
	import NoAccess from '@/components/Home/NoAccess'

	export default {
		components: {
			NoAccess
		}
	}
</script>