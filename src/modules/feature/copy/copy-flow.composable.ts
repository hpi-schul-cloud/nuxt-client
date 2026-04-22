import { CopyParamsTypeEnum } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { $axios } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, RoomApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	const confirmAction = useAwaitableAction<boolean>();

	const isDialogOpen = confirmAction.isActive;
	const copyItemType = ref<CopyParamsTypeEnum>(CopyParamsTypeEnum.Course);

	const CANCELLED_RESULT = {
		success: false,
		result: undefined,
		error: undefined,
		copyResult: undefined,
	} as const;

	const { t } = useI18n();
	const { withLoadingState } = useLoadingStore();
	const { execute, isRunning } = useSafeAxiosTask();

	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const confirm = (type: CopyParamsTypeEnum) => {
		copyItemType.value = type;
		return confirmAction.start();
	};

	const onConfirm = () => {
		confirmAction.submit(true);
	};

	const onCancel = () => {
		confirmAction.cancel();
	};

	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withLoadingState(fn, t("components.molecules.copyResult.title.loading"));

	const executeCopyCourse = async (courseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Course);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyCourse(courseId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.course") })
			)
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.copyResult.course.successfullyCopied"));
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Task);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.task") })
			)
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.copyResult.task.successfullyCopied"));
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Lesson);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.lesson") })
			)
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.copyResult.lesson.successfullyCopied"));
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyBoard = async (boardId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.ColumnBoard);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => boardApi.boardControllerCopyBoard(boardId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.board") })
			)
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.copyResult.board.successfullyCopied"));
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyRoom = async (roomId: string) => {
		const { submitted } = await confirm(CopyParamsTypeEnum.Room);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => roomApi.roomControllerCopyRoom(roomId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.room") })
			)
		);

		if (outcome.success) {
			notifySuccess(t("components.molecules.copyResult.room.successfullyCopied"));
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	return {
		isDialogOpen,
		copyItemType,
		onConfirm,
		onCancel,
		executeCopyCourse,
		executeCopyTask,
		executeCopyLesson,
		executeCopyBoard,
		executeCopyRoom,
		isRunning,
	};
};
