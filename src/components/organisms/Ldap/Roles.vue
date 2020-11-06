<template>
	<div>
		<h1 class="mb--md h4">
			{{
				this.$t("pages.administration.ldapEdit.roles.headLines.roleAttributes")
			}}
		</h1>
		<base-input
			v-model="vmodel.student"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.student')"
			hint="Hint"
			info="Info"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:validation-model="$v.vmodel.student"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="vmodel.teacher"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.teacher')"
			hint="Hint"
			info="Info"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:validation-model="$v.vmodel.teacher"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="vmodel.admin"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.admin')"
			hint="Hint"
			info="Info"
			:placeholder="$t('pages.administration.ldapEdit.roles.placeholder.admin')"
			:validation-model="$v.vmodel.admin"
			:validation-messages="validationMessages"
		/>
		<base-input
			v-model="vmodel.noSchoolCloud"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.noSchoolCloud')"
			:hint="$t('pages.administration.ldapEdit.roles.labels.noSchoolCloud')"
			info="Info"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.noSchoolCloud')
			"
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
		ldapdata: {
			type: Object,
			default() {
				return {};
			},
			required,
		},
	},
	data() {
		return {
			sectionHeader: this.$t(
				"pages.administration.ldapEdit.roles.headLines.roleAttributes"
			),
			vmodel: {},
			validationMessages: [{ key: "required", message: "not be blank" }],
		};
	},
	validations: {
		vmodel: {
			student: { required },
			teacher: { required },
			admin: { required },
			noSchoolCloud: { required },
		},
	},
	created() {
		this.vmodel = this.ldapdata;
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
</style>
