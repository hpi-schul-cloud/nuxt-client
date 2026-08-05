import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { $axios } from "@/utils/api";
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

	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withGlobalLoadingState(fn, t("feature-copy.inProgress.title.loading"));

	const notifyCopySuccess = (type: ContentItemTypeEnum) => {
		notifySuccess(
			t("feature-copy.notifications.success.successfullyCopied", { type: t(`feature-copy.copyInfo.type.${type}`) })
		);
	};

	const executeCopyCourse = async (courseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Course });
		if (!completed) return { success: false, error: copyCancelledError() };

		const { result, success, error } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyCourse(courseId),
				t("common.notifications.errors.notDuplicated", { type: t("feature-copy.copyInfo.type.course") })
			)
		);

		if (success) {
			notifyCopySuccess(ContentItemTypeEnum.Course);
		}

		return { result: result?.data, success, error };
	};

	const executeCopyTask = async (taskId: string, targetCourseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Task });
		if (!completed) return { success: false, error: copyCancelledError() };

		const { result, success, error } = await withCopyLoading(() =>
			execute(
				() => taskApi.taskControllerCopyTask(taskId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("feature-copy.copyInfo.type.task") })
			)
		);

		if (success) {
			notifyCopySuccess(ContentItemTypeEnum.Task);
		}

		return { result: result?.data, success, error };
	};

	const executeCopyLesson = async (lessonId: string, targetCourseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Lesson });
		if (!completed) return { success: false, error: copyCancelledError() };

		const { result, success, error } = await withCopyLoading(() =>
			execute(
				() => courseRoomApi.courseRoomsControllerCopyLesson(lessonId, { courseId: targetCourseId }),
				t("common.notifications.errors.notDuplicated", { type: t("feature-copy.copyInfo.type.lesson") })
			)
		);

		if (success) {
			notifyCopySuccess(ContentItemTypeEnum.Lesson);
		}

		return { result: result?.data, success, error };
	};

	const executeCopyBoard = async (boardId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.ColumnBoard });
		if (!completed) return { success: false, error: copyCancelledError() };

		const { result, success, error } = await withCopyLoading(() =>
			execute(
				() => boardApi.boardControllerCopyBoard(boardId),
				t("common.notifications.errors.notDuplicated", { type: t("feature-copy.copyInfo.type.board") })
			)
		);

		if (success) {
			notifyCopySuccess(ContentItemTypeEnum.ColumnBoard);
		}

		return { result: result?.data, success, error };
	};

	const executeCopyRoom = async (roomId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Room });
		if (!completed) return { success: false, error: copyCancelledError() };

		const res = await withCopyLoading(() => roomApi.roomControllerCopyRoom(roomId));

		if (res.status === 200) {
			notifyCopySuccess(ContentItemTypeEnum.Room);
			return { result: res.data, success: true, error: undefined };
		}

		// if the gateway times out that usually means the copy process takes a long time,
		// so we can assume that the copy process is still running and will complete eventually
		// since we do not know the id of the new room yet, we cannot navigate to it, but we can inform the user that the copy process is still in progress
		if (res.status === 504) {
			notifyWarning(
				t("feature-copy.notifications.duplicationInProgress", { type: t("feature-copy.copyInfo.type.room") })
			);
			return { result: undefined, success: true, error: new Error("Room copy is still in progress") };
		}

		return { result: undefined, success: false, error: new Error("Room copy failed") };
	};

	return {
		executeCopyCourse,
		executeCopyTask,
		executeCopyLesson,
		executeCopyBoard,
		executeCopyRoom,
	};
};
