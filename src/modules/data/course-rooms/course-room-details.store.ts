import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { Course } from "@/types/course-room/room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	BoardApiFactory,
	CourseRoomsApiFactory,
	CreateBoardBodyParams,
	CreateBoardResponse,
	LessonApiFactory,
	PatchOrderParams,
	PatchVisibilityParams,
	SingleColumnBoardResponse,
	TaskApiFactory,
} from "@api-server";
import { notifyError, useAppStore } from "@data-app";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCourseRoomDetailsStore = defineStore("courseRoomDetailsStore", () => {
	const { t } = useI18nGlobal();

	const roomData = ref<SingleColumnBoardResponse>({
		roomId: "",
		title: "",
		displayColor: "",
		elements: [],
		isArchived: false,
		isSynchronized: false,
	});

	const isLocked = ref(false);
	const scopePermissions = ref<string[]>([]);
	const courseShareToken = ref("");

	const getRoomsApi = () => CourseRoomsApiFactory(undefined, "/v3", $axios);
	const getLessonApi = () => LessonApiFactory(undefined, "/v3", $axios);
	const getTaskApi = () => TaskApiFactory(undefined, "/v3", $axios);
	const getBoardApi = () => BoardApiFactory(undefined, "/v3", $axios);

	const fetchCourseCall = useSafeAxiosTask();
	const fetchContentCall = useSafeAxiosTask();
	const publishCardCall = useSafeAxiosTask();
	const sortElementsCall = useSafeAxiosTask();
	const deleteLessonCall = useSafeAxiosTask();
	const deleteTaskCall = useSafeAxiosTask();
	const deleteBoardCall = useSafeAxiosTask();
	const createBoardCall = useSafeAxiosTask();
	const finishTaskCall = useSafeAxiosTask();
	const fetchScopePermissionCall = useSafeAxiosTask();

	const loading = computed(() =>
		[
			fetchCourseCall,
			fetchContentCall,
			publishCardCall,
			sortElementsCall,
			deleteLessonCall,
			deleteTaskCall,
			deleteBoardCall,
			createBoardCall,
			finishTaskCall,
			fetchScopePermissionCall,
		].some((task) => task.isRunning.value)
	);

	const finishedLoading = computed(() => loading.value === false);
	const roomIsEmpty = computed(() => finishedLoading.value && roomData.value.elements.length === 0);
	const roomId = computed(() => roomData.value.roomId);

	const fetchCourse = async (courseId: string): Promise<Course | null> => {
		const { result } = await fetchCourseCall.execute(async () => {
			const response = await $axios.get(`/v1/courses/${courseId}`);
			return response.data;
		}, t("pages.courseRooms.fetchCourseContent.error"));

		return result || null;
	};

	const fetchContent = async (id: string) => {
		isLocked.value = false;

		const {
			result,
			success,
			error: taskError,
		} = await fetchContentCall.execute(async () => {
			const response = await getRoomsApi().courseRoomsControllerGetRoomBoard(id);
			return response.data;
		});

		if (success && result) {
			roomData.value = result;
		} else if (taskError) {
			const apiError = mapAxiosErrorToResponseError(taskError);

			if (apiError.type === "LOCKED_COURSE") {
				roomData.value = {
					...roomData.value,
				};
				isLocked.value = true;
			} else if (apiError.code === 404) {
				useAppStore().handleApplicationError(apiError.code);
			} else {
				notifyError(t("pages.courseRooms.fetchCourseContent.error"));
			}
		}
	};

	const publishCard = async (elementId: string, visibility: boolean): Promise<void> => {
		const visibilityParam: PatchVisibilityParams = { visibility };

		const { success } = await publishCardCall.execute(
			() =>
				getRoomsApi().courseRoomsControllerPatchElementVisibility(roomData.value.roomId, elementId, visibilityParam),
			t("pages.courseRooms.publishCard.error")
		);

		if (success) {
			await fetchContent(roomData.value.roomId);
		}
	};

	const sortElements = async (params: PatchOrderParams): Promise<void> => {
		await sortElementsCall.execute(
			() => getRoomsApi().courseRoomsControllerPatchOrderingOfElements(roomData.value.roomId, params),
			t("pages.courseRooms.sortElements.error")
		);
		await fetchContent(roomData.value.roomId);
	};

	const deleteLesson = async (lessonId: string): Promise<void> => {
		await deleteLessonCall.execute(
			() => getLessonApi().lessonControllerDelete(lessonId),
			t("pages.courseRooms.deleteLesson.error")
		);
	};

	const deleteTask = async (taskId: string): Promise<void> => {
		await deleteTaskCall.execute(
			() => getTaskApi().taskControllerDelete(taskId),
			t("pages.courseRooms.deleteTask.error")
		);
	};

	const deleteBoard = async (boardId: string): Promise<void> => {
		await deleteBoardCall.execute(
			() => getBoardApi().boardControllerDeleteBoard(boardId),
			t("pages.courseRooms.deleteBoard.error")
		);
	};

	const createBoard = async (params: CreateBoardBodyParams): Promise<CreateBoardResponse | undefined> => {
		const { result, success } = await createBoardCall.execute(
			() => getBoardApi().boardControllerCreateBoard(params),
			t("pages.courseRooms.createBoard.error")
		);

		return success && result ? result?.data : undefined;
	};

	const finishTask = async (itemId: string, action: "finish" | "restore"): Promise<void> => {
		if (action === "finish") {
			await finishTaskCall.execute(
				() => getTaskApi().taskControllerFinish(itemId),
				t("pages.courseRooms.finishTask.error")
			);
		} else if (action === "restore") {
			await finishTaskCall.execute(
				() => getTaskApi().taskControllerRestore(itemId),
				t("pages.courseRooms.restoreTask.error")
			);
		}

		await fetchContent(roomData.value.roomId);
	};

	const fetchScopePermission = async (courseId: string, userId: string): Promise<void> => {
		const { result } = await fetchScopePermissionCall.execute(
			() => $axios.get(`/v3/courses/${courseId}/user-permissions`),
			t("pages.courseRooms.fetchCourseContent.error")
		);

		if (result?.data[userId]) {
			scopePermissions.value = result.data[userId];
		}
	};

	return {
		courseShareToken,
		createBoard,
		deleteBoard,
		deleteLesson,
		deleteTask,
		fetchContent,
		fetchCourse,
		fetchScopePermission,
		finishTask,
		finishedLoading,
		isLocked,
		loading,
		publishCard,
		roomData,
		roomId,
		roomIsEmpty,
		scopePermissions,
		sortElements,
	};
});
