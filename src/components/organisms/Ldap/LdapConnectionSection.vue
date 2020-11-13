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
		/>
		<base-input
			data-testid="ldapDataConnectionBasisPfad"
			:vmodel="value.basisPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.basis.pfad')"
			:placeholder="$t('pages.administration.ldap.connection.basis.pfad')"
			:info="$t('pages.administration.ldap.connection.basis.pfad.info')"
			:validation-model="$v.value.basisPfad"
			:validation-messages="pathSearchValidationMessages"
			@update:vmodel="$emit('input', { ...value, basisPfad: $event })"
		/>
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
		/>
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
		/>
	</div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import {
	ldapPathValidationRegex,
	urlValidationRegex,
} from "@utils/ldapValidationRegex";

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
					key: "ldapPathValidationRegex",
					message: "Please match LDAP path format",
				},
			],
			urlValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{
					key: "urlValidationRegex",
					message: "Please match a valid URL format",
				},
			],
			passwordValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
		};
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
				url: { required, urlValidationRegex },
				basisPfad: { required, ldapPathValidationRegex },
				searchUser: { required, ldapPathValidationRegex },
				searchUserPassword: { required },
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.connection-container {
	margin-bottom: var(--space-xl-4);
}

.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
