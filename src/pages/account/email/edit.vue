<template>
	<section>
		<h1 class="mb--md h3">E-Mail-Adresse ändern</h1>
		<strong>Deine aktuelle E-mail-Adresse lautet:</strong>
		<p>{{ this.$user.email }}</p>
		<form-edit-user-data
			submit-button="Email-Adresse ändern"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="userData.email"
					type="email"
					:label="$t('common.labels.email')"
					:placeholder="$t('common.placeholder.email.update')"
					class="mt--md"
					data-testid=""
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="userData.repeatEmail"
					type="email"
					:label="$t('common.labels.repeat.email')"
					:placeholder="$t('common.placeholder.repeat.email')"
					class="mt--md"
					data-testid=""
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="userData.password"
					type="password"
					required="true"
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.confirmation')"
					class="mt--md"
					data-testid=""
					autocomplete="new-password"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
			</template>
		</form-edit-user-data>
	</section>
</template>

<script>
import FormEditUserData from "@components/organisms/FormEditUserData";
export default {
	components: {
		FormEditUserData,
	},
	meta: {
		userNotExternallyManaged: true,
		requiredPermissions: ["PASSWORD_EDIT"],
	},
	data() {
		return {
			userData: {
				email: "",
				repeatEmail: "",
				password: "",
			},
		};
	},
	methods: {
		error() {
			this.$toast.error("Leider ist etwas schief gegangen");
		},
		success() {
			this.$router.push({
				path: `/account/`,
			});
		},

		async submitHandler() {
			try {
				await this.$store.dispatch("activation/emailReset", {
					email: this.userData.email,
					emailReset: this.userData.emailReset,
					password: this.userData.password,
				});
				this.success();
			} catch (e) {
				console.log(e);
				this.error();
			}
		},
	},
	layout: "loggedout",
};
</script>
<style lang="scss" scoped>
@import "@styles";

section {
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
