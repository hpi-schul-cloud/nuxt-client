import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	BoardApiFactory,
	CopyApiResponse,
	CopyElementType,
	CopyStatusEnum,
	CourseRoomsApiFactory,
	RoomApiFactory,
	TaskApiFactory,
} from "@api-server";
import { notifySuccess, notifyWarning } from "@data-app";
import { openDialog, withGlobalLoadingState } from "@feature-dialog";
import { useFailedFilesNotifier } from "@util-error-handling";
import { isAxiosError } from "axios";
import { useI18n } from "vue-i18n";

const collectFailedFileNames = (response: CopyApiResponse | undefined): string[] => {
	if (!response) return [];

	const childFileNames = (response.elements ?? []).flatMap((element) => collectFailedFileNames(element));

	const isFailedFile = response.type === CopyElementType.FILE && response.status === CopyStatusEnum.FAILURE;
	if (isFailedFile && response.title) {
		return [response.title, ...childFileNames];
	}

	return childFileNames;
};

export const useCopyFlow = () => {
	const { t } = useI18n();
	const { execute } = useSafeAxiosTask();
	const { notifyFailedFiles } = useFailedFilesNotifier();

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
		if (!error || !isAxiosError(error)) return false;

		if (error.response?.status === 504) {
			return true;
		}

		// Fallback for payload-driven API errors when HTTP status is not available.
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

	const executeCopyRequest = async <T extends CopyApiResponse>(
		type: ContentItemTypeEnum,
		request: () => Promise<{ data: T }>
	): Promise<{ result: T | undefined; success: boolean; error: Error | undefined }> => {
		const { result, success, error } = await withCopyLoading(() =>
			execute(request, getCopyFailedMessage(type), { skipErrorNotification: isCopyInProgress })
		);

		if (success) {
			const failedFileNames = collectFailedFileNames(result?.data);
			if (failedFileNames.length > 0) {
				notifyFailedFiles(`feature-copy.copyInfo.type.${type}`, failedFileNames);
			} else {
				notifyCopySuccess(type);
			}
			return { result: result?.data, success: true, error: undefined };
		}

		if (isCopyInProgress(error)) {
			notifyCopyInProgress(type);
			return { result: undefined, success: false, error: copyInProgressError() };
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
