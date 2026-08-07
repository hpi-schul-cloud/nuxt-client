import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, RoomApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, notifyWarning } from "@data-app";
import { openDialog, withGlobalLoadingState } from "@feature-dialog";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();

	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const copyCancelledError = () => new Error("Copy cancelled");
	const copyInProgressError = () => new Error("Copy is still in progress");

	const getTypeLabel = (type: ContentItemTypeEnum) => t(`feature-copy.copyInfo.type.${type}`);

	const getCopyFailedMessage = (type: ContentItemTypeEnum) =>
		t("common.notifications.errors.notDuplicated", { type: getTypeLabel(type) });

	const isCopyInProgress = (error: Error | undefined) => {
		if (!error) return false;

		const apiError = mapAxiosErrorToResponseError(error);
		return apiError.code === 504;
	};

	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withGlobalLoadingState(fn, t("feature-copy.inProgress.title.loading"));

	const notifyCopySuccess = (type: ContentItemTypeEnum) => {
		notifySuccess(t("feature-copy.notifications.success.successfullyCopied", { type: getTypeLabel(type) }));
	};

	const notifyCopyInProgress = (type: ContentItemTypeEnum) => {
		notifyWarning(t("feature-copy.notifications.duplicationInProgress", { type: getTypeLabel(type) }));
	};

	const executeCopyRequest = async <T>(
		type: ContentItemTypeEnum,
		request: () => Promise<{ data: T }>
	): Promise<{ result: T | undefined; success: boolean; error: Error | undefined }> => {
		const { result, success, error } = await withCopyLoading(() =>
			execute(request, getCopyFailedMessage(type), { skipErrorNotification: isCopyInProgress })
		);

		if (success) {
			notifyCopySuccess(type);
			return { result: result?.data, success: true, error: undefined };
		}

		if (isCopyInProgress(error)) {
			notifyCopyInProgress(type);
			return { result: undefined, success: true, error: copyInProgressError() };
		}

		return { result: undefined, success: false, error };
	};

	const executeCopyCourse = async (courseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Course });
		if (!completed) return { result: undefined, success: false, error: copyCancelledError() };

		return executeCopyRequest(ContentItemTypeEnum.Course, () =>
			courseRoomApi.courseRoomsControllerCopyCourse(courseId)
		);
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Task });
		if (!completed) return { result: undefined, success: false, error: copyCancelledError() };

		return executeCopyRequest(ContentItemTypeEnum.Task, () =>
			taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId })
		);
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Lesson });
		if (!completed) return { result: undefined, success: false, error: copyCancelledError() };

		return executeCopyRequest(ContentItemTypeEnum.Lesson, () =>
			courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId })
		);
	};

	const executeCopyBoard = async (boardId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.ColumnBoard });
		if (!completed) return { result: undefined, success: false, error: copyCancelledError() };

		return executeCopyRequest(ContentItemTypeEnum.ColumnBoard, () => boardApi.boardControllerCopyBoard(boardId));
	};

	const executeCopyRoom = async (roomId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Room });
		if (!completed) return { result: undefined, success: false, error: copyCancelledError() };

		return executeCopyRequest(ContentItemTypeEnum.Room, () => roomApi.roomControllerCopyRoom(roomId));
	};

	return {
		executeCopyCourse,
		executeCopyTask,
		executeCopyLesson,
		executeCopyBoard,
		executeCopyRoom,
	};
};
