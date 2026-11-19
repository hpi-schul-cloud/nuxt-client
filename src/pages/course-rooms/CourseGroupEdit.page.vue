<template>
	<DefaultWireframe :headline="pageTitle" :breadcrumbs="breadcrumbs" max-width="short">
		<CourseGroupForm
			v-if="course && group"
			:initial-name="group.name"
			:initial-member-ids="initialMemberIds"
			:student-options="studentOptions"
			:loading="isMutating"
			is-edit
			@submit="onSubmit"
			@cancel="goToDetails"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CourseGroupForm from "@/components/course-rooms/groups/CourseGroupForm.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { CourseGroup, CourseGroupCourse, CourseGroupPayload, useCourseGroups } from "@data-course-group";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
	groupId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
const router = useRouter();
const { fetchCourse, fetchGroup, updateGroup, isMutating } = useCourseGroups();

// Users may leave the page while a request is running; do not navigate them back afterwards
let isLeft = false;
onBeforeUnmount(() => {
	isLeft = true;
});

const course = ref<CourseGroupCourse>();
const group = ref<CourseGroup>();

const pageTitle = computed(() => t("pages.courseRoomDetails.groups.edit.title"));
useTitle(computed(() => buildPageTitle(pageTitle.value, course.value?.name)));

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{ title: t("common.words.courses"), to: "/rooms/courses-overview" },
	{ title: course.value?.name ?? "", to: `/rooms/${props.courseId}?tab=groups` },
	{ title: group.value?.name ?? "", to: `/rooms/${props.courseId}/groups/${props.groupId}` },
	{ title: pageTitle.value, disabled: true },
]);

// Members who left the course stay selectable, so saving does not remove them silently
const studentOptions = computed(() => {
	const options = new Map<string, string>();
	[...(course.value?.students ?? []), ...(group.value?.members ?? [])].forEach((user) =>
		options.set(user.id, user.fullName)
	);

	return [...options].map(([value, title]) => ({ title, value }));
});

const goToDetails = () =>
	router.push({ name: "course-room-group-details", params: { id: props.courseId, groupId: props.groupId } });

const onSubmit = async (payload: CourseGroupPayload) => {
	const success = await updateGroup(props.groupId, payload);
	if (success && !isLeft) {
		await goToDetails();
	}
};

// Stable array, so re-renders (e.g. while saving) do not reset the form
const initialMemberIds = computed(() => group.value?.members.map((member) => member.id) ?? []);

const load = async () => {
	const loadedGroup = await fetchGroup(props.groupId);
	if (isLeft) return;
	if (loadedGroup && loadedGroup.courseId !== props.courseId) {
		// The URL combines the group with another course: show it under its own course instead
		await router.replace({
			name: "course-room-group-edit",
			params: { id: loadedGroup.courseId, groupId: props.groupId },
		});
		return;
	}

	group.value = loadedGroup;
	course.value = loadedGroup ? await fetchCourse(props.courseId) : undefined;
};

watch(() => [props.courseId, props.groupId], load, { immediate: true });
</script>
