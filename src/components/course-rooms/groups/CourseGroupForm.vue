<template>
	<VForm ref="formRef" validate-on="invalid-input" @submit.prevent="onSubmit">
		<VTextField
			v-model="name"
			v-input-attrs="{ 'data-testid': 'group-name-field' }"
			:label="t('pages.courseRoomDetails.groups.form.name.label')"
			:placeholder="t('pages.courseRoomDetails.groups.form.name.placeholder')"
			:rules="[isRequired(), isNonEmptyString()]"
			class="mb-4"
		/>
		<VAutocomplete
			v-model="memberIds"
			v-input-attrs="{ 'data-testid': 'group-member-field' }"
			:items="studentOptions"
			:label="t('pages.courseRoomDetails.groups.form.members.label')"
			:placeholder="t('pages.courseRoomDetails.groups.form.members.placeholder')"
			:no-data-text="t('common.nodata')"
			item-title="title"
			item-value="value"
			multiple
			chips
			closable-chips
			class="mb-4"
		/>
		<div class="d-flex flex-column-reverse flex-sm-row justify-end ga-3">
			<VBtn variant="outlined" class="px-6" data-testid="course-group-cancel" @click="emit('cancel')">
				{{ t("common.actions.cancel") }}
			</VBtn>
			<VBtn color="primary" type="submit" :loading="loading" class="px-8" data-testid="create-course-group">
				{{
					isEdit
						? t("pages.courseRoomDetails.groups.form.submit.save")
						: t("pages.courseRoomDetails.groups.form.submit.create")
				}}
			</VBtn>
		</div>
	</VForm>
</template>

<script setup lang="ts">
import { vInputAttrs } from "@/directives/inputAttrs.directive";
import { CourseGroupPayload } from "@data-course-group";
import { isNonEmptyString, isRequired } from "@util-validators";
import { PropType, ref, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VForm } from "vuetify/components";

export type CourseGroupStudentOption = { title: string; value: string };

const props = defineProps({
	initialName: {
		type: String,
		default: "",
	},
	initialMemberIds: {
		type: Array as PropType<string[]>,
		default: () => [],
	},
	studentOptions: {
		type: Array as PropType<CourseGroupStudentOption[]>,
		default: () => [],
	},
	isEdit: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "submit", payload: CourseGroupPayload): void;
	(e: "cancel"): void;
}>();

const { t } = useI18n();
const formRef = useTemplateRef<InstanceType<typeof VForm>>("formRef");

const name = ref("");
const memberIds = ref<string[]>([]);

watch(
	() => [props.initialName, props.initialMemberIds] as const,
	([initialName, initialMemberIds]) => {
		name.value = initialName;
		memberIds.value = [...initialMemberIds];
	},
	{ immediate: true }
);

const onSubmit = async () => {
	const result = await formRef.value?.validate();
	if (!result?.valid) return;

	emit("submit", { name: name.value.trim(), userIds: memberIds.value });
};
</script>
