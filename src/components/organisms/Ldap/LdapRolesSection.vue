<template>
	<div>
		<h1 class="mb--md h4">
			{{ this.$t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h1>
		<p>
			{{
				this.$t(
					"pages.administration.ldapEdit.roles.headLines.sectionDescription"
				)
			}}
		</p>
		<div role="group" class="section-sub-header">
			<base-input
				v-model="ldapGroupOption"
				type="radio"
				:label="
					this.$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
				"
				name="group"
				style="margin-right: var(--space-sm);"
				value="ldap_group"
			/>
			<base-input
				v-model="ldapGroupOption"
				type="radio"
				:label="
					this.$t(
						'pages.administration.ldapEdit.roles.labels.radio.userAttribute'
					)
				"
				name="group"
				value="user_attribute"
			/>
			<p class="text-sm" style="margin-top: var(--space-xs);">
				{{
					this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.description"
					)
				}}
			</p>
		</div>
		<base-input
			v-model="ldapData.member"
			:disabled="ldapGroupOption === 'ldap_group'"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.member')
			"
			style="margin-bottom: var(--space-xl);"
			:validation-model="$v.data.member"
			:validation-messages="memberValidationMessages"
			@input="handleChange('member', $event)"
		/>
		<base-input
			v-model="ldapData.student"
			type="text"
			v-bind="$attrs"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.student')"
			:validation-model="$v.data.student"
			:validation-messages="rolesValidationMessages"
			@input="handleChange('student', $event)"
		/>
		<base-input
			ref="teacher"
			v-model="ldapData.teacher"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.teacher')"
			:validation-model="$v.data.teacher"
			:validation-messages="rolesValidationMessages"
			@input="handleChange('teacher', $event)"
		/>
		<base-input
			v-model="ldapData.admin"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.admin')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.admin')"
			:validation-model="$v.data.admin"
			:validation-messages="rolesValidationMessages"
			@input="handleChange('admin', $event)"
		/>
		<base-input
			v-model="ldapData.user"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.user')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.user')"
			:validation-model="$v.data.user"
			:validation-messages="rolesValidationMessages"
			@input="handleChange('user', $event)"
		/>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapValidationRegex";

export default {
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	data() {
		return {
			ldapGroupOption: "ldap_group",
			memberValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			rolesValidationMessages: [
				{
					key: "ldapPathValidationRegex",
					message: "Please match LDAP path format",
				},
			],
		};
	},
	computed: {
		ldapData() {
			return {
				member: this.data.member || "",
				student: this.data.student || "",
				teacher: this.data.teacher || "",
				admin: this.data.admin || "",
				user: this.data.user || "",
			};
		},
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "roles");
		},
	},
	methods: {
		handleChange(key, value) {
			this.$emit("inputChange", key, value);
		},
	},
	validations() {
		if (this.ldapGroupOption !== "ldap_group") {
			return {
				data: {
					member: { required },
					student: { ldapPathValidationRegex },
					teacher: { ldapPathValidationRegex },
					admin: { ldapPathValidationRegex },
					user: { ldapPathValidationRegex },
				},
			};
		}
		return {
			data: {},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.section-sub-header {
	margin-bottom: var(--space-xs);
}
</style>
