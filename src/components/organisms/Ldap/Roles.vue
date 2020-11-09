<template>
	<div>
		<h1 class="mb--md h4">
			{{ titles.sectionHeader }}
		</h1>
		<p>
			{{ titles.sectionDescription }}
		</p>
		<div role="group" aria-label="checkboxes" class="section-sub-header">
			<base-input
				v-model="ldapGroupOption"
				type="radio"
				:label="titles.labels.radioLdapGroup"
				name="group"
				value="ldap_group"
			/>
			<base-input
				v-model="ldapGroupOption"
				type="radio"
				:label="titles.labels.radioUserAttribute"
				name="group"
				value="user_attribute"
			/>
			<p class="text-sm">
				{{ titles.labels.radioDescription }}
			</p>
		</div>
		<base-input
			v-model="ldapData.member"
			:disabled="ldapGroupOption === 'ldap_group'"
			type="text"
			:label="titles.labels.member"
			:placeholder="titles.placeholders.member"
			:validation-model="$v.vmodel.member"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="ldapData.student"
			type="text"
			:label="titles.labels.student"
			:placeholder="titles.placeholders.student"
			:validation-model="$v.vmodel.student"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="ldapData.teacher"
			type="text"
			:label="titles.labels.teacher"
			:placeholder="titles.placeholders.teacher"
			:validation-model="$v.vmodel.teacher"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="ldapData.admin"
			type="text"
			:label="titles.labels.admin"
			:placeholder="titles.placeholders.admin"
			:validation-model="$v.vmodel.admin"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="ldapData.noSchoolCloud"
			type="text"
			:label="titles.labels.noSchoolCloud"
			:placeholder="titles.placeholders.noSchoolCloud"
			:validation-model="$v.vmodel.noSchoolCloud"
			:validation-messages="validationMessages"
		/>
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
			titles: {
				sectionHeader: this.$t(
					"pages.administration.ldapEdit.roles.headLines.title"
				),
				sectionDescription: this.$t(
					"pages.administration.ldapEdit.roles.headLines.sectionDescription"
				),
				labels: {
					member: this.$t("pages.administration.ldapEdit.roles.labels.member"),
					student: this.$t(
						"pages.administration.ldapEdit.roles.labels.student"
					),
					teacher: this.$t(
						"pages.administration.ldapEdit.roles.labels.teacher"
					),
					admin: this.$t("pages.administration.ldapEdit.roles.labels.admin"),
					noSchoolCloud: this.$t(
						"pages.administration.ldapEdit.roles.labels.noSchoolCloud"
					),
					radioLdapGroup: this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.ldapGroup"
					),
					radioUserAttribute: this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.userAttribute"
					),
					radioDescription: this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.description"
					),
				},
				placeholders: {
					member: this.$t(
						"pages.administration.ldapEdit.roles.placeholder.member"
					),
					student: this.$t(
						"pages.administration.ldapEdit.roles.labels.student"
					),
					teacher: this.$t(
						"pages.administration.ldapEdit.roles.labels.teacher"
					),
					admin: this.$t("pages.administration.ldapEdit.roles.labels.admin"),
					noSchoolCloud: this.$t(
						"pages.administration.ldapEdit.roles.labels.noSchoolCloud"
					),
				},
			},
			ldapGroupOption: "ldap_group",
			ldapData: {},
			validationMessages: [{ key: "required", message: "not be blank" }],
		};
	},
	validations: {
		vmodel: {
			member: { required },
			student: { required },
			teacher: { required },
			admin: { required },
			noSchoolCloud: { required },
		},
	},
	created() {
		this.ldapData = this.data;
	},
	methods: {
		// changeHandler: function (e, model) {
		// 	this.$emit("inputvalue", e, model);
		// },
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.section-sub-header {
	margin-bottom: var(--space-xs);
}
</style>
