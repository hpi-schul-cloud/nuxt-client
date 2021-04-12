<template>
	<form
		autocomplete="off"
		novalidate
		v-on="$listeners"
		@submit.prevent="submitHandler"
	>
		<base-input
			v-model="userData.firstName"
			type="text"
			:label="$t('common.labels.firstName')"
			:placeholder="$t('common.placeholder.firstName')"
			class="mt--md"
			data-testid="input_create-user_firstname"
			:validation-messages="nameValidationMessages"
			:validation-model="$v.userData.firstName"
		>
		</base-input>
		<base-input
			v-model="userData.lastName"
			type="text"
			:label="$t('common.labels.lastName')"
			:placeholder="$t('common.placeholder.lastName')"
			class="mt--md"
			data-testid="input_create-user_lastname"
			:validation-messages="nameValidationMessages"
			:validation-model="$v.userData.lastName"
		>
		</base-input>
		<base-input
			v-model="userData.email"
			type="text"
			:label="$t('common.labels.email')"
			:placeholder="$t('common.placeholder.email')"
			class="mt--md"
			data-testid="input_create-user_email"
			:validation-messages="emailValidationMessages"
			:validation-model="$v.userData.email"
		>
		</base-input>
		<slot name="inputs" />

		<slot name="errors" />
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
import { email, required } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			dataParam: "zuoi",
			userData: {
				firstName: "",
				lastName: "",
				email: "",
			},
			nameValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			emailValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{ key: "email", message: this.$t("common.validation.email") },
			],
		};
	},
	methods: {
		submitHandler() {
			this.$v.$touch();
			this.$emit("trigger-validation", this.$v);
			if (!this.$v.$invalid) {
				this.$emit("create-user", this.userData);
			}
		},
	},
	validations: {
		userData: {
			firstName: { required },
			lastName: { required },
			email: { required, email },
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
