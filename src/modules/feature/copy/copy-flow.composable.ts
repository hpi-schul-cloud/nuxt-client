import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { $axios } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, RoomApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	const confirmAction = useAwaitableAction<boolean>();

	const isDialogOpen = confirmAction.isActive;
	const copyItemType = ref<ContentItemTypeEnum>(ContentItemTypeEnum.Course);

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

	const confirm = (type: ContentItemTypeEnum) => {
		copyItemType.value = type;
		return confirmAction.start();
	};

	const onConfirm = () => {
		confirmAction.submit(true);
	};

	const onCancel = () => {
		confirmAction.cancel();
	};

	const withCopyLoading = <T>(fn: () => Promise<T>) => withLoadingState(fn, t("feature-copy.inProgress.title.loading"));

	const notifyCopySuccess = (type: ContentItemTypeEnum) => {
		notifySuccess(
			t("feature-copy.notifications.success.successfullyCopied", { type: t(`feature-copy.copyInfo.type.${type}`) })
		);
	};

	const executeCopyCourse = async (courseId: string) => {
		const { submitted } = await confirm(ContentItemTypeEnum.Course);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyCourse(courseId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.course") })
			)
		);

		if (outcome.success) {
			notifyCopySuccess(ContentItemTypeEnum.Course);
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const { submitted } = await confirm(ContentItemTypeEnum.Task);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.task") })
			)
		);

		if (outcome.success) {
			notifyCopySuccess(ContentItemTypeEnum.Task);
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const { submitted } = await confirm(ContentItemTypeEnum.Lesson);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.lesson") })
			)
		);

		if (outcome.success) {
			notifyCopySuccess(ContentItemTypeEnum.Lesson);
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyBoard = async (boardId: string) => {
		const { submitted } = await confirm(ContentItemTypeEnum.ColumnBoard);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => boardApi.boardControllerCopyBoard(boardId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.board") })
			)
		);

		if (outcome.success) {
			notifyCopySuccess(ContentItemTypeEnum.ColumnBoard);
		}

		return { ...outcome, copyResult: outcome.result?.data };
	};

	const executeCopyRoom = async (roomId: string) => {
		const { submitted } = await confirm(ContentItemTypeEnum.Room);
		if (!submitted) return CANCELLED_RESULT;

		const outcome = await withCopyLoading(() =>
			execute(
				() => roomApi.roomControllerCopyRoom(roomId),
				t("common.notifications.errors.notDuplicated", { type: t("common.labels.room") })
			)
		);

		if (outcome.success) {
			notifyCopySuccess(ContentItemTypeEnum.Room);
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
