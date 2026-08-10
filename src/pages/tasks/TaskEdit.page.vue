<template>
	<DefaultWireframe :headline="isNew ? 'Create task' : 'Edit task'" :breadcrumbs="breadcrumbs" max-width="limited">
		<VForm class="task-form" @submit.prevent="save">
			<VCard class="task-card task-meta-card" elevation="1">
				<VCardTitle>Task details</VCardTitle>
				<VCardText>
					<VTextField v-model="form.name" :rules="[requiredTitleRule]" label="Title" required data-testid="task-name" />

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
							<VCheckbox v-model="form.private" label="Keep as draft (only visible to me)" :disabled="!form.courseId" />
							<VCheckbox
								v-model="form.publicSubmissions"
								label="Make student submissions visible to other students"
								:disabled="!form.courseId || form.private"
							/>
							<VCheckbox v-model="form.teamSubmissions" label="Allow group submissions" :disabled="!form.courseId" />
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
						<InlineEditor
							v-model:value="form.description"
							placeholder="Describe the task"
							:image-upload-handler="browseImage"
							:audio-upload-handler="browseAudio"
							:video-upload-handler="browseVideo"
							@ready="handleEditorReady"
						/>
						<input
							ref="imageInput"
							type="file"
							accept="image/*"
							hidden
							data-testid="task-image-input"
							@change="onImageSelection"
						/>
						<input
							ref="audioInput"
							type="file"
							accept="audio/*"
							hidden
							data-testid="task-audio-input"
							@change="onAudioSelection"
						/>
						<input
							ref="videoInput"
							type="file"
							accept="video/*"
							hidden
							data-testid="task-video-input"
							@change="onVideoSelection"
						/>
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
import TaskFiles from "@/components/tasks/TaskFiles.vue";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { type FileRecord, FileRecordParent } from "@/types/file/File";
import { $axios } from "@/utils/api";
import { BoardElementResponseType, CourseRoomsApiFactory, CoursesApiFactory } from "@api-server";
import type { Editor } from "@ckeditor/ckeditor5-core";
import { useFileStorageApi } from "@data-file";
import { createTask, getTask, type TaskWriteParams, updateTask } from "@data-tasks";
import { InlineEditor } from "@feature-editor";
import { DefaultWireframe } from "@ui-layout";
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
const imageInput = ref<HTMLInputElement>();
const audioInput = ref<HTMLInputElement>();
const videoInput = ref<HTMLInputElement>();
const taskEditor = ref<Editor>();
const isUploadingImage = ref(false);
const isUploadingAudio = ref(false);
const isUploadingVideo = ref(false);
type InlineImageFile = Pick<FileRecord, "id" | "name" | "url">;
type InlineMediaKind = "image" | "audio" | "video";
type InlineMedia = { temporary: FileRecord; permanent?: InlineImageFile; kind: InlineMediaKind };
const inlineMedia = ref<InlineMedia[]>([]);
const { uploadTemporary, copyFileToParent, deleteFiles } = useFileStorageApi();
const requiredTitleRule = (value: string) => Boolean(value?.trim()) || "Title is required";

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

watch(
	() => form.courseId,
	(courseId, previousCourseId) => {
		if (courseId !== previousCourseId) void loadLessons(courseId);
	}
);

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

const handleEditorReady = (editor: Editor) => {
	taskEditor.value = editor;
};

const browseImage = () => {
	imageInput.value?.click();
};

const browseAudio = () => {
	audioInput.value?.click();
};

const browseVideo = () => {
	videoInput.value?.click();
};

const onMediaSelection = async (event: Event, kind: InlineMediaKind) => {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	input.value = "";
	if (!file || !taskEditor.value) return;
	if (kind === "audio" && !file.type.startsWith("audio/")) return;
	if (kind === "video" && !file.type.startsWith("video/")) return;

	if (kind === "image") isUploadingImage.value = true;
	if (kind === "audio") isUploadingAudio.value = true;
	if (kind === "video") isUploadingVideo.value = true;
	try {
		const temporary = await uploadTemporary(file);
		if (!temporary) return;

		inlineMedia.value.push({ temporary, kind });
		const command = kind === "image" ? "insertImage" : kind === "audio" ? "insertAudio" : "insertVideo";
		taskEditor.value.execute(command, { source: temporary.url });
	} finally {
		if (kind === "image") isUploadingImage.value = false;
		if (kind === "audio") isUploadingAudio.value = false;
		if (kind === "video") isUploadingVideo.value = false;
	}
};

const onImageSelection = (event: Event) => onMediaSelection(event, "image");
const onAudioSelection = (event: Event) => onMediaSelection(event, "audio");
const onVideoSelection = (event: Event) => onMediaSelection(event, "video");

const removePendingMediaFromDescription = (description: string): string => {
	if (!inlineMedia.value.length) return description;

	const container = document.createElement("div");
	container.innerHTML = description;
	container.querySelectorAll("img, audio, video").forEach((media) => {
		if (!inlineMedia.value.some(({ temporary }) => temporary.url === media.getAttribute("src"))) return;
		const figure = media.closest("figure");
		(figure ?? media).remove();
	});

	return container.innerHTML;
};

const promoteMedia = async (taskId: string, description: string): Promise<string> => {
	const referencedMedia = inlineMedia.value.filter(({ temporary }) => description.includes(temporary.url));

	let finalDescription = description;
	for (const media of referencedMedia) {
		if (!media.permanent) {
			const permanent = await copyFileToParent(media.temporary.id, taskId, FileRecordParent.TASKS);
			if (!permanent) throw new Error(`Could not promote task ${media.kind}`);
			media.permanent = permanent;
		}
		const permanent = media.permanent;
		if (!permanent) throw new Error(`Could not promote task ${media.kind}`);
		finalDescription = finalDescription.replaceAll(media.temporary.url, permanent.url);
	}

	return finalDescription;
};

const save = async () => {
	if (!form.name.trim()) return;
	const description = form.description ?? "";
	const descriptionBeforeMediaPromotion = removePendingMediaFromDescription(description);
	const payload: TaskWriteParams = {
		...form,
		description: descriptionBeforeMediaPromotion,
		availableDate: toIso(form.availableDate),
		dueDate: toIso(form.dueDate),
		maxTeamMembers: form.teamSubmissions ? Number(form.maxTeamMembers || 5) : undefined,
	};
	const result = await execute(() =>
		isNew.value ? createTask(payload) : updateTask(route.params.taskId as string, payload)
	);
	if (result.success) {
		const savedTask = result.result;
		await taskFiles.value?.uploadSelectedFiles(savedTask.id);
		const descriptionWithPermanentMedia = await promoteMedia(savedTask.id, description);
		if (descriptionWithPermanentMedia !== descriptionBeforeMediaPromotion) {
			const updateResult = await execute(() =>
				updateTask(savedTask.id, { ...payload, description: descriptionWithPermanentMedia })
			);
			if (!updateResult.success) return;
		}
		if (inlineMedia.value.length) await deleteFiles(inlineMedia.value.map(({ temporary }) => temporary));
		inlineMedia.value = [];
		await router.push(`/tasks/${savedTask.id}`);
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
