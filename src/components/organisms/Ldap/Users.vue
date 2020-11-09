<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			v-model="userPfad"
			type="text"
			class="mt--xl"
			label="$t('pages.administration.ldap.users.pfad.title')"
			:placeholder="$t('pages.administration.ldap.users.pfad.title')"
			:info="$t('pages.administration.ldap.classes.pfad.info')"
		>
		</base-input>
		<p class="pfad-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			v-model="firstName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.firstname')"
			placeholder="givenName"
		>
		</base-input>
		<base-input
			v-model="familyName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.lastname')"
			placeholder="sn"
		>
		</base-input>
		<base-input
			v-model="email"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.email')"
			placeholder="mail"
		>
		</base-input>
		<base-input
			v-model="uid"
			type="text"
			class="mt--xl"
			placeholder="uid"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
		>
		</base-input>
		<base-input
			v-model="uuid"
			type="text"
			class="mt--xl"
			placeholder="uuid"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
		>
		</base-input>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userPfad: null,
			firstName: null,
			familyName: null,
			email: null,
			domainName: null,
			uid: null,
			uuid: null,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.pfad-hint {
	margin-top: var(--space-xl-3);
	margin-bottom: var(--space-xl-2);
}
.users-container {
	margin-bottom: var(--space-xl-4);
}
.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
