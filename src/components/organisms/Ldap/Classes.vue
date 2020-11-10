<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="unchecked"
			type="switch"
			:label="$t('pages.administration.ldap.classes.sctivate.import')"
			@change="handleChange"
		>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.pfad.subtitle") }}
		</p>
		<base-input
			v-model="ldapData.classPfad"
			:disabled="unchecked === false"
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
			v-model="ldapData.nameAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			placeholder="description"
		>
		</base-input>
		<base-input
			v-model="ldapData.participantAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			placeholder="member"
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
			unchecked: false,
			classPfad: null,
			nameAttribute: null,
			participantAttribute: null,
			validationMessages: [{ key: "required", message: "should not be blank" }],
			ldapData: {},
		};
	},
	validations: {
		vmodel: {
			unchecked: { required },
			classPfad: { required },
			nameAttribute: { required },
			participantAttribute: { required },
		},
	},
	created() {
		this.ldapData = this.data;
	},
	methods: {
		handleChange: () => {
			this.unchecked = !this.unchecked;
		},
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
