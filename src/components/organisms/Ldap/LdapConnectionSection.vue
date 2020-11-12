<template>
	<div class="connection-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.connection.title") }}
		</h3>

		<base-input
			:vmodel="value.url"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.server.url')"
			:placeholder="$t('pages.administration.ldap.connection.server.url')"
			:info="$t('pages.administration.ldap.connection.server.info')"
			@update:vmodel="$emit('input', { ...value, url: $event })"
		/>
		<base-input
			:vmodel="value.basisPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.basis.pfad')"
			:placeholder="$t('pages.administration.ldap.connection.basis.pfad')"
			:info="$t('pages.administration.ldap.connection.basis.pfad.info')"
			@update:vmodel="$emit('input', { ...value, basisPfad: $event })"
		/>
		<base-input
			:vmodel="value.searchUser"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user')"
			:placeholder="$t('pages.administration.ldap.connection.search.user')"
			:info="$t('pages.administration.ldap.connection.search.user.info')"
			@update:vmodel="$emit('input', { ...value, searchUser: $event })"
		/>
		<base-input
			:vmodel="value.searchUserPassword"
			type="password"
			class="mt--xl"
			:label="$t('pages.administration.ldap.connection.search.user.password')"
			:placeholder="
				$t('pages.administration.ldap.connection.search.user.password')
			"
			@update:vmodel="$emit('input', { ...value, searchUserPassword: $event })"
		/>
	</div>
</template>
<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ["value"],
	data() {
		return {};
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
