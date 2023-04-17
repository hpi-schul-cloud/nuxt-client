<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		:headline="t('pages.rooms.fab.add.betatask')"
	>
		<task-form
			v-if="isEditMode"
			:is-edit-mode="isEditMode"
			:courses="courses"
			:due-date-max="dueDateMax"
		/>
		<task-student-view v-else />
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onBeforeMount } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import AuthModule from "@/store/auth";
import RoomsModule from "@/store/rooms";
import RoomModule from "@/store/room";
import SchoolsModule from "@/store/schools";
import TaskCardModule from "@/store/task-card";
import { AllItems } from "@/store/types/rooms";
import Theme from "@/theme.config";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TaskForm from "@/components/beta-task/TaskForm.vue";
import TaskStudentView from "@/components/beta-task/TaskStudentView.vue";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		TaskForm,
		TaskStudentView,
	},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const roomsModule: RoomsModule | undefined =
			inject<RoomsModule>("roomsModule");
		const roomModule: RoomModule | undefined = inject<RoomModule>("roomModule");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		const taskCardModule: TaskCardModule | undefined =
			inject<TaskCardModule>("taskCardModule");

		if (
			!i18n ||
			!authModule ||
			!roomsModule ||
			!roomModule ||
			!schoolsModule ||
			!taskCardModule
		) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		useTitle(
			`${t("pages.rooms.fab.add.betatask").toString()} - ${Theme.short_name}`
		);

		const isEditMode = authModule.getUserPermissions.includes("task_card_edit");

		const breadcrumbs = ref<object[]>([]);
		const courses = ref<AllItems>([]);
		const dueDateMax = ref("");
		const route = useRoute();

		const getCourses = async () => {
			await roomsModule.fetchAllElements();
			return roomsModule.getAllElements;
		};

		const getDueDateMax = () => {
			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			return endOfSchoolYear.toISOString();
		};

		const isTasksRoute = () => {
			const prevRoute = route.params.previousRoute;

			if (prevRoute === null) {
				return true; // TODO - default?
			}
			return prevRoute.includes("tasks");
		};

		const getCurrentCourse = async () => {
			if (route.name === "beta-task-view-edit") {
				const taskCardId = route.params.id;
				await taskCardModule.findTaskCard(taskCardId);
				const taskCardData = taskCardModule.getTaskCardData;

				return { id: taskCardData.courseId, name: taskCardData.courseName };
			}
			if (route.name === "rooms-beta-task-new") {
				await roomModule.fetchContent(route.params.id);
				const roomData = roomModule.getRoomData;

				return { id: roomData.roomId, name: roomData.title };
			}
		};

		onBeforeMount(async () => {
			courses.value = await getCourses();
			dueDateMax.value = getDueDateMax();

			const course = await getCurrentCourse();

			if (isTasksRoute() || !course) {
				breadcrumbs.value = [
					{
						text: t("common.words.tasks"),
						to: {
							name: "tasks",
						},
					},
				];
			} else {
				breadcrumbs.value = [
					{
						text: t("pages.courses.index.title"),
						to: {
							name: "rooms-overview",
						},
					},
					{
						text: course?.name,
						to: {
							name: "rooms-id",
							params: {
								id: course?.id,
							},
						},
					},
				];
			}
		});

		return {
			breadcrumbs,
			t,
			isEditMode,
			courses,
			dueDateMax,
		};
	},
});
</script>
