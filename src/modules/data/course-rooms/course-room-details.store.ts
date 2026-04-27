import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { BusinessError } from "@/store/types/commons";
import { Course } from "@/store/types/room";
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
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCourseRoomDetailsStore = defineStore("courseRoomDetailsStore", () => {
	// State
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
	const loading = ref(false);
	const error = ref<unknown>(null);
	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
		error: {},
	});
	const courseShareToken = ref("");

	// API getters (to allow for proper mocking in tests)
	const getRoomsApi = () => CourseRoomsApiFactory(undefined, "/v3", $axios);
	const getLessonApi = () => LessonApiFactory(undefined, "/v3", $axios);
	const getTaskApi = () => TaskApiFactory(undefined, "/v3", $axios);
	const getBoardApi = () => BoardApiFactory(undefined, "/v3", $axios);

	const { execute } = useSafeAxiosTask();

	const finishedLoading = computed(() => loading.value === false);
	const roomIsEmpty = computed(() => finishedLoading.value && roomData.value.elements.length === 0);
	const roomId = computed(() => roomData.value.roomId);

	const fetchCourse = async (courseId: string): Promise<Course | null> => {
		const { result } = await execute(async () => {
			const response = await $axios.get(`/v1/courses/${courseId}`);
			return response.data;
		});

		return result || null;
	};

	const fetchContent = async (id: string) => {
		loading.value = true;
		isLocked.value = false;

		const {
			result,
			success,
			error: taskError,
		} = await execute(async () => {
			const response = await getRoomsApi().courseRoomsControllerGetRoomBoard(id);
			return response.data;
		});

		if (success && result) {
			roomData.value = result;
		} else if (taskError) {
			// Handle locked course special case
			if (taskError.message?.includes("LOCKED_COURSE")) {
				roomData.value = {
					...roomData.value,
					title: taskError.message,
				};
				isLocked.value = true;
			} else {
				error.value = taskError;
			}
		}

		loading.value = false;
	};

	const publishCard = async (elementId: string, visibility: boolean): Promise<void> => {
		loading.value = true;

		const visibilityParam: PatchVisibilityParams = { visibility };

		const { success } = await execute(async () => {
			await getRoomsApi().courseRoomsControllerPatchElementVisibility(
				roomData.value.roomId,
				elementId,
				visibilityParam
			);
		});

		if (success) {
			await fetchContent(roomData.value.roomId);
		}

		loading.value = false;
	};

	const sortElements = async (params: PatchOrderParams): Promise<void> => {
		loading.value = true;
		resetBusinessError();

		try {
			await getRoomsApi().courseRoomsControllerPatchOrderingOfElements(roomData.value.roomId, params);
			await fetchContent(roomData.value.roomId);
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		loading.value = false;
	};

	const deleteLesson = async (lessonId: string): Promise<void> => {
		resetBusinessError();

		try {
			await getLessonApi().lessonControllerDelete(lessonId);
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	};

	const deleteTask = async (taskId: string): Promise<void> => {
		resetBusinessError();

		try {
			await getTaskApi().taskControllerDelete(taskId);
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	};

	const deleteBoard = async (boardId: string): Promise<void> => {
		resetBusinessError();

		try {
			await getBoardApi().boardControllerDeleteBoard(boardId);
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	};

	const createBoard = async (params: CreateBoardBodyParams): Promise<CreateBoardResponse | undefined> => {
		resetBusinessError();

		try {
			const response = await getBoardApi().boardControllerCreateBoard(params);
			return response.data;
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}

		return undefined;
	};

	const downloadCommonCartridgeCourse = async (exportSettings: {
		version: "1.1.0" | "1.3.0";
		topics: string[];
		tasks: string[];
		columnBoards: string[];
	}): Promise<void> => {
		const form = document.createElement("form");
		form.method = "POST";
		form.action = `/api/v3/common-cartridge/export/${roomData.value.roomId}?version=${exportSettings.version}`;
		form.enctype = "application/json";
		form.target = "_blank";

		const topicIdsInput = document.createElement("input");
		topicIdsInput.type = "hidden";
		topicIdsInput.name = "topics";
		topicIdsInput.value = JSON.stringify(exportSettings.topics);
		form.appendChild(topicIdsInput);

		const taskIdsInput = document.createElement("input");
		taskIdsInput.type = "hidden";
		taskIdsInput.name = "tasks";
		taskIdsInput.value = JSON.stringify(exportSettings.tasks);
		form.appendChild(taskIdsInput);

		const columnBoardIdsInput = document.createElement("input");
		columnBoardIdsInput.type = "hidden";
		columnBoardIdsInput.name = "columnBoards";
		columnBoardIdsInput.value = JSON.stringify(exportSettings.columnBoards);
		form.appendChild(columnBoardIdsInput);

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};

	const finishTask = async (itemId: string, action: "finish" | "restore"): Promise<void> => {
		resetBusinessError();

		try {
			if (action === "finish") {
				await getTaskApi().taskControllerFinish(itemId);
			} else if (action === "restore") {
				await getTaskApi().taskControllerRestore(itemId);
			}
			await fetchContent(roomData.value.roomId);
		} catch (taskError: unknown) {
			const apiError = mapAxiosErrorToResponseError(taskError);
			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	};

	const fetchScopePermission = async (courseId: string, userId: string): Promise<void> => {
		const { result } = await execute(() => $axios.get(`/v3/courses/${courseId}/user-permissions`));

		if (result && result.data[userId]) {
			scopePermissions.value = result.data[userId];
		}
	};

	const setRoomData = (payload: SingleColumnBoardResponse) => {
		roomData.value = payload;
	};

	const setLocked = (locked: boolean) => {
		isLocked.value = locked;
	};

	const setPermissionData = (payload: string[]) => {
		scopePermissions.value = payload;
	};

	const setLoading = (loadingState: boolean) => {
		loading.value = loadingState;
	};

	const setError = (errorValue: unknown) => {
		error.value = errorValue;
	};

	const setBusinessError = (businessErrorValue: BusinessError) => {
		businessError.value = businessErrorValue;
	};

	const resetBusinessError = () => {
		businessError.value = {
			statusCode: "",
			message: "",
			error: {},
		};
	};

	const setCourseShareToken = (token: string) => {
		courseShareToken.value = token;
	};

	const resetState = () => {
		roomData.value = {
			roomId: "",
			title: "",
			displayColor: "",
			elements: [],
			isArchived: false,
			isSynchronized: false,
		};
		isLocked.value = false;
		scopePermissions.value = [];
		loading.value = false;
		error.value = null;
		resetBusinessError();
		courseShareToken.value = "";
	};

	return {
		// State
		roomData,
		isLocked,
		scopePermissions,
		loading,
		error,
		businessError,
		courseShareToken,

		// Computed
		finishedLoading,
		roomIsEmpty,
		roomId,

		// Actions
		fetchCourse,
		fetchContent,
		publishCard,
		sortElements,
		deleteLesson,
		deleteTask,
		deleteBoard,
		createBoard,
		downloadCommonCartridgeCourse,
		finishTask,
		fetchScopePermission,

		// Mutations/Helpers
		setRoomData,
		setLocked,
		setPermissionData,
		setLoading,
		setError,
		setBusinessError,
		resetBusinessError,
		setCourseShareToken,
		resetState,
	};
});
