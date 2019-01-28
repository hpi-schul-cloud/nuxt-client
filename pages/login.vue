<template>
	<section class="hero is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-8 is-offset-2">
					<h3 class="title has-text-grey">Login</h3>
					<p class="subtitle has-text-grey">Please login to proceed.</p>
					<div class="box">
						<div class="logo-round">
							<img src="@assets/cloud.svg" alt="Schul-Cloud" style="width: 78px">
						</div>
						<form @submit.prevent="onSubmit(email, password)">
							<div class="field">
								<div class="control">
									<input
										v-model="email"
										class="input is-large"
										type="email"
										placeholder="Your Email"
										autofocus
									>
								</div>
							</div>

							<div class="field">
								<div class="control">
									<input
										v-model="password"
										class="input is-large"
										type="password"
										placeholder="Your Password"
									>
								</div>
							</div>
							<div class="field">
								<label class="checkbox">
									<input type="checkbox">
									Remember me
								</label>
							</div>
							<button class="button is-block is-info is-large is-fullwidth">Login</button>
						</form>
						<div v-if="error" class="error">
							{{ error.message }}
							<a
								class="close"
								href="javascript://"
								@click.prevent="dismissError"
							>dismiss</a>
						</div>
					</div>
					<p class="has-text-grey">
						<a href="../">Sign Up</a> &nbsp;·&nbsp;
						<a href="../">Forgot Password</a> &nbsp;·&nbsp;
						<a href="../">Need Help?</a>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
	data() {
		return {
			email: undefined,
			password: undefined,
			error: undefined,
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
					strategy: 'local',
					username,
					password,
				});
				this.$toast.open({
					message: 'Login erfolgreich!',
					type: 'is-success',
				});
				this.$router.push('/');
			} catch (e) {
				this.$toast.open({
					message: 'Fehler beim Login. E-Mail/Passwort falsch?',
					type: 'is-danger',
				});
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
		...mapMutations('auth', {
			clearAuthenticateError: 'clearAuthenticateError',
		}),
		...mapActions('auth', ['authenticate']),
	},
};
</script>
