<template>
	<DefaultWireframe :headline="t('pages.administration.classes.edit')" :breadcrumbs="breadcrumbs" max-width="short">
		<div class="d-flex justify-end flex-wrap ga-2 mb-4">
			<VBtn
				variant="outlined"
				size="small"
				:to="{
					name: 'administration-classes-manage',
					params: { classId: classId },
				}"
				data-testid="link_manage_class_members"
				data-test-id="manage-class-btn"
			>
				<VIcon :icon="mdiAccountGroupOutline" class="me-1" />
				{{ t("pages.administration.classes.manage") }}
			</VBtn>
			<VBtn
				variant="outlined"
				size="small"
				:href="`/administration/classes/${classId}/createSuccessor`"
				data-testid="link_create_successor"
			>
				<VIcon :icon="mdiArrowUp" class="me-1" />
				{{ t("pages.administration.classes.createSuccessor") }}
			</VBtn>
		</div>

		<ClassForm
			:is-edit="true"
			:initial-data="initialFormData"
			:school-year-options="schoolYearOptions"
			:teacher-options="teacherOptions"
			:loading="isMutating"
			@submit="onSubmit"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import ClassForm, { ClassFormData } from "@/components/administration/ClassForm.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { mdiAccountGroupOutline, mdiArrowUp } from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
	classId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
const router = useRouter();

const { fetchClassById, updateClass, isMutating } = useGroupClasses();
const { schoolYearOptions, teacherOptions, loadTeachers } = useClassFormOptions();

const breadcrumbs = [
	{
		title: t("pages.administration.classes.index.title"),
		to: "/administration/groups/classes",
	},
	{
		title: t("pages.administration.classes.edit"),
		disabled: true,
	},
];

document.title = buildPageTitle(t("pages.administration.classes.edit"));

const initialFormData = ref<Partial<ClassFormData>>({});

onMounted(async () => {
	await Promise.all([
		loadTeachers(),
		(async () => {
			const cls = await fetchClassById(props.classId);
			if (cls) {
				const isCustom = !cls.gradeLevel;
				initialFormData.value = {
					year: cls.year ?? "",
					teacherIds: cls.teacherIds ?? [],
					isCustom,
					gradeLevel: cls.gradeLevel,
					classSuffix: cls.gradeLevel ? cls.name : "",
					customName: !cls.gradeLevel ? cls.name : "",
					keepYear: !!cls.year,
				};
			}
		})(),
	]);
});

const onSubmit = async (payload: { name: string; gradeLevel?: number; year?: string; teacherIds?: string[] }) => {
	const { success } = await updateClass(props.classId, payload);
	if (success) {
		router.push("/administration/groups/classes");
	}
};
</script>
