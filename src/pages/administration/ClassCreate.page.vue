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
import ClassForm, { ClassFormData, SchoolYearOption, TeacherOption } from "@/components/administration/ClassForm.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoleName } from "@api-server";
import { useSchoolStoreRefs } from "@data-app";
import { useGroupClasses } from "@data-group";
import { useUsersStore } from "@data-users";
import { DefaultWireframe } from "@ui-layout";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const { createClass, isMutating } = useGroupClasses();
const usersStore = useUsersStore();
usersStore.init(RoleName.TEACHER);

const { schoolDetails } = useSchoolStoreRefs();

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

const schoolYearOptions = computed<SchoolYearOption[]>(() => {
	const years = schoolDetails.value?.years?.schoolYears ?? [];
	return years.map((y) => ({
		title: y.name,
		value: (y as any)._id || y.id,
	}));
});

const teacherOptions = computed<TeacherOption[]>(() => {
	return usersStore.userList.map((u) => ({
		title: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
		value: (u as any)._id || (u as any).id,
	}));
});

const initialFormData = ref<Partial<ClassFormData>>({
	year: (schoolDetails.value?.years?.activeYear as any)?._id || schoolDetails.value?.years?.activeYear?.id || "",
	teacherIds: [],
	isCustom: false,
	gradeLevel: undefined,
	classSuffix: "",
	customName: "",
	keepYear: true,
});

onMounted(async () => {
	await usersStore.fetchUsers({ $limit: 200, $skip: 0, $sort: { lastName: 1 } });
	const activeYearId = (schoolDetails.value?.years?.activeYear as any)?._id || schoolDetails.value?.years?.activeYear?.id;
	if (activeYearId) {
		initialFormData.value = {
			...initialFormData.value,
			year: activeYearId,
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
