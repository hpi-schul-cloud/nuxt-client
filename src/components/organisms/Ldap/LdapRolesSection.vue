<template>
	<div>
		<h1 class="mb--md h4">
			{{ $t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h1>
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
				@update:model-value="onGroupOptionChange"
			>
				<v-radio
					:label="
						$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
					"
					value="group"
					class="ml-n2"
				/>
				<v-radio
					:label="
						$t('pages.administration.ldapEdit.roles.labels.radio.userAttribute')
					"
					value="user_attribute"
				/>
			</v-radio-group>
			<p class="text-sm" style="margin-top: var(--space-xs)">
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
			@update:model-value="onInputChange('member', $event)"
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
			@update:model-value="onInputChange('student', $event)"
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
			@update:model-value="onInputChange('teacher', $event)"
		>
			<template #icon>
				<v-icon class="custom-icon">$teacher</v-icon>
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
			@update:model-value="onInputChange('admin', $event)"
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
			@update:model-value="onInputChange('user', $event)"
		>
			<template #icon>
				<v-icon :icon="mdiAccountOffOutline" />
			</template>
		</base-input>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ldapPathRegexValidator } from "@/utils/ldapConstants";
import {
	mdiAccountOffOutline,
	mdiAccountOutline,
	mdiAccountSchoolOutline,
	mdiShieldAccountVariantOutline,
} from "@icons/material";
import { useI18n } from "vue-i18n";

type Props = {
	modelValue?: Record<string, string>;
	validate?: boolean;
};

const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({}),
});

const emit = defineEmits([
	"update:modelValue",
	"update:errors",
	"update:inputs",
]);

const groupOption = computed(() => props.modelValue.groupOption || "undefined");

const memberValidationMessages = [
	{ key: "required", message: t("common.validation.required") },
];
const rolesValidationMessages = [
	{
		key: "ldapPathRegexValidator",
		message: t("pages.administration.ldapEdit.validation.path"),
	},
];

const rules = computed(() => {
	if (groupOption.value === "group") {
		return {
			modelValue: {
				member: { required },
				student: { ldapPathRegexValidator },
				teacher: { ldapPathRegexValidator },
				admin: { ldapPathRegexValidator },
			},
		};
	}
	return { modelValue: {} };
});

const v$ = useVuelidate(rules, props);

const onInputChange = (field: string, value: Props["modelValue"]) => {
	emit("update:modelValue", { ...props.modelValue, [field]: value });
};

const onGroupOptionChange = (value: string | null) => {
	emit("update:modelValue", { ...props.modelValue, groupOption: value });
};

watch(
	() => props.validate,
	() => {
		v$.value.$touch();
		emit("update:errors", v$.value.$invalid, "roles");
	}
);

watch(groupOption, () => {
	emit("update:errors", v$.value.$invalid, "roles");
});
</script>

<style lang="scss" scoped>
.section-sub-header {
	margin-bottom: var(--space-xs);
}

.description-section {
	margin-bottom: var(--space-xl);
}
</style>
