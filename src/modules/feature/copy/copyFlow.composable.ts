import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { CopyParamsTypeEnum } from "@/store/copy";
import { $axios } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	let resolvePromise: ((confirmed: boolean) => void) | null = null;

	const isDialogOpen = ref(false);
	const copyItemType = ref<CopyParamsTypeEnum>(CopyParamsTypeEnum.Course);

	const { t } = useI18n();
	const { withLoadingState } = useLoadingStore();
	const { execute } = useSafeAxiosTask();

	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);

	const confirm = (type: CopyParamsTypeEnum): Promise<boolean> => {
		copyItemType.value = type;
		isDialogOpen.value = true;

		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const onConfirmed = () => {
		isDialogOpen.value = false;
		resolvePromise?.(true);
		resolvePromise = null;
	};

	const onCancelled = () => {
		isDialogOpen.value = false;
		resolvePromise?.(false);
		resolvePromise = null;
	};

	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withLoadingState(fn, t("components.molecules.copyResult.title.loading"));

	const executeCopyCourse = async (courseId: string) => {
		const confirmed = await confirm(CopyParamsTypeEnum.Course);
		if (!confirmed) {
			return { result: undefined, error: undefined };
		}

		const { result, error } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyCourse(courseId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.course") })
			)
		);

		if (!error && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.course.successfullyCopied"));
			const sanitizedId = result.data.id.replace(/[^a-z\d]/g, "");
			return { result: { id: sanitizedId }, error: undefined };
		}

		return { result: undefined, error };
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const confirmed = await confirm(CopyParamsTypeEnum.Task);
		if (!confirmed) {
			return { result: undefined, error: undefined };
		}

		const { result, error } = await withCopyLoading(() =>
			execute(
				() => taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.task") })
			)
		);

		if (!error && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.task.successfullyCopied"));
			return { result: { id: result.data.id }, error: undefined };
		}

		return { result: undefined, error };
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const confirmed = await confirm(CopyParamsTypeEnum.Lesson);
		if (!confirmed) {
			return { result: undefined, error: undefined };
		}

		const { result, error } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.lesson") })
			)
		);

		if (!error && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.lesson.successfullyCopied"));
			return { result: { id: result.data.id }, error: undefined };
		}

		return { result: undefined, error };
	};

	const executeCopyBoard = async (boardId: string) => {
		const confirmed = await confirm(CopyParamsTypeEnum.ColumnBoard);
		if (!confirmed) {
			return { result: undefined, error: undefined };
		}

		const { result, error } = await withCopyLoading(() =>
			execute(
				() => boardApi.boardControllerCopyBoard(boardId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.board") })
			)
		);

		if (!error && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.board.successfullyCopied"));
			return { result: { id: result.data.id }, error: undefined };
		}

		return { result: undefined, error };
	};

	return {
		isDialogOpen,
		copyItemType,
		onConfirmed,
		onCancelled,
		executeCopyCourse,
		executeCopyTask,
		executeCopyLesson,
		executeCopyBoard,
	};
};
