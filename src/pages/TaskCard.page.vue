<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		:headline="t('pages.rooms.fab.add.betatask')"
	>
		<template v-if="hasEditPermission">
			<div v-if="isLoading">
				<v-skeleton-loader type="button" class="mb-8 teacher-input-loader" />
				<v-skeleton-loader type="button" class="mb-8 teacher-input-loader" />
				<v-skeleton-loader type="button" class="mb-14 teacher-input-loader" />
				<v-skeleton-loader type="heading" class="mb-8" />
				<v-skeleton-loader type="paragraph" />
			</div>
			<task-form
				v-else
				:task="task"
				:courses="courses"
				:due-date-max="dueDateMax"
			/>
		</template>
		<template v-else>
			<div v-if="isLoading || task === undefined" class="mt-12">
				<v-skeleton-loader type="heading" class="mb-12 d-flex justify-end" />
				<v-skeleton-loader type="button" class="mb-12 input-loader" />
				<v-skeleton-loader type="heading" class="mb-8" />
				<v-skeleton-loader type="paragraph" />
			</div>
			<task-student-view v-else :task="task" />
		</template>
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
import {
	CardElementResponse,
	CardElementResponseCardElementTypeEnum,
	CardRichTextElementResponseInputFormatEnum,
	TaskCardResponse,
} from "@/serverApi/v3/api";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/beta-task/card-element";
import { TaskCard } from "@/store/types/beta-task/beta-task";

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
		const roomModule: RoomModule | undefined = inject<RoomModule>("roomModule");
		const roomsModule: RoomsModule | undefined =
			inject<RoomsModule>("roomsModule");
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

		const hasEditPermission =
			authModule.getUserPermissions.includes("task_card_edit");

		const breadcrumbs = ref<object[]>([]);
		const courses = ref<AllItems>([]);
		const dueDateMax = ref("");
		const isLoading = ref(true);
		const task = ref<TaskCard | undefined>(undefined);
		const route = useRoute();

		const getTask = async (): Promise<TaskCard | undefined> => {
			if (route.name !== "beta-task-view-edit") {
				return undefined;
			}

			const taskCardId = route.params.id;
			await taskCardModule.findTaskCard(taskCardId);

			const task: TaskCard = {
				...taskCardModule.getTaskCardData,
				...{ cardElements: initElements(taskCardModule.getTaskCardData) },
			};

			return task;
		};

		const initElements = (
			task: TaskCardResponse
		): Array<CardElement> | undefined => {
			if (task === undefined) return undefined;

			let initialCardElements: Array<CardElementResponse> = [
				{
					id: "",
					cardElementType: CardElementResponseCardElementTypeEnum.RichText,
					content: {
						value: "",
						inputFormat: CardRichTextElementResponseInputFormatEnum.RichtextCk5,
					},
				},
			];

			if (task.cardElements && task.cardElements.length > 0) {
				initialCardElements = task.cardElements;
			}

			const elements: CardElement[] = [];
			initialCardElements.forEach((cardElement) => {
				return elements.push({
					id: cardElement.id,
					type: CardElementResponseCardElementTypeEnum.RichText,
					model: cardElement.content.value,
					props: {
						component: CardElementComponentEnum.RichText,
						placeholder: i18n.t(
							"components.cardElement.richTextElement.placeholder"
						) as string,
						editable: hasEditPermission,
					},
				});
			});

			return elements;
		};

		const getCurrentCourse = async () => {
			if (task.value) {
				return { id: task.value.courseId, name: task.value.courseName };
			}

			if (route.name === "rooms-beta-task-new") {
				await roomModule.fetchContent(route.params.id);
				const roomData = roomModule.getRoomData;

				return { id: roomData.roomId, name: roomData.title };
			}

			return null;
		};

		const getCourses = async () => {
			await roomsModule.fetchAllElements();
			return roomsModule.getAllElements;
		};

		const getDueDateMax = () => {
			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			return endOfSchoolYear.toISOString();
		};

		onBeforeMount(async () => {
			courses.value = await getCourses();
			dueDateMax.value = getDueDateMax();
			task.value = await getTask();

			const course = await getCurrentCourse();

			isLoading.value = false;

			if (!course) {
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
			hasEditPermission,
			courses,
			dueDateMax,
			isLoading,
			task,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep .student-input-loader .v-skeleton-loader__button {
	width: 40%;
}

::v-deep .teacher-input-loader .v-skeleton-loader__button {
	width: 100%;
	height: 56px;
}
</style>
