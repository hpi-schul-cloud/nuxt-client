<template>
	<div>
		<h1 class="mb--md h4">
			{{ this.$t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h1>
		<p class="description-section">
			{{
				this.$t(
					"pages.administration.ldapEdit.roles.headLines.sectionDescription"
				)
			}}
		</p>
		<div role="group" class="section-sub-header">
			<base-input
				:vmodel="groupOption"
				type="radio"
				:label="
					this.$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
				"
				name="group"
				style="margin-right: var(--space-sm)"
				value="group"
				@update:vmodel="$emit('input', { ...value, groupOption: $event })"
			>
			</base-input>
			<base-input
				:vmodel="groupOption"
				type="radio"
				:label="
					this.$t(
						'pages.administration.ldapEdit.roles.labels.radio.userAttribute'
					)
				"
				name="group"
				value="user_attribute"
				@update:vmodel="$emit('input', { ...value, groupOption: $event })"
			>
			</base-input>
			<p class="text-sm" style="margin-top: var(--space-xs)">
				{{
					this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.description"
					)
				}}
			</p>
		</div>
		<base-input
			:vmodel="value.member"
			:disabled="groupOption === 'group'"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.member')
			"
			style="margin-bottom: var(--space-xl)"
			:validation-model="$v.value.member"
			:validation-messages="memberValidationMessages"
			data-testid="ldapDataRolesMember"
			@update:vmodel="$emit('input', { ...value, member: $event })"
		>
			<template v-slot:icon>
				<base-icon source="material" icon="person" />
			</template>
		</base-input>
		<base-input
			:vmodel="value.student"
			type="text"
			v-bind="$attrs"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.student')"
			:validation-model="$v.value.student"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesStudent"
			@update:vmodel="$emit('input', { ...value, student: $event })"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="student" />
			</template>
		</base-input>
		<base-input
			:vmodel="value.teacher"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.teacher')"
			:validation-model="$v.value.teacher"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesTeacher"
			@update:vmodel="$emit('input', { ...value, teacher: $event })"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="teacher" />
			</template>
		</base-input>
		<base-input
			:vmodel="value.admin"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.admin')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.admin')"
			:validation-model="$v.value.admin"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesAdmin"
			@update:vmodel="$emit('input', { ...value, admin: $event })"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="admin_panel_settings" />
			</template>
		</base-input>
		<base-input
			:vmodel="value.user"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.user')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.user')"
			data-testid="ldapDataRolesUser"
			@update:vmodel="$emit('input', { ...value, user: $event })"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="person_ignore" />
			</template>
		</base-input>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapConstants";

export default {
	props: {
		value: {
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
			memberValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			rolesValidationMessages: [
				{
					key: "ldapPathValidationRegex",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
			],
		};
	},
	computed: {
		groupOption() {
			return this.value.groupOption || "undefined";
		},
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "roles");
		},
		groupOption: function () {
			this.$emit("update:errors", this.$v.$invalid, "roles");
		},
	},
	validations() {
		if (this.groupOption === "group") {
			return {
				value: {
					member: { required },
					student: { ldapPathValidationRegex },
					teacher: { ldapPathValidationRegex },
					admin: { ldapPathValidationRegex },
				},
			};
		}
		return {
			value: {},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.section-sub-header {
	margin-bottom: var(--space-xs);
}

.description-section {
	margin-bottom: var(--space-xl);
}
</style>
