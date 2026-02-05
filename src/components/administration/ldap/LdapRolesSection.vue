<template>
	<div>
		<h2>
			{{ t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h2>
		<p class="mb-8">
			{{ t("pages.administration.ldapEdit.roles.headLines.sectionDescription") }}
		</p>
		<div role="group" class="mb-2">
			<VRadioGroup
				inline
				name="group"
				:model-value="groupOption"
				@update:model-value="emit('update:modelValue', { ...modelValue, groupOption: $event })"
			>
				<VRadio :label="t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')" value="group" />
				<VRadio :label="t('pages.administration.ldapEdit.roles.labels.radio.userAttribute')" value="user_attribute" />
			</VRadioGroup>
			<p class="text-sm" style="margin-top: 8px">
				{{ t("pages.administration.ldapEdit.roles.labels.radio.description") }}
			</p>
		</div>
		<VTextField
			:model-value="modelValue.member"
			:disabled="groupOption === 'group'"
			:label="t('pages.administration.ldapEdit.roles.labels.member')"
			:placeholder="t('pages.administration.ldapEdit.roles.placeholder.member')"
			:prepend-inner-icon="mdiAccountOutline"
			data-testid="ldapDataRolesMember"
			@update:model-value="emit('update:modelValue', { ...modelValue, member: $event })"
		/>
		<VTextField
			:model-value="modelValue.student"
			:label="t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="t('pages.administration.ldapEdit.roles.placeholder.student')"
			:hint="t('pages.administration.ldapEdit.roles.info.student')"
			:prepend-inner-icon="mdiAccountSchoolOutline"
			validate-on="blur"
			:rules="rules"
			data-testid="ldapDataRolesStudent"
			@update:model-value="emit('update:modelValue', { ...modelValue, student: $event })"
		/>
		<VTextField
			:model-value="modelValue.teacher"
			:label="t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="t('pages.administration.ldapEdit.roles.placeholder.teacher')"
			:hint="t('pages.administration.ldapEdit.roles.info.teacher')"
			:prepend-inner-icon="mdiHumanMaleBoard"
			validate-on="blur"
			:rules="rules"
			data-testid="ldapDataRolesTeacher"
			@update:model-value="emit('update:modelValue', { ...modelValue, teacher: $event })"
		/>
		<VTextField
			:model-value="modelValue.admin"
			:label="t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="t('pages.administration.ldapEdit.roles.placeholder.admin')"
			:hint="t('pages.administration.ldapEdit.roles.info.admin')"
			:prepend-inner-icon="mdiShieldAccountVariantOutline"
			validate-on="blur"
			:rules="rules"
			data-testid="ldapDataRolesAdmin"
			@update:model-value="emit('update:modelValue', { ...modelValue, admin: $event })"
		/>
		<VTextField
			:model-value="modelValue.user"
			:label="t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="t('pages.administration.ldapEdit.roles.placeholder.user')"
			:hint="t('pages.administration.ldapEdit.roles.info.user')"
			:prepend-inner-icon="mdiAccountOffOutline"
			data-testid="ldapDataRolesUser"
			@update:model-value="emit('update:modelValue', { ...modelValue, user: $event })"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	mdiAccountOffOutline,
	mdiAccountOutline,
	mdiAccountSchoolOutline,
	mdiHumanMaleBoard,
	mdiShieldAccountVariantOutline,
} from "@icons/material";
import { isValidLdapPath } from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

type LdapRolesModel = {
	groupOption?: string | null;
	member?: string;
	student?: string;
	teacher?: string;
	admin?: string;
	user?: string;
};

const props = defineProps<{
	modelValue: LdapRolesModel;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: LdapRolesModel): void;
}>();

const { t } = useI18n();

const groupOption = computed(() => props.modelValue.groupOption || "undefined");

const rules = computed(() => {
	if (groupOption.value === "group") {
		return [isValidLdapPath(t("pages.administration.ldapEdit.validation.path"))];
	} else {
		return [];
	}
});
</script>
