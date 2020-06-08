<template>
	<section>
		<h1 class="mb--md h3">Passwort ändern</h1>
		<form-edit-user-data @onFormSubmit="create">
			<template v-slot:inputs>
				<base-input
					v-model="formData.password"
					type="password"
					required="true"
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.confirmation')"
					class="mt--md"
					data-testid="jjjjjjj"
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
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.confirmation')"
					class="mt--md"
					data-testid="jjjjjjj"
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
	data() {
		return {
			formData: {
				password: "",
				passwordNew: "",
			},
		};
	},
	computed: {
		actionType() {
			return "create";
		},
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
		async create() {
			try {
				await this.$store.dispatch("accounts/patch", [
					this.$user._id,
					{
						password: this.formData.password,
						passwordNew: this.formData.passWordNew,
					},
				]);
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
