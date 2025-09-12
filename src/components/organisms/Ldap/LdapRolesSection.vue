<template>
	<div>
		<h2>
			{{ $t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h2>
		<p class="description-section">
			{{
				$t("pages.administration.ldapEdit.roles.headLines.sectionDescription")
			}}
		</p>
		<div role="group" class="section-sub-header">
			<v-radio-group
				inline
				name="group"
				:model-value="groupOption"
				@update:model-value="
					$emit('update:modelValue', { ...modelValue, groupOption: $event })
				"
			>
				<v-radio
					:label="
						$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
					"
					value="group"
				/>
				<v-radio
					:label="
						$t('pages.administration.ldapEdit.roles.labels.radio.userAttribute')
					"
					value="user_attribute"
				/>
			</v-radio-group>
			<p class="text-sm" style="margin-top: 8px">
				{{ $t("pages.administration.ldapEdit.roles.labels.radio.description") }}
			</p>
		</div>
		<base-input
			:model-value="modelValue.member"
			:disabled="groupOption === 'group'"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.member')
			"
			:validation-model="v$.modelValue.member"
			:validation-messages="memberValidationMessages"
			data-testid="ldapDataRolesMember"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, member: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountOutline" />
			</template>
		</base-input>
		<base-input
			:model-value="modelValue.student"
			type="text"
			v-bind="$attrs"
			:label="$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="$t('pages.administration.ldapEdit.roles.info.student')"
			:validation-model="v$.modelValue.student"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesStudent"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, student: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountSchoolOutline" />
			</template>
		</base-input>
		<base-input
			:model-value="modelValue.teacher"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="$t('pages.administration.ldapEdit.roles.info.teacher')"
			:validation-model="v$.modelValue.teacher"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesTeacher"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, teacher: $event })
			"
		>
			<template #icon>
				<v-icon>$teacher</v-icon>
			</template>
		</base-input>
		<base-input
			:model-value="modelValue.admin"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="$t('pages.administration.ldapEdit.roles.placeholder.admin')"
			:info="$t('pages.administration.ldapEdit.roles.info.admin')"
			:validation-model="v$.modelValue.admin"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesAdmin"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, admin: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiShieldAccountVariantOutline" />
			</template>
		</base-input>
		<base-input
			:model-value="modelValue.user"
			type="text"
			:label="$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="$t('pages.administration.ldapEdit.roles.placeholder.user')"
			:info="$t('pages.administration.ldapEdit.roles.info.user')"
			data-testid="ldapDataRolesUser"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, user: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountOffOutline" />
			</template>
		</base-input>
	</div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { ldapPathRegexValidator } from "@/utils/ldapConstants";
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import {
	mdiAccountOffOutline,
	mdiAccountOutline,
	mdiAccountSchoolOutline,
	mdiShieldAccountVariantOutline,
} from "@icons/material";

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	emits: ["update:modelValue", "update:errors", "update:inputs"],
	setup() {
		const v$ = useVuelidate();

		return { v$ };
	},
	data() {
		return {
			mdiAccountOffOutline,
			mdiAccountOutline,
			mdiAccountSchoolOutline,
			mdiShieldAccountVariantOutline,
			memberValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			rolesValidationMessages: [
				{
					key: "ldapPathRegexValidator",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
			],
		};
	},
	computed: {
		groupOption() {
			return this.modelValue.groupOption || "undefined";
		},
	},
	watch: {
		validate: function () {
			this.v$.$touch();
			this.$emit("update:errors", this.v$.$invalid, "roles");
		},
		groupOption: function () {
			this.$emit("update:errors", this.v$.$invalid, "roles");
		},
	},
	validations() {
		if (this.groupOption === "group") {
			return {
				modelValue: {
					member: { required },
					student: { ldapPathRegexValidator },
					teacher: { ldapPathRegexValidator },
					admin: { ldapPathRegexValidator },
				},
			};
		}
		return {
			modelValue: {},
		};
	},
});
</script>

<style lang="scss" scoped>
.section-sub-header {
	margin-bottom: 8px;
}

.description-section {
	margin-bottom: 32px;
}
</style>
