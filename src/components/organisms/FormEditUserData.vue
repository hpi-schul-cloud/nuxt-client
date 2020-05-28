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
				data-testid=""
				@click.prevent="$router.go(-1)"
			>
				{{ $t("common.actions.cancel") }}
			</base-button>
			<base-button
				type="submit"
				class="w-100 mt--lg"
				design="secondary"
				data-testid=""
			>
				Email ändern
			</base-button>
		</div>
	</form>
</template>

<script>
export default {
	props: {
		userId: {
			type: String,
			required: false,
			default: undefined,
		},
	},

	data() {
		return {
			userData: {
				email: "",
				password: "",
			},
		};
	},
	computed: {
		actionType() {
			return "create";
		},
	},
	methods: {
		submitHandler() {
			switch (this.actionType) {
				case "create": {
					this.create();
					break;
				}
			}
		},

		async create() {
			try {
				const x = await this.$store.dispatch("activation/emailReset", {
					email: this.userData.email,
					password: this.userData.password,
				});
				console.log(x);
			} catch (e) {
				console.log(e);
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
