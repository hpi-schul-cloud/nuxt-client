<template>
	<div class="connection-container">
		<h2 class="title-class">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h2>

		<base-input
			data-testid="ldapDataConnectionUrl"
			:model-value="modelValue.url"
			type="text"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:info="$t('pages.administration.ldap.connection.server.info')"
			:validation-model="v$.modelValue.url"
			:validation-messages="urlValidationMessages"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, url: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiDnsOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionBasisPath"
			:model-value="modelValue.basisPath"
			type="text"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.basis.path')"
			:placeholder="$t('pages.administration.ldap.connection.basis.path')"
			:info="$t('pages.administration.ldap.connection.basis.path.info')"
			:validation-model="v$.modelValue.basisPath"
			:validation-messages="pathSearchValidationMessages"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, basisPath: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiFileTreeOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionSearchUser"
			:model-value="modelValue.searchUser"
			type="text"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:info="$t('pages.administration.ldap.connection.search.user.info')"
			:validation-model="v$.modelValue.searchUser"
			:validation-messages="pathSearchValidationMessages"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, searchUser: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountCircleOutline" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataConnectionSearchUserPassword"
			:model-value="modelValue.searchUserPassword"
			type="password"
			class="mt-8"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="
				$t('pages.administration.ldap.connection.search.user.password')
			"
			:validation-model="v$.modelValue.searchUserPassword"
			:validation-messages="passwordValidationMessages"
			@update:model-value="
				$emit('update:modelValue', {
					...modelValue,
					searchUserPassword: $event,
				})
			"
		>
			<template #icon>
				<v-icon :icon="mdiLockOutline" />
			</template>
		</base-input>
	</div>
</template>

<script>
import { required } from "@vuelidate/validators";
import {
	ldapPathRegexValidator,
	ldapURLRegexValidator,
	ldapSecuredURLRegexValidator,
} from "@/utils/ldapConstants";
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import {
	mdiAccountCircleOutline,
	mdiDnsOutline,
	mdiFileTreeOutline,
	mdiLockOutline,
} from "@icons/material";
import { useEnvConfig } from "@data-env";

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
		return { v$: useVuelidate() };
	},
	data() {
		return {
			mdiAccountCircleOutline,
			mdiDnsOutline,
			mdiFileTreeOutline,
			mdiLockOutline,
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
		insecureLDAPURLAllowed: () =>
			useEnvConfig().value?.FEATURE_ALLOW_INSECURE_LDAP_URL_ENABLED,
	},
	watch: {
		validate: function () {
			this.v$.$touch();
			this.$emit("update:errors", this.v$.$invalid, "connection");
		},
	},
	validations() {
		return {
			modelValue: {
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
});
</script>

<style lang="scss" scoped>
.connection-container {
	margin-bottom: 84px;
}

.title-class {
	margin-bottom: 40px;
}
</style>
