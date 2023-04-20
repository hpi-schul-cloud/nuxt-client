<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		:headline="t('pages.rooms.fab.add.betatask')"
	>
		<<<<<<< HEAD
		<task-form
			v-if="isEditMode"
			:is-edit-mode="isEditMode"
			:courses="courses"
			:due-date-max="dueDateMax"
		/>
		<task-student-view v-else />
		=======
		<v-form
			v-if="isEditMode && !isLoading"
			class="d-flex flex-column"
			ref="form"
		>
			<v-select
				v-model="course"
				:items="courses"
				item-value="id"
				item-text="title"
				filled
				:disabled="isCourseSelectDisabled"
				:label="$t('common.labels.course')"
				validate-on-blur
				:rules="[rules.required]"
			/>
			<v-select
				v-model="isVisible"
				:items="visibilityOptions"
				item-value="value"
				item-text="text"
				filled
				disabled
				:label="$t('common.labels.visibility')"
				validate-on-blur
				:rules="[rules.required]"
			/>
			<date-time-picker
				class="mb-4"
				required
				:allow-past="false"
				:date-time="dueDate"
				:date-input-label="t('pages.taskCard.labels.dateInput')"
				:minDate="minDate"
				:maxDate="maxDate"
				:time-input-label="t('components.organisms.FormNews.label.time')"
				@input="handleDateTimeInput"
				@error="onError"
			/>
			<title-card-element
				v-model="title"
				:placeholder="t('components.cardElement.titleElement.placeholder')"
				:editable="true"
			/>
			<card-element-list v-model="elements" :editMode="true" />
			<div class="d-flex">
				<v-btn color="primary" depressed @click="save" data-testid="save-btn">
					{{ $t("common.actions.save") }}
				</v-btn>
				<v-btn
					class="ml-2"
					color="secondary"
					outlined
					@click="cancel"
					data-testid="cancel-btn"
				>
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					v-if="isDeletable"
					class="ml-auto"
					color="secondary"
					outlined
					@click="openDeleteDialog()"
					data-testid="delete-btn"
				>
					{{ $t("common.actions.remove") }}
				</v-btn>
			</div>
			<v-custom-dialog
				ref="delete-dialog"
				v-model="deleteDialog.isOpen"
				data-testid="delete-beta-task-dialog"
				:size="375"
				has-buttons
				confirm-btn-title-key="common.actions.remove"
				@dialog-confirmed="deleteElement()"
				:is-open="false"
			>
				<h2 slot="title" class="text-h4 my-2">
					{{ $t("pages.taskCard.deleteTaskCard.title") }}
				</h2>
				<template slot="content">
					<p class="text-md mt-2">
						{{ $t("pages.taskCard.deleteTaskCard.text", { title }) }}
					</p>
				</template>
			</v-custom-dialog>
		</v-form>
		<article v-else class="d-flex flex-column">
			<title-card-element v-model="title" :editable="false" />
			<card-element-list v-model="elements" :editMode="false" />
		</article>
		>>>>>>> 41b554919253b94cc79d89f177b8ca9abaf30de5
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

		const isEditMode = authModule.getUserPermissions.includes("task_card_edit");

		const breadcrumbs = ref<object[]>([]);
		const courses = ref<AllItems>([]);
		const dueDateMax = ref("");
		const isLoading = ref(true);
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
			return null;
		};

		onBeforeMount(async () => {
			courses.value = await getCourses();
			dueDateMax.value = getDueDateMax();

			const course = await getCurrentCourse();

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
			isEditMode,
			courses,
			dueDateMax,
			isLoading,
		};
	},
});
</script>
