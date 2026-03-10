<template>
	<VForm ref="userForm" @submit.prevent.stop="onSubmit">
		<VTextField
			v-model="userData.firstName"
			:label="t('common.labels.firstName')"
			:hint="t('common.placeholder.firstName')"
			required
			:rules="[isRequired()]"
			validate-on="blur"
			data-testid="input_create-user_firstname"
		/>
		<VTextField
			v-model="userData.lastName"
			:label="t('common.labels.lastName')"
			:hint="t('common.placeholder.lastName')"
			required
			:rules="[isRequired()]"
			validate-on="blur"
			data-testid="input_create-user_lastname"
		/>
		<VTextField
			v-model="userData.email"
			:label="t('common.labels.email')"
			:hint="t('common.placeholder.email')"
			required
			:rules="[isRequired(), isValidEmail()]"
			validate-on="blur"
			data-testid="input_create-user_email"
		/>
		<slot name="inputs" />
		<slot name="errors" />
		<VBtn color="primary" variant="flat" type="submit" class="w-100 mt-6" data-testid="button_create-user_submit">
			{{ t("common.actions.add") }}
		</VBtn>
		<VBtn class="w-100 mt-6" variant="text" data-testid="button_create-user_abort" @click.prevent="router.go(-1)">
			{{ t("common.actions.back") }}
		</VBtn>
	</VForm>
</template>

<script setup lang="ts">
import { UserCreatingData } from "@data-users";
import { isRequired, isValidEmail } from "@util-validators";
import { reactive, unref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const emit = defineEmits<{
	(e: "create-user", payload: UserCreatingData): void;
}>();

const { t } = useI18n();
const router = useRouter();

const userForm = useTemplateRef("userForm");

const userData = reactive({
	firstName: "",
	lastName: "",
	email: "",
});

const onSubmit = async () => {
	if (!userForm.value) return;

	const isValid = (await userForm.value.validate()).valid;

	if (isValid) {
		emit("create-user", unref(userData as UserCreatingData));
	}
};
</script>
