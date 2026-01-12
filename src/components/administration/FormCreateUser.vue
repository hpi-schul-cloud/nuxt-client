<template>
	<form>
		<v-text-field
			v-model="userData.firstName"
			:label="$t('common.labels.firstName')"
			:hint="$t('common.placeholder.firstName')"
			required
			:error-messages="getErrorMessages(v$.firstName)"
			data-testid="input_create-user_firstname"
			@blur="v$.firstName.$touch"
		/>
		<v-text-field
			v-model="userData.lastName"
			:label="$t('common.labels.lastName')"
			:hint="$t('common.placeholder.lastName')"
			required
			:error-messages="getErrorMessages(v$.lastName)"
			data-testid="input_create-user_lastname"
			@blur="v$.lastName.$touch"
		/>
		<v-text-field
			v-model="userData.email"
			:label="$t('common.labels.email')"
			:hint="$t('common.placeholder.email')"
			required
			:error-messages="getErrorMessages(v$.email)"
			data-testid="input_create-user_email"
			@blur="v$.email.$touch"
		/>
		<slot name="inputs" />

		<slot name="errors" />
		<v-btn
			color="primary"
			variant="flat"
			class="w-100 mt-6"
			data-testid="button_create-user_submit"
			@click.prevent="onSubmit"
		>
			{{ $t("common.actions.add") }}
		</v-btn>
		<v-btn class="w-100 mt-6" variant="text" data-testid="button_create-user_abort" @click.prevent="$router.go(-1)">
			{{ $t("common.actions.back") }}
		</v-btn>
	</form>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { reactive, unref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["create-user"]);
const { t } = useI18n();

const userData = reactive({
	firstName: "",
	lastName: "",
	email: "",
});

const validations = {
	firstName: { required },
	lastName: { required },
	email: { required, email },
};

const v$ = useVuelidate(validations, userData);

const getErrorMessages = (validationModel) => {
	const messages = validationModel.$errors.map((e) => t(`common.validation.${e.$validator}`));
	return messages;
};

const onSubmit = async () => {
	const isValid = await unref(v$).$validate();

	if (isValid) {
		emit("create-user", unref(userData));
	}
};
</script>
