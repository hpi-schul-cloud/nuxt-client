<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="unchecked"
			type="switch"
			:label="$t('pages.administration.ldap.classes.sctivate.import')"
		/>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.pfad.info") }}
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
		<p class="title-class">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			v-model="nameAttribute"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			placeholder="description"
		/>
		<base-input
			v-model="participantAttribute"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			placeholder="member"
		/>
	</div>
</template>
<script>
export default {
	data() {
		return {
			unchecked: null,
			classPfad: null,
			nameAttribute: null,
			participantAttribute: null,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.title-class {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-xl-2);
}
</style>
