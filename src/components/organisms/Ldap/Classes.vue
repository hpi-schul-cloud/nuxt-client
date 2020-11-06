<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.classes.subtitle") }}
		</p>

		<base-input
			v-model="classPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.pfad.title')"
			:placeholder="$t('pages.administration.ldap.classes.pfad.title')"
			:info="$t('pages.administration.ldap.classes.pfad.info')"
		>
		</base-input>
		<base-input
			v-model="noticeName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:placeholder="$t('pages.administration.ldap.classes.notice.title')"
		/>
		<base-input
			v-model="domainName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.domain.title')"
			:placeholder="$t('pages.administration.ldap.classes.domain.title')"
		/>
		<base-input
			v-model="userName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.user.title')"
			:placeholder="$t('pages.administration.ldap.classes.user.title')"
		/>
	</div>
</template>
<script>
export default {
	data() {
		return {
			noticeName: null,
			classPfad: null,
			domainName: null,
			userName: null,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
