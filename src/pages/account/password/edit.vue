<template>
	<section>
		<h1 class="mb--md h3">Passwort ändern</h1>
		<form-edit-user-data
			submit-button="Passwort ändern"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="formData.password"
					type="password"
					required="true"
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.current')"
					class="mt--md"
					data-testid="jjjjjjj"
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.passwordNew"
					type="password"
					required="true"
					:label="$t('common.labels.password.new')"
					:placeholder="$t('common.placeholder.password.new')"
					class="mt--md"
					data-testid="jjjjjjj"
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.password_verification"
					type="password"
					required="true"
					:label="$t('common.labels.password.new')"
					:placeholder="$t('common.placeholder.password.new.confirmation')"
					class="mt--md"
					data-testid="jjjjjjj"
					autocomplete="off"
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
	},
	data() {
		return {
			formData: {
				password: "",
				passwordNew: "",
				password_verification: "",
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
				await this.$store.dispatch("accounts/patch", [
					this.$user.accountId,
					{
						password: this.formData.passwordNew,
						password_verification: this.formData.password,
					},
				]);
				this.success();
			} catch (e) {
				console.log(e);
				this.error();
			}
		},
	},
	layout: "loggedoutNavbarLogo",
};
</script>
<style lang="scss" scoped>
@import "@styles";

section {
	max-width: calc(0.5 * var(--size-content-width-max));
	margin: 0 auto;
}
</style>
