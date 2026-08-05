<template>
	<DefaultWireframe
		:headline="isNew ? 'Create task' : 'Edit task'"
		:breadcrumbs="breadcrumbs"
		max-width="limited"
	>
		<VForm class="task-form" @submit.prevent="save">
			<VCard class="task-card task-meta-card" elevation="1">
				<VCardTitle>Task details</VCardTitle>
				<VCardText>
					<VTextField v-model="form.name" label="Title" required data-testid="task-name" />

					<div class="d-flex flex-column flex-sm-row ga-4">
						<VSelect
							v-model="form.courseId"
							:items="courses"
							item-title="title"
							item-value="id"
							label="Course"
							clearable
							data-testid="task-course"
						/>
						<VSelect
							v-model="form.lessonId"
							:items="lessons"
							item-title="name"
							item-value="id"
							label="Topic"
							clearable
							:disabled="!form.courseId || lessonsLoading"
							:loading="lessonsLoading"
							data-testid="task-topic"
						/>
					</div>
				</VCardText>
			</VCard>

			<VCard class="task-card task-options-card" elevation="1">
				<VCardTitle>Schedule and submission settings</VCardTitle>
				<VCardText>
					<div class="task-options-content">
						<div class="task-date-fields">
							<VTextField v-model="form.availableDate" type="datetime-local" label="Available from" density="compact" />
							<VTextField v-model="form.dueDate" type="datetime-local" label="Due date" density="compact" />
						</div>
						<div class="task-submission-settings">
							<VCheckbox
								v-model="form.private"
								label="Keep as draft (only visible to me)"
								:disabled="!form.courseId"
							/>
							<VCheckbox
								v-model="form.publicSubmissions"
								label="Make student submissions visible to other students"
								:disabled="!form.courseId || form.private"
							/>
							<VCheckbox
								v-model="form.teamSubmissions"
								label="Allow group submissions"
								:disabled="!form.courseId"
							/>
						</div>
						<VTextField
							v-if="form.teamSubmissions"
							v-model.number="form.maxTeamMembers"
							label="Maximum group size"
							type="number"
							min="2"
							required
						/>
					</div>
				</VCardText>
			</VCard>

			<VCard class="task-card task-description-card" elevation="1">
				<VCardTitle>Task definition</VCardTitle>
				<VCardText>
					<div class="task-editor">
						<InlineEditor v-model:value="form.description" placeholder="Describe the task" />
					</div>
				</VCardText>
			</VCard>

			<VCard class="task-card task-attachments-card" elevation="1">
				<VCardTitle>Attachments</VCardTitle>
				<VCardText>
					<TaskFiles ref="taskFiles" :task-id="taskId" :editable="true" />
				</VCardText>
			</VCard>

			<div class="task-actions d-flex justify-end ga-3">
				<VBtn variant="text" to="/tasks">Cancel</VBtn>
				<VBtn color="primary" type="submit" :loading="isRunning">Save</VBtn>
			</div>
		</VForm>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { CourseRoomsApiFactory, CoursesApiFactory, BoardElementResponseType } from "@api-server";
import { InlineEditor } from "@feature-editor";
import { createTask, getTask, updateTask, type TaskWriteParams } from "@data-tasks";
import { DefaultWireframe } from "@ui-layout";
import TaskFiles from "@/components/tasks/TaskFiles.vue";
import { $axios } from "@/utils/api";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

type CourseOption = { id: string; title: string };
type LessonOption = { id: string; name: string };

const route = useRoute();
const router = useRouter();
const isNew = computed(() => route.name === "task-new");
const taskId = computed(() => (isNew.value ? "pending-task" : (route.params.taskId as string)));
const breadcrumbs = computed(() => [
	{ title: "Tasks", to: "/tasks" },
	{ title: isNew.value ? "Create task" : "Edit task", disabled: true },
]);
const { execute, isRunning } = useSafeAxiosTask();
const courses = ref<CourseOption[]>([]);
const lessons = ref<LessonOption[]>([]);
const lessonsLoading = ref(false);
const taskFiles = ref<{ uploadSelectedFiles: (parentId?: string) => Promise<void> }>();

const form = reactive<TaskWriteParams & { maxTeamMembers?: number }>({
	name: "",
	description: "",
	availableDate: "",
	dueDate: "",
	private: route.query.private === "true" || typeof route.query.courseId !== "string",
	publicSubmissions: false,
	teamSubmissions: false,
	maxTeamMembers: 5,
	courseId: typeof route.query.courseId === "string" ? route.query.courseId : undefined,
	lessonId: typeof route.query.lessonId === "string" ? route.query.lessonId : undefined,
});

const coursesApi = CoursesApiFactory(undefined, "/v3", $axios);
const roomsApi = CourseRoomsApiFactory(undefined, "/v3", $axios);

const loadCourses = async () => {
	const result = await execute(() => coursesApi.courseControllerFindForUser(0, 100));
	if (result.success) courses.value = result.result.data.data.map(({ id, title }) => ({ id, title }));
};

const loadLessons = async (courseId?: string) => {
	lessons.value = [];
	form.lessonId = undefined;
	if (!courseId) return;
	lessonsLoading.value = true;
	try {
		const { data } = await roomsApi.courseRoomsControllerGetRoomBoard(courseId);
		lessons.value = data.elements
			.filter((element) => element.type === BoardElementResponseType.LESSON)
			.map((element) => {
				const lesson = element.content as { id: string; name: string };
				return { id: lesson.id, name: lesson.name };
			});
	} finally {
		lessonsLoading.value = false;
	}
};

watch(() => form.courseId, (courseId, previousCourseId) => {
	if (courseId !== previousCourseId) void loadLessons(courseId);
});

onMounted(async () => {
	await loadCourses();
	if (!isNew.value) {
		const result = await execute(() => getTask(route.params.taskId as string));
		if (result.success) {
			form.name = result.result.name;
			form.description = result.result.description?.content ?? "";
			form.availableDate = result.result.availableDate?.slice(0, 16) ?? "";
			form.dueDate = result.result.dueDate?.slice(0, 16) ?? "";
			form.courseId = result.result.courseId || undefined;
			form.lessonId = undefined;
			form.private = result.result.status.isDraft;
			form.publicSubmissions = result.result.publicSubmissions ?? false;
			form.teamSubmissions = result.result.teamSubmissions ?? false;
			form.maxTeamMembers = result.result.maxTeamMembers ?? 5;
			await loadLessons(form.courseId);
			form.lessonId = result.result.lessonId || undefined;
		}
	} else if (form.courseId) {
		await loadLessons(form.courseId);
	}
});

const toIso = (value?: string) => (value ? new Date(value).toISOString() : undefined);

const save = async () => {
	const payload: TaskWriteParams = {
		...form,
		availableDate: toIso(form.availableDate),
		dueDate: toIso(form.dueDate),
		maxTeamMembers: form.teamSubmissions ? Number(form.maxTeamMembers || 5) : undefined,
	};
	const result = await execute(() =>
		isNew.value ? createTask(payload) : updateTask(route.params.taskId as string, payload)
	);
	if (result.success) {
		await taskFiles.value?.uploadSelectedFiles(result.result.id);
		await router.push(`/tasks/${result.result.id}`);
	}
};
</script>

<style scoped>
.task-form {
	padding-bottom: 24px;
	display: grid;
	grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
	gap: 20px;
}

	.task-card :deep(.v-card-title) {
	font-size: 1.1rem;
	font-weight: 600;
	padding-bottom: 0;
}

.task-meta-card {
	grid-column: 1 / -1;
}

.task-attachments-card,
.task-actions {
	grid-column: 1 / -1;
}

.task-description-card {
	grid-column: 1;
	grid-row: 2;
	min-height: 360px;
}

.task-options-card {
	grid-column: 2;
	grid-row: 2;
	min-height: 360px;
}

.task-editor {
	border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
	border-radius: 4px;
	padding: 8px;
	min-height: 292px;

	:deep(.ck-editor__editable_inline) {
		min-height: 260px;
	}
}

.task-options-content {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.task-date-fields {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
}

.task-submission-settings {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

@media (max-width: 900px) {
	.task-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.task-description-card,
	.task-options-card {
		min-height: unset;
	}

	.task-editor {
		min-height: 240px;

		:deep(.ck-editor__editable_inline) {
			min-height: 208px;
		}
	}

	.task-date-fields {
		grid-template-columns: 1fr;
	}
}
</style>
