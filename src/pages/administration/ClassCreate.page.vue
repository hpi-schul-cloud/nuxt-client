<template>
	<DefaultWireframe
		:headline="t('pages.administration.classes.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<ClassForm
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
import { DefaultWireframe } from "@ui-layout";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const { createClass, isMutating } = useGroupClasses();
const { schoolYearOptions, activeYearId, teacherOptions, loadTeachers } = useClassFormOptions();

const breadcrumbs = [
	{
		title: t("pages.administration.classes.index.title"),
		to: "/administration/groups/classes",
	},
	{
		title: t("pages.administration.classes.new.title"),
		disabled: true,
	},
];

document.title = buildPageTitle(t("pages.administration.classes.new.title"));

const initialFormData = ref<Partial<ClassFormData>>({
	year: activeYearId.value,
	teacherIds: [],
	isCustom: false,
	gradeLevel: undefined,
	classSuffix: "",
	customName: "",
	keepYear: true,
});

onMounted(async () => {
	await loadTeachers();
	if (activeYearId.value) {
		initialFormData.value = {
			...initialFormData.value,
			year: activeYearId.value,
		};
	}
});

const onSubmit = async (payload: {
	name: string;
	gradeLevel?: number;
	year?: string;
	teacherIds?: string[];
}) => {
	const { success } = await createClass(payload);
	if (success) {
		router.push("/administration/groups/classes");
	}
};
</script>
