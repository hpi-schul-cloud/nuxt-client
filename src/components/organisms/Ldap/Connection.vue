<template>
	<div class="connection-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h3>

		<base-input
			v-model="serverUrl"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:info="$t('pages.administration.ldap.connection.server.info')"
		>
		</base-input>
		<base-input
			v-model="basisPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.basis.pfad')"
			:placeholder="$t('pages.administration.ldap.connection.basis.pfad')"
			:info="$t('pages.administration.ldap.connection.basis.pfad.info')"
		/>
		<base-input
			v-model="searchUser"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:info="$t('pages.administration.ldap.connection.search.user.info')"
		/>
		<base-input
			v-model="searchUserPassword"
			type="password"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="
				$t('pages.administration.ldap.connection.search.user.password')
			"
		/>
	</div>
</template>
<script>
export default {
	data() {
		return {
			serverUrl: null,
			basisPfad: null,
			searchUser: null,
			searchUserPassword: null,
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
