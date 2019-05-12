<template>
	<section>
		<div>
			<h1 class="h3">Login</h1>
			<p>Please login to proceed.</p>

			<img
				src="@assets/cloud.svg"
				alt="Schul-Cloud"
				style="width: var(--text-lg); filter: invert(1)"
			/>

			<form @submit.prevent="onSubmit(email, password)">
				<base-input
					v-model="email"
					label="Your E-Mail"
					type="email"
					placeholder="user@schul-cloud.org"
					autofocus
				/>

				<base-input v-model="password" label="Your Password" type="password" />
				<base-input type="checkbox" label="Remember me" />

				<base-button class="button is-primary">
					Login
				</base-button>
			</form>

			<div v-if="error" class="error">
				{{ error.message }}
				<a class="close" href="javascript://" @click.prevent="dismissError"
					>dismiss</a
				>
			</div>

			<p class="has-text-grey">
				<!-- TODO -->
				<a href="../">Sign Up</a> &nbsp;·&nbsp;
				<a href="../">Forgot Password</a> &nbsp;·&nbsp;
				<a href="../">Need Help?</a>
			</p>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {
			email: "",
			password: "",
			error: "",
		};
	},
	methods: {
		dismissError() {
			this.error = undefined;
			this.clearAuthenticateError();
		},
		async onSubmit(username, password) {
			// let payload = { strategy: 'local', username, password };

			try {
				await this.authenticate({
					strategy: "local",
					username,
					password,
				});

				this.$toast.success("Login erfolgreich!");

				this.$router.push("/");
			} catch (e) {
				this.$toast.error("Fehler beim Login. E-Mail/Passwort falsch?");
			}

			// this.authenticate(payload)
			//   // Just use the returned error instead of mapping it from the store.
			//   .catch(error => {
			//     // Convert the error to a plain object and add a message.
			//     let type = error.className
			//     error = Object.assign({}, error)
			//     error.message = (type === 'not-authenticated')
			//       ? 'Incorrect email or password.'
			//       : 'An error prevented login.'
			//     console.log(error)
			//     this.error = error
			//   })
		},
		...mapMutations("auth", {
			clearAuthenticateError: "clearAuthenticateError",
		}),
		...mapActions("auth", ["authenticate"]),
	},
};
</script>
