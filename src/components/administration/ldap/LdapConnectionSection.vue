<template>
	<div class="connection-container">
		<h2 class="mb-10">
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
		<VTextField
			:model-value="modelValue.searchUserPassword"
			data-testid="ldapDataConnectionSearchUserPassword"
			type="password"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="$t('pages.administration.ldap.connection.search.user.password')"
			:prepend-inner-icon="mdiLockOutline"
			validate-on="blur"
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

<script>
import { useEnvConfig } from "@data-env";
import { mdiAccountCircleOutline, mdiDnsOutline, mdiFileTreeOutline, mdiLockOutline } from "@icons/material";
import { isRequired, isValidLdapPath, isValidLdapUrl, isValidSecuredLdapUrl } from "@util-validators";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	emits: ["update:modelValue", "update:errors", "update:inputs"],
	setup() {
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
		}));

		return { rules };
	},
	data() {
		return {
			mdiAccountCircleOutline,
			mdiDnsOutline,
			mdiFileTreeOutline,
			mdiLockOutline,
		};
	},
});
</script>

<style scoped>
.connection-container {
	margin-bottom: 84px;
}
</style>
