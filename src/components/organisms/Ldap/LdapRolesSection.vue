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
				class="ldapRadio"
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
				class="ldapRadio"
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
			:vmodel="value.member"
			:disabled="ldapGroupOption === 'ldap_group'"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.member')
			"
			style="margin-bottom: var(--space-xl);"
			data-testid="ldapDataMember"
			class="ldapRolesMember"
			@update:vmodel="$emit('input', { ...value, member: $event })"
		/>
		<base-input
			:vmodel="value.student"
			type="text"
			v-bind="$attrs"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.student')"
			data-testid="ldapDataStudent"
			class="ldapDataStudent"
			@update:vmodel="$emit('input', { ...value, student: $event })"
		/>
		<base-input
			:vmodel="value.teacher"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.teacher')"
			data-testid="ldapDataTeacher"
			class="ldapDataTeacher"
			@update:vmodel="$emit('input', { ...value, teacher: $event })"
		/>
		<base-input
			:vmodel="value.admin"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.admin')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.admin')"
			data-testid="ldapDataAdmin"
			class="ldapDataAdmin"
			@update:vmodel="$emit('input', { ...value, admin: $event })"
		/>
		<base-input
			:vmodel="value.user"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.user')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.user')"
			data-testid="ldapDataUser"
			class="ldapDataUser"
			@update:vmodel="$emit('input', { ...value, user: $event })"
		/>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ["value"],
	data() {
		return {
			ldapGroupOption: "ldap_group",
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
