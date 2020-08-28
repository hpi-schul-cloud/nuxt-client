<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="userData.firstName"
			type="text"
			required="true"
			:label="$t('common.labels.firstName')"
			:placeholder="$t('common.placeholder.firstName')"
			class="mt--md"
			data-testid="input_create-user_firstname"
		>
		</base-input>
		<base-input
			v-model="userData.lastName"
			type="text"
			required="true"
			:label="$t('common.labels.lastName')"
			:placeholder="$t('common.placeholder.lastName')"
			class="mt--md"
			data-testid="input_create-user_lastname"
		>
		</base-input>
		<base-input
			v-model="userData.email"
			type="text"
			required="true"
			:label="$t('common.labels.email')"
			:placeholder="$t('common.placeholder.email')"
			class="mt--md"
			data-testid="input_create-user_email"
		>
		</base-input>
		<slot name="inputs" />

		<base-button
			type="submit"
			class="w-100 mt--lg"
			design="secondary"
			data-testid="button_create-user_submit"
		>
			{{ $t("common.actions.add") }}
		</base-button>
		<base-button
			class="w-100 mt--lg"
			design="text"
			text
			data-testid="button_create-user_abort"
			@click.prevent="$router.go(-1)"
		>
			{{ $t("common.actions.back") }}
		</base-button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			userData: {
				firstName: "",
				lastName: "",
				email: "",
			},
		};
	},
	methods: {
		submitHandler() {
			this.$emit("create-user", this.userData);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
