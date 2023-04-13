<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		:headline="t('pages.rooms.fab.add.betatask')"
	>
		<task-form
			:is-edit-mode="isEditMode"
			:courses="courses"
			:due-date-max="dueDateMax"
		/>
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
import Theme from "@/theme.config";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TaskForm from "@/components/beta-task/TaskForm.vue";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		TaskForm,
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
		const courses = ref<object[]>([]);
		const dueDateMax = ref("");
		const route = useRoute();

		onBeforeMount(async () => {
			await roomsModule.fetchAllElements();
			courses.value = roomsModule.getAllElements;

			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			dueDateMax.value = endOfSchoolYear.toISOString();

			if (route.name === "beta-task-view-edit") {
				const taskCardId = route.params.id;
				await taskCardModule.findTaskCard(taskCardId);
				const taskCardData = taskCardModule.getTaskCardData;

				breadcrumbs.value.push(
					{
						text: t("pages.courses.index.title"),
						to: {
							name: "rooms-overview",
						},
					},
					{
						text: taskCardData.courseName || "",
						to: {
							name: "rooms-id",
							params: {
								id: taskCardData.courseId || "",
							},
						},
					}
				);
			}
			if (route.name === "rooms-beta-task-new") {
				await roomModule.fetchContent(route.params.id);
				const roomData = roomModule.getRoomData;
				breadcrumbs.value.push(
					{
						text: t("pages.courses.index.title"),
						to: {
							name: "rooms-overview",
						},
					},
					{
						text: roomData.title,
						to: {
							name: "rooms-id",
						},
					}
				);
			}

			if (route.name === "tasks-beta-task-new") {
				breadcrumbs.value.push({
					text: t("common.words.tasks"),
					to: {
						name: "tasks",
					},
				});
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
