<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<slot name="inputs" :userData="userData" />
		<base-input
			v-model="userData.password"
			type="password"
			required="true"
			:label="$t('common.labels.password')"
			:placeholder="$t('common.placeholder.password.confirmation')"
			class="mt--md"
			data-testid="input_create-user_email"
		>
		</base-input>
		<div class="action">
			<base-button
				class="w-100 mt--lg"
				design="outline"
				text
				data-testid="button_create-user_abort"
				@click.prevent="$router.go(-1)"
			>
				{{ $t("common.actions.cancel") }}
			</base-button>
			<base-button
				type="submit"
				class="w-100 mt--lg"
				design="secondary"
				data-testid="button_create-user_submit"
			>
				Email ändern
			</base-button>
		</div>
	</form>
</template>

<script>
export default {
	props: {},

	data() {
		return {
			userData: {
				password: "",
			},
		};
	},
	computed: {
		actionType() {
			return "patch";
		},
	},
	methods: {
		submitHandler() {
			switch (this.actionType) {
				case "patch": {
					this.patch();
					break;
				}
			}
		},

		async patch() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				await this.$store.dispatch("user/patch", [
					this.$route.params.id,
					{
						password: this.userData.password,
					},
				]);
				this.$toast.success(
					this.$t("components.organisms.FormNews.success.patch")
				);
				this.$router.push({
					name: "",
					params: { id: this.$route.params.id },
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormNews.errors.patch")
				);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.action {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
