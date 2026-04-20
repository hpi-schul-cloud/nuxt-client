import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { CopyParamsTypeEnum } from "@/store/copy";
import { $axios } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	const confirmAction = useAwaitableAction<boolean>();

	const isDialogOpen = confirmAction.isActive;
	const copyItemType = ref<CopyParamsTypeEnum>(CopyParamsTypeEnum.Course);

	const { t } = useI18n();
	const { withLoadingState } = useLoadingStore();
	const { execute } = useSafeAxiosTask();

	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);

	const confirm = (type: CopyParamsTypeEnum) => {
		copyItemType.value = type;
		return confirmAction.start();
	};

	const onConfirmed = () => {
		confirmAction.submit(true);
	};

	const onCancelled = () => {
		confirmAction.cancel();
	};

	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withLoadingState(fn, t("components.molecules.copyResult.title.loading"));

	const executeCopyCourse = async (courseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Course);
		if (!submitted) return;

		const { result, success } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyCourse(courseId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.course") })
			)
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.course.successfullyCopied"));
			const sanitizedId = result.data.id.replace(/[^a-z\d]/g, "");
			return sanitizedId;
		}
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Task);
		if (!submitted) return;

		const { result, success } = await withCopyLoading(() =>
			execute(
				() => taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.task") })
			)
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.task.successfullyCopied"));
			return result.data.id;
		}
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Lesson);
		if (!submitted) return;

		const { result, success } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.lesson") })
			)
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.lesson.successfullyCopied"));
			return result.data.id;
		}
	};

	const executeCopyBoard = async (boardId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.ColumnBoard);
		if (!submitted) return;

		const { result, success } = await withCopyLoading(() =>
			execute(
				() => boardApi.boardControllerCopyBoard(boardId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.board") })
			)
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(t("components.molecules.copyResult.board.successfullyCopied"));
			return result.data.id;
		}
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
