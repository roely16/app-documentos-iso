<template>
	<div>
		<v-list>
			<v-list-item-group
				v-model="selectedItem"
				color="primary"
			>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
				>
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-text="item.text"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				selectedItem: 0,
				items: [
					{ text: 'Permisos', icon: 'mdi-account-lock' },
					// { text: 'Audience', icon: 'mdi-account' },
					// { text: 'Conversions', icon: 'mdi-flag' },
				],
			}
		}	
	}
</script>