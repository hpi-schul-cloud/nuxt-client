<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			data-testid="ldapDataUsersUserPath"
			:model-value="modelValue.userPath"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.title')"
			:placeholder="$t('pages.administration.ldap.users.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="v$.modelValue.userPath"
			:validation-messages="userPathValidationMessage"
			datatest-id="ldapDataUsersUserPath"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, userPath: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiFileTreeOutline" />
			</template>
		</base-input>
		<p class="path-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataUsersFirstName"
			:model-value="modelValue.firstName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.firstname')"
			:validation-model="v$.modelValue.firstName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFirstName"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, firstName: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountCircleOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersFamilyName"
			:model-value="modelValue.familyName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.lastname')"
			:validation-model="v$.modelValue.familyName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFamilyName"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, familyName: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountCircleOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersEmail"
			:model-value="modelValue.email"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.email')"
			:validation-model="v$.modelValue.email"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersEmail"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, email: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiEmailOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersUid"
			:model-value="modelValue.uid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
			:validation-model="v$.modelValue.uid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUid"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, uid: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiCardAccountDetailsOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersUuid"
			:model-value="modelValue.uuid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
			:validation-model="v$.modelValue.uuid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUuid"
			@update:model-value="
				emit('update:modelValue', { ...modelValue, uuid: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountBoxOutline" />
			</template>
		</base-input>
	</div>
</template>

<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { ldapPathRegexValidator } from "@/utils/ldapConstants";
import { watch, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
	mdiAccountBoxOutline,
	mdiAccountCircleOutline,
	mdiCardAccountDetailsOutline,
	mdiEmailOutline,
	mdiFileTreeOutline,
} from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type Props = {
	modelValue?: {
		userPath?: string;
		firstName?: string;
		familyName?: string;
		email?: string;
		uid?: string;
		uuid?: string;
	};
	validate?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({}),
});

const emit = defineEmits<{
	(e: "update:modelValue", value: Props["modelValue"]): void;
	(e: "update:errors", invalid: boolean, type: string): void;
}>();

const usersValidationMessage = [
	{ key: "required", message: t("common.validation.required") },
];

const userPathValidationMessage = [
	{
		key: "ldapPathRegexValidator",
		message: t("pages.administration.ldapEdit.validation.path"),
	},
	{ key: "required", message: t("common.validation.required") },
];

const rules = computed(() => ({
	modelValue: {
		userPath: { required, ldapPathRegexValidator },
		firstName: { required },
		familyName: { required },
		email: { required },
		uid: { required },
		uuid: { required },
	},
}));

const v$ = useVuelidate(rules, props);

watch(
	() => props.validate,
	() => {
		v$.value.$touch();
		emit("update:errors", v$.value.$invalid, "users");
	}
);
</script>

<style lang="scss" scoped>
.path-hint {
	margin-top: var(--space-xl);
	margin-bottom: var(--space-lg);
}

.users-container {
	margin-bottom: var(--space-xl-2);
}

.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
