<template>
	<DefaultWireframe :headline="pageTitle" :breadcrumbs="breadcrumbs" max-width="short">
		<CourseGroupForm
			v-if="course"
			:student-options="studentOptions"
			:loading="isMutating"
			@submit="onSubmit"
			@cancel="goToGroupsTab"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CourseGroupForm from "@/components/course-rooms/groups/CourseGroupForm.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { CourseGroupCourse, CourseGroupPayload, useCourseGroups } from "@data-course-group";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
const router = useRouter();
const { fetchCourse, createGroup, isMutating } = useCourseGroups();

// Users may leave the page while a request is running; do not navigate them back afterwards
let isLeft = false;
onBeforeUnmount(() => {
	isLeft = true;
});

const course = ref<CourseGroupCourse>();

const pageTitle = computed(() => t("pages.courseRoomDetails.groups.create.title"));
useTitle(computed(() => buildPageTitle(pageTitle.value, course.value?.name)));

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{ title: t("common.words.courses"), to: "/rooms/courses-overview" },
	{ title: course.value?.name ?? "", to: `/rooms/${props.courseId}?tab=groups` },
	{ title: pageTitle.value, disabled: true },
]);

const studentOptions = computed(() =>
	(course.value?.students ?? []).map((student) => ({ title: student.fullName, value: student.id }))
);

const goToGroupsTab = () =>
	router.push({ name: "room-details", params: { id: props.courseId }, query: { tab: "groups" } });

const onSubmit = async (payload: CourseGroupPayload) => {
	const group = await createGroup(props.courseId, payload);
	if (group && !isLeft) {
		await goToGroupsTab();
	}
};

onMounted(async () => {
	course.value = await fetchCourse(props.courseId);
});
</script>
