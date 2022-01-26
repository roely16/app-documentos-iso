<template>
	<div>
		<v-form ref="form" v-model="valid" @submit.prevent="doLogin">
			<v-row justify="center" class="text-center">
				<v-col cols="8">
					<v-img :src="require('@/assets/img/DCAI_ISO.png')"></v-img>
				</v-col>	
				<v-col cols="12">
					<h1>Bienvenido!</h1>
					<h3>Inicia sesión con tu cuenta</h3>
				</v-col>
				<v-col cols="8">
					<v-text-field
						outlined
						rounded
						hide-details
						placeholder="Usuario"
						prepend-inner-icon="mdi-account"
						:rules="[v => !!v]"
						v-model="user.user"
						type="text"
					></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-text-field
						outlined
						rounded
						placeholder="Contraseña"
						prepend-inner-icon="mdi-lock"
						:rules="[v => !!v]"
						v-model="user.password"
						:type="!showPassword ? 'password' : 'text'"
						hide-details
						:append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row v-if="errorMessage" justify="center">
				<v-col cols="8" dismissible>
					<v-alert border="top" type="error">
						{{ errorMessage }}
					</v-alert>
				</v-col>
			</v-row>
			<v-row justify="center" class="text-center">
				<v-col>
					<v-btn :disabled="loggin" :loading="loggin" type="submit" x-large color="primary" rounded>Ingresar</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script>

	import { mapActions, mapState } from "vuex"

	export default {
		data: () => {
			return{
				valid: true,
				user: {
					user: 'hechur',
					password: '123456'
				},
				showPassword: false
			}
		},
		methods: {
			...mapActions({
				login: 'login/doLogin'
			}),
			doLogin(){

				this.$refs.form.validate()

				if (this.valid) {
					
					this.login(this.user)

				}

			},
		},
		computed: {
			...mapState({
				loggin: state => state.login.loggin,
				errorMessage: state => state.login.errorMessage
			})
		}
	}
</script>