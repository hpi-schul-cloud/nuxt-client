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
			@input="handleChange('user', $event)"
		/>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			ldapGroupOption: "ldap_group",
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
	methods: {
		handleChange(key, value) {
			this.$emit("inputChange", key, value);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.section-sub-header {
	margin-bottom: var(--space-xs);
}
</style>
