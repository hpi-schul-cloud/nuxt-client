<template>
	<DefaultWireframe :headline="group?.name" :breadcrumbs="breadcrumbs" max-width="short">
		<template v-if="course && group">
			<section class="mb-6" data-testid="course-group-members">
				<h2 class="text-h4 mb-2">{{ t("pages.courseRoomDetails.groups.details.members") }}</h2>
				<div class="d-flex flex-wrap ga-1">
					<VChip v-for="member in group.members" :key="member.id" size="small">{{ member.fullName }}</VChip>
				</div>
			</section>

			<section class="mb-6" data-testid="course-group-teachers">
				<h2 class="text-h4 mb-2">{{ t("pages.courseRoomDetails.groups.details.teachers") }}</h2>
				<div class="d-flex flex-wrap ga-1">
					<VChip v-for="teacher in course.teachers" :key="teacher.id" size="small">{{ teacher.fullName }}</VChip>
				</div>
			</section>

			<CourseGroupTopicList
				:topics="topics"
				:course-id="courseId"
				:group-id="groupId"
				:can-create="!course.isArchived && hasPermission(Permission.TOPIC_CREATE)"
				:can-edit="!course.isArchived && hasPermission(Permission.TOPIC_EDIT)"
				class="mb-6"
				@delete="onDeleteTopic"
			/>

			<CourseGroupTaskList
				type="done"
				:title="t('pages.courseRoomDetails.groups.details.tasks.done.title')"
				:empty-text="t('pages.courseRoomDetails.groups.details.tasks.done.empty')"
				:tasks="tasks.done"
				:color="course.color"
				class="mb-6"
			/>

			<CourseGroupTaskList
				type="open"
				:title="t('pages.courseRoomDetails.groups.details.tasks.open.title')"
				:empty-text="t('pages.courseRoomDetails.groups.details.tasks.open.empty')"
				:tasks="tasks.open"
				:color="course.color"
				class="mb-6"
			/>

			<div v-if="!course.isArchived" class="d-flex flex-wrap ga-3">
				<VBtn
					v-if="hasPermission(Permission.COURSEGROUP_EDIT)"
					:to="{ name: 'course-room-group-edit', params: { id: courseId, groupId } }"
					:prepend-icon="mdiPencilOutline"
					color="primary"
					data-testid="edit-group"
				>
					{{ t("pages.courseRoomDetails.groups.details.actions.edit") }}
				</VBtn>
				<VBtn
					v-if="hasPermission(Permission.COURSEGROUP_CREATE)"
					:prepend-icon="mdiTrashCanOutline"
					:loading="isMutating"
					variant="outlined"
					data-testid="delete-course-group"
					@click="isDeleteDialogOpen = true"
				>
					{{ t("pages.courseRoomDetails.groups.details.actions.delete") }}
				</VBtn>
			</div>

			<!-- Own dialog instead of askDeletion: the e2e suite confirms with the legacy id delete-course-group-btn -->
			<SvsDialog
				v-model="isDeleteDialogOpen"
				:title="
					t('ui-confirmation-dialog.ask-delete', {
						itemType: t('pages.courseRoomDetails.groups.group'),
						itemTitle: group.name,
					})
				"
				data-testid="delete-course-group-dialog"
			>
				<template #actions>
					<SvsDialogBtnCancel data-testid="delete-course-group-cancel" @click="isDeleteDialogOpen = false" />
					<SvsDialogBtnConfirm
						text-lang-key="common.actions.delete"
						data-testid="delete-course-group-btn"
						@click="onDeleteGroup"
					/>
				</template>
			</SvsDialog>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CourseGroupTaskList from "@/components/course-rooms/groups/CourseGroupTaskList.vue";
import CourseGroupTopicList from "@/components/course-rooms/groups/CourseGroupTopicList.vue";
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import {
	CourseGroup,
	CourseGroupCourse,
	CourseGroupTasks,
	CourseGroupTopic,
	useCourseGroupDetails,
	useCourseGroups,
} from "@data-course-group";
import { mdiPencilOutline, mdiTrashCanOutline } from "@icons/material";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
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
const appStore = useAppStore();
const { fetchCourse, fetchGroup, deleteGroup, isMutating } = useCourseGroups();
const { fetchTopics, deleteTopic, fetchGroupTasks } = useCourseGroupDetails();

// Users may leave the page while a request is running; do not navigate them back afterwards
let isLeft = false;
onBeforeUnmount(() => {
	isLeft = true;
});

const course = ref<CourseGroupCourse>();
const group = ref<CourseGroup>();
const topics = ref<CourseGroupTopic[]>([]);
const tasks = ref<CourseGroupTasks>({ done: [], open: [] });
const isDeleteDialogOpen = ref(false);

const hasPermission = (permission: Permission) => appStore.userPermissions.includes(permission);

useTitle(computed(() => buildPageTitle(group.value?.name, course.value?.name)));

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{ title: t("common.words.courses"), to: "/rooms/courses-overview" },
	{ title: course.value?.name ?? "", to: `/rooms/${props.courseId}?tab=groups` },
	{ title: group.value?.name ?? "", disabled: true },
]);

const loadTopics = async () => {
	topics.value = await fetchTopics(props.groupId);
};

const onDeleteTopic = async (topic: CourseGroupTopic) => {
	const confirmed = await askDeletionForItem(topic.name, t("common.words.topic"));
	if (confirmed && (await deleteTopic(topic.id))) {
		await loadTopics();
	}
};

const onDeleteGroup = async () => {
	isDeleteDialogOpen.value = false;
	if ((await deleteGroup(props.groupId)) && !isLeft) {
		await router.push({ name: "room-details", params: { id: props.courseId }, query: { tab: "groups" } });
	}
};

const load = async () => {
	const loadedGroup = await fetchGroup(props.groupId);
	if (isLeft) return;
	if (loadedGroup && loadedGroup.courseId !== props.courseId) {
		// The URL combines the group with another course: show it under its own course instead
		await router.replace({
			name: "course-room-group-details",
			params: { id: loadedGroup.courseId, groupId: props.groupId },
		});
		return;
	}

	group.value = loadedGroup;
	if (!loadedGroup) return;

	const [loadedCourse, loadedTasks] = await Promise.all([
		fetchCourse(props.courseId),
		fetchGroupTasks(props.groupId, props.courseId, loadedGroup.members.length),
		loadTopics(),
	]);
	course.value = loadedCourse;
	tasks.value = loadedTasks;
};

watch(() => [props.courseId, props.groupId], load, { immediate: true });
</script>
