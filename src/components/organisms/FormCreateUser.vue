<template>
	<v-form
		autocomplete="off"
		novalidate
		v-on="$listeners"
		@submit.prevent="submitHandler"
	>
		<v-text-field
			v-model="userData.firstName"
			:label="$t('common.labels.firstName')"
			:hint="$t('common.placeholder.firstName')"
			data-testid="input_create-user_firstname"
			:error-messages="getErrors('firstName', $v.userData.firstName)"
			@blur="$v.userData.firstName.$touch"
		></v-text-field>
		<v-text-field
			v-model="userData.lastName"
			:label="$t('common.labels.lastName')"
			:hint="$t('common.placeholder.lastName')"
			data-testid="input_create-user_lastname"
			:error-messages="getErrors('lastName', $v.userData.lastName)"
			@blur="$v.userData.lastName.$touch"
		></v-text-field>
		<v-text-field
			v-model="userData.email"
			:label="$t('common.labels.email')"
			:hint="$t('common.placeholder.email')"
			data-testid="input_create-user_email"
			:error-messages="getErrors('email', $v.userData.email)"
			@blur="$v.userData.email.$touch"
		></v-text-field>
		<slot name="inputs" />

		<slot name="errors" />
		<v-btn
			color="primary"
			depressed
			class="w-100 mt--lg"
			data-testid="button_create-user_submit"
		>
			{{ $t("common.actions.add") }}
		</v-btn>
		<v-btn
			class="w-100 mt--lg"
			text
			color="secondary"
			data-testid="button_create-user_abort"
			@click.prevent="$router.go(-1)"
		>
			{{ $t("common.actions.back") }}
		</v-btn>
	</v-form>
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
		getErrors(name, model) {
			const errors = [];
			if (!model.$dirty) return errors;
			switch (name) {
				case "firstName":
					!model.required && errors.push(this.$t("common.validation.required"));
					break;
				case "lastName":
					!model.required && errors.push(this.$t("common.validation.required"));
					break;
				case "email":
					!model.email && errors.push(this.$t("common.validation.email"));
					!model.required && errors.push(this.$t("common.validation.required"));
					break;
				default:
					break;
			}
			return errors;
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
