import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { $axios } from "@/utils/api";
import { BoardApiFactory, CourseRoomsApiFactory, RoomApiFactory, TaskApiFactory } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { openDialog } from "@feature-dialog";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	const { t } = useI18n();
	const { withLoadingState } = useLoadingStore();
	const { execute } = useSafeAxiosTask();

	const courseRoomApi = CourseRoomsApiFactory(undefined, "/v3", $axios);
	const taskApi = TaskApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);

	const copyCancelledError = () => new Error("Copy cancelled");

	const withCopyLoading = <T>(fn: () => Promise<T>) => withLoadingState(fn, t("feature-copy.inProgress.title.loading"));

	const notifyCopySuccess = (type: ContentItemTypeEnum) => {
		notifySuccess(
			t("feature-copy.notifications.success.successfullyCopied", { type: t(`feature-copy.copyInfo.type.${type}`) })
		);
	};

	const executeCopyCourse = async (courseId: string) => {
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Course }).result;
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
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Task }).result;
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
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Lesson }).result;
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
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.ColumnBoard }).result;
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
		const { completed } = await openDialog("copy", { copyItemType: ContentItemTypeEnum.Room }).result;
		if (!completed) return { success: false, error: copyCancelledError() };

		const { result, success, error } = await withCopyLoading(() =>
			execute(
				() => roomApi.roomControllerCopyRoom(roomId),
				t("common.notifications.errors.notDuplicated", { type: t("feature-copy.copyInfo.type.room") })
			)
		);

		if (success) {
			notifyCopySuccess(ContentItemTypeEnum.Room);
		}

		return { result: result?.data, success, error };
	};

	return {
		executeCopyCourse,
		executeCopyTask,
		executeCopyLesson,
		executeCopyBoard,
		executeCopyRoom,
	};
};
