<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="unchecked"
			type="switch"
			:label="$t('pages.administration.ldap.classes.sctivate.import')"
		>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.pfad.subtitle") }}
		</p>
		<base-input
			:vmodel="value.classPfad"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:placeholder="$t('pages.administration.ldap.classes.pfad.title')"
			:info="$t('pages.administration.ldap.classes.pfad.info')"
			@update:vmodel="$emit('input', { ...value, classPfad: $event })"
		/>
		<p class="title-class">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			:vmodel="value.nameAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			@update:vmodel="$emit('input', { ...value, nameAttribute: $event })"
		/>
		<base-input
			:vmodel="value.participantAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			@update:vmodel="
				$emit('input', { ...value, participantAttribute: $event })
			"
		/>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ["value"],
	data() {
		return {
			unchecked: false,
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
