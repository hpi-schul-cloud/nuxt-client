<template>
	<div>
		<h2 class="my-10">
			{{ t("pages.administration.ldap.classes.title") }}
		</h2>
		<VSwitch v-model="checked" :label="t('pages.administration.ldap.classes.activate.import')" :true-icon="mdiCheck" />
		<p class="my-10">
			{{ t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<VTextField
			:model-value="classPathValue"
			data-testid="ldapDataClassesPath"
			:disabled="checked === false"
			class="mt-8"
			:placeholder="t('pages.administration.ldap.classes.path.title')"
			:label="t('pages.administration.ldap.classes.path.title')"
			:hint="t('pages.administration.ldap.classes.path.info')"
			:prepend-inner-icon="mdiFileTreeOutline"
			validate-on="blur"
			:rules="[rules.required, rules.isValidLdapPath]"
			datatest-id="ldapDataClassesclassPath"
			@update:model-value="emit('update:modelValue', { ...modelValue, classPath: $event })"
		/>
		<p class="my-10">
			{{ t("pages.administration.ldap.classes.hint") }}
		</p>
		<VTextField
			:model-value="modelValue.nameAttribute"
			data-testid="ldapDataClassesNameAttribute"
			:disabled="checked === false"
			class="mt-8"
			:label="t('pages.administration.ldap.classes.notice.title')"
			:prepend-inner-icon="mdiAccountEye"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataClassesNameAttribute"
			@update:model-value="emit('update:modelValue', { ...modelValue, nameAttribute: $event })"
		/>
		<VTextField
			:model-value="modelValue.participantAttribute"
			data-testid="ldapDataClassesNameparticipantAttribute"
			:disabled="checked === false"
			class="mt-8"
			:label="t('pages.administration.ldap.classes.participant.title')"
			:prepend-inner-icon="mdiAccountGroupOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:model-value="
				emit('update:modelValue', {
					...modelValue,
					participantAttribute: $event,
				})
			"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiAccountEye, mdiAccountGroupOutline, mdiCheck, mdiFileTreeOutline } from "@icons/material";
import { isRequired, isValidLdapPath } from "@util-validators";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type LdapClassesModel = {
	classPath?: string;
	nameAttribute?: string;
	participantAttribute?: string;
};

const props = defineProps<{
	modelValue: LdapClassesModel;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: LdapClassesModel): void;
	(e: "update:inputs"): void;
}>();

const { t } = useI18n();

onBeforeMount(() => {
	if (props.modelValue.classPath) checked.value = true;
});

const checked = ref(false);
const classPathValue = computed(() => (checked.value ? props.modelValue.classPath : ""));
const classPathChanged = computed(() => props.modelValue.classPath);

const rules = computed(() => ({
	required: isRequired(t("common.validation.required")),
	isValidLdapPath: isValidLdapPath(t("pages.administration.ldapEdit.validation.path")),
}));

watch(checked, () => {
	if (checked.value === false) {
		emit("update:inputs");
	}
});

watch(classPathChanged, () => {
	checked.value = !!props.modelValue.classPath;
});
</script>
