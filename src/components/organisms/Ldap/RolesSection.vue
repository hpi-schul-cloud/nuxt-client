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
		<div role="group" aria-label="checkboxes" class="section-sub-header">
			<base-input
				v-model="ldapGroupOption"
				type="radio"
				:label="
					this.$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
				"
				name="group"
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
			<p class="text-sm">
				{{
					this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.description"
					)
				}}
			</p>
		</div>
		<base-input
			v-model="data.member"
			:disabled="ldapGroupOption === 'ldap_group'"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.member')
			"
		/>
		<base-input
			v-model="data.student"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.student')"
		/>
		<base-input
			v-model="data.teacher"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.teacher')"
		/>
		<base-input
			v-model="data.admin"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.admin')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.admin')"
		/>
		<base-input
			v-model="data.user"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.user')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.user')"
		/>
	</div>
</template>

<script>
export default {
	components: {},
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
		},
	},
	data() {
		return {
			ldapGroupOption: "ldap_group",
			ldapData: {},
		};
	},
	created() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.section-sub-header {
	margin-bottom: var(--space-xs);
}
</style>
