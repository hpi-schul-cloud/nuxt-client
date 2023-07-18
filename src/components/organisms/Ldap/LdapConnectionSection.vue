<template>
	<div class="connection-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h3>

		<base-input
			data-testid="ldapDataConnectionUrl"
			:vmodel="value.url"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:info="$t('pages.administration.ldap.connection.server.info')"
			:validation-model="$v.value.url"
			:validation-messages="urlValidationMessages"
			@update:vmodel="$emit('input', { ...value, url: $event })"
		>
			<template #icon>
				<v-icon :color="fillColor">$mdiDnsOutline</v-icon>
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionBasisPath"
			:vmodel="value.basisPath"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.basis.path')"
			:placeholder="$t('pages.administration.ldap.connection.basis.path')"
			:info="$t('pages.administration.ldap.connection.basis.path.info')"
			:validation-model="$v.value.basisPath"
			:validation-messages="pathSearchValidationMessages"
			@update:vmodel="$emit('input', { ...value, basisPath: $event })"
		>
			<template #icon>
				<v-icon :color="fillColor">$mdiFileTreeOutline</v-icon>
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionSearchUser"
			:vmodel="value.searchUser"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:info="$t('pages.administration.ldap.connection.search.user.info')"
			:validation-model="$v.value.searchUser"
			:validation-messages="pathSearchValidationMessages"
			@update:vmodel="$emit('input', { ...value, searchUser: $event })"
		>
			<template #icon>
				<v-icon :color="fillColor">$mdiAccountCircleOutline</v-icon>
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionSearchUserPassword"
			:vmodel="value.searchUserPassword"
			type="password"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="
				$t('pages.administration.ldap.connection.search.user.password')
			"
			:validation-model="$v.value.searchUserPassword"
			:validation-messages="passwordValidationMessages"
			@update:vmodel="$emit('input', { ...value, searchUserPassword: $event })"
			><template #icon>
				<v-icon :color="fillColor">$mdiLockOutline</v-icon>
			</template>
		</base-input>
	</div>
</template>
<script>
import { envConfigModule } from "@/store";
import { required } from "vuelidate/lib/validators";
import {
	ldapPathRegexValidator,
	ldapURLRegexValidator,
	ldapSecuredURLRegexValidator,
} from "@/utils/ldapConstants";

export default {
	props: {
		value: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	data() {
		return {
			pathSearchValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{
					key: "ldapPathRegexValidator",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
			],
			urlValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{
					key: "ldapURLValidator",
					message: this.$t("pages.administration.ldapEdit.validation.url"),
				},
			],
			passwordValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
		};
	},
	computed: {
		fillColor() {
			return "var(--v-black-base)";
		},
		insecureLDAPURLAllowed: () =>
			envConfigModule?.getEnv.FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED,
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "connection");
		},
	},
	validations() {
		return {
			value: {
				url: {
					required,
					ldapURLValidator: this.insecureLDAPURLAllowed
						? ldapURLRegexValidator
						: ldapSecuredURLRegexValidator,
				},
				basisPath: { required, ldapPathRegexValidator },
				searchUser: { required, ldapPathRegexValidator },
				searchUserPassword: { required },
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.connection-container {
	margin-bottom: var(--space-xl-4);
}

.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
