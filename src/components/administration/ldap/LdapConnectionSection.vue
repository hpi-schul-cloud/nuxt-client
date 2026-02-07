<template>
	<div class="mb-16">
		<h2 class="mb-8">
			{{ t("pages.administration.ldap.connection.title") }}
		</h2>
		<VTextField
			:model-value="modelValue.url"
			data-testid="ldapDataConnectionUrl"
			class="mt-8"
			:label="t('pages.administration.ldap.connection.server.url')"
			:placeholder="t('pages.administration.ldap.connection.server.url')"
			:hint="t('pages.administration.ldap.connection.server.info')"
			:prepend-inner-icon="mdiDnsOutline"
			validate-on="blur"
			:rules="rules.url"
			@update:model-value="emit('update:modelValue', { ...modelValue, url: $event })"
		/>
		<VTextField
			:model-value="modelValue.basisPath"
			data-testid="ldapDataConnectionBasisPath"
			class="mt-8"
			:label="t('pages.administration.ldap.connection.basis.path')"
			:placeholder="t('pages.administration.ldap.connection.basis.path')"
			:hint="t('pages.administration.ldap.connection.basis.path.info')"
			:prepend-inner-icon="mdiFileTreeOutline"
			validate-on="blur"
			:rules="rules.basisPath"
			@update:model-value="emit('update:modelValue', { ...modelValue, basisPath: $event })"
		/>
		<VTextField
			:model-value="modelValue.searchUser"
			data-testid="ldapDataConnectionSearchUser"
			class="mt-8"
			:label="t('pages.administration.ldap.connection.search.user')"
			:placeholder="t('pages.administration.ldap.connection.search.user')"
			:hint="t('pages.administration.ldap.connection.search.user.info')"
			:prepend-inner-icon="mdiAccountCircleOutline"
			validate-on="blur"
			:rules="rules.searchUser"
			@update:model-value="emit('update:modelValue', { ...modelValue, searchUser: $event })"
		/>
		<PasswordField
			:model-value="modelValue.searchUserPassword"
			data-testid="ldapDataConnectionSearchUserPassword"
			class="mt-8"
			:label="t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="t('pages.administration.ldap.connection.search.user.password')"
			validate-on="blur"
			:rules="rules.searchUserPassword"
			@update:model-value="
				emit('update:modelValue', {
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
import { PasswordField } from "@ui-controls";
import { isRequired, isValidLdapPath, isValidLdapUrl, isValidSecuredLdapUrl } from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type LdapConnectionModel = {
	url?: string;
	basisPath?: string;
	searchUser?: string;
	searchUserPassword?: string;
};

defineProps<{
	modelValue: LdapConnectionModel;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: LdapConnectionModel): void;
}>();

const { t } = useI18n();

const insecureLDAPURLAllowed = computed(() => useEnvConfig().value?.FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED);
const rules = computed(() => ({
	url: [isRequired(), insecureLDAPURLAllowed.value ? isValidLdapUrl() : isValidSecuredLdapUrl()],
	basisPath: [isRequired(), isValidLdapPath()],
	searchUser: [isRequired(), isValidLdapPath()],
	searchUserPassword: [isRequired()],
}));
</script>
