<template>
	<div class="connection-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h3>

		<base-input
			v-model="ldapData.serverUrl"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:info="$t('pages.administration.ldap.connection.server.info')"
			:validation-messages="validationMessages"
		>
		</base-input>
		<base-input
			v-model="ldapData.basisPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.basis.pfad')"
			:placeholder="$t('pages.administration.ldap.connection.basis.pfad')"
			:info="$t('pages.administration.ldap.connection.basis.pfad.info')"
			:validation-messages="validationMessages"
		>
		</base-input>
		<base-input
			v-model="ldapData.searchUser"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:info="$t('pages.administration.ldap.connection.search.user.info')"
			:validation-messages="validationMessages"
		>
		</base-input>
		<base-input
			v-model="ldapData.searchUserPassword"
			type="password"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="
				$t('pages.administration.ldap.connection.search.user.password')
			"
			:validation-messages="validationMessages"
		>
		</base-input>
	</div>
</template>
<script>
import BaseInput from "@components/base/BaseInput/BaseInput.vue";
import { required } from "vuelidate/lib/validators";
export default {
	components: {
		BaseInput,
	},
	props: {
		errors: {
			type: Object,
			default() {
				return {};
			},
		},
		data: {
			type: Object,
			default() {
				return {};
			},
			required,
		},
	},
	data() {
		return {
			serverUrl: null,
			basisPfad: null,
			searchUser: null,
			searchUserPassword: null,
			validationMessages: [{ key: "required", message: "should not be blank" }],
			ldapData: {},
		};
	},
	validations: {
		vmodel: {
			serverUrl: { required },
			basisPfad: { required },
			searchUser: { required },
			searchUserPassword: { required },
		},
	},
	created() {
		this.ldapData = this.data;
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
