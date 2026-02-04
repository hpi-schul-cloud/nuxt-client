<template>
	<div class="mb-16">
		<h2 class="mb-8">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h2>
		<VTextField
			:model-value="modelValue.url"
			data-testid="ldapDataConnectionUrl"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:hint="$t('pages.administration.ldap.connection.server.info')"
			:prepend-inner-icon="mdiDnsOutline"
			validate-on="blur"
			:rules="rules.url"
			@update:model-value="$emit('update:modelValue', { ...modelValue, url: $event })"
		/>
		<VTextField
			:model-value="modelValue.basisPath"
			data-testid="ldapDataConnectionBasisPath"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.basis.path')"
			:placeholder="$t('pages.administration.ldap.connection.basis.path')"
			:hint="$t('pages.administration.ldap.connection.basis.path.info')"
			:prepend-inner-icon="mdiFileTreeOutline"
			validate-on="blur"
			:rules="rules.basisPath"
			@update:model-value="$emit('update:modelValue', { ...modelValue, basisPath: $event })"
		/>
		<VTextField
			:model-value="modelValue.searchUser"
			data-testid="ldapDataConnectionSearchUser"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:hint="$t('pages.administration.ldap.connection.search.user.info')"
			:prepend-inner-icon="mdiAccountCircleOutline"
			validate-on="blur"
			:rules="rules.searchUser"
			@update:model-value="$emit('update:modelValue', { ...modelValue, searchUser: $event })"
		/>
		<PasswordField
			:model-value="modelValue.searchUserPassword"
			data-testid="ldapDataConnectionSearchUserPassword"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="$t('pages.administration.ldap.connection.search.user.password')"
			:rules="rules.searchUserPassword"
			@update:model-value="
				$emit('update:modelValue', {
					...modelValue,
					searchUserPassword: $event,
				})
			"
		/>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { mdiAccountCircleOutline, mdiDnsOutline, mdiFileTreeOutline } from "@icons/material";
import { PasswordField } from "@ui-inputs";
import { isRequired, isValidLdapPath, isValidLdapUrl, isValidSecuredLdapUrl } from "@util-validators";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

type LdapConnectionModel = {
	url?: string;
	basisPath?: string;
	searchUser?: string;
	searchUserPassword?: string;
};

const props = defineProps<{
	modelValue: LdapConnectionModel;
	validate?: boolean;
}>();

defineEmits<{
	(e: "update:modelValue", value: LdapConnectionModel): void;
	(e: "update:errors", value: boolean, section: string): void;
}>();

const { t } = useI18n();

const insecureLDAPURLAllowed = computed(() => useEnvConfig().value?.FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED);
const rules = computed(() => ({
	url: [
		isRequired(t("common.validation.required")),
		insecureLDAPURLAllowed.value
			? isValidLdapUrl(t("pages.administration.ldapEdit.validation.url"))
			: isValidSecuredLdapUrl(t("pages.administration.ldapEdit.validation.url")),
	],
	basisPath: [
		isRequired(t("common.validation.required")),
		isValidLdapPath(t("pages.administration.ldapEdit.validation.path")),
	],
	searchUser: [
		isRequired(t("common.validation.required")),
		isValidLdapPath(t("pages.administration.ldapEdit.validation.path")),
	],
	searchUserPassword: [isRequired(t("common.validation.required"))],
}));

watch(
	() => props.validate,
	(newVal) => {
		if (newVal) {
			// TODO: figure out what it does and refactor to work with Vuetify validation
			// emit("update:errors", this.v$.$invalid, "connection");
		}
	},
	{ immediate: true }
);
</script>
