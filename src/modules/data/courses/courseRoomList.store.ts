import {
	CourseMetadataResponse,
	CoursesApiFactory,
	DashboardApiFactory,
	DashboardGridElementResponse,
} from "@/generated/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { AllItems, DroppedObject, RoomsData, SharingCourseObject } from "@/store/types/rooms";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { isInPast } from "@/utils/date-time.utils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCourseRoomListStore = defineStore("courseRoomListStore", () => {
	// State
	const roomsData = ref<DashboardGridElementResponse[]>([]);
	const gridElementsId = ref("");
	const allElements = ref<CourseMetadataResponse[]>([]);
	const sharedCourseData = ref<SharingCourseObject>({
		code: "",
		courseName: "",
		status: "",
		message: "",
	});
	const importedCourseId = ref("");
	const loading = ref(false);
	const error = ref<null | object>(null);
	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
		error: {},
	});

	// API instances
	const dashboardApi = DashboardApiFactory(undefined, "/v3", $axios);
	const coursesApi = CoursesApiFactory(undefined, "/v3", $axios);

	// Internal helpers
	function processRoomData(data: DashboardGridElementResponse[]): DashboardGridElementResponse[] {
		return data.map((item) => {
			let to = "";
			if (item.groupElements) {
				item.groupElements = item.groupElements.map((groupItem) => {
					if (groupItem.id) {
						to = `/rooms/${groupItem.id}`;
					}
					return { ...groupItem, to };
				});
			}
			if (item.id) {
				to = `/rooms/${item.id}`;
			}
			return { ...item, to };
		});
	}

	function processAllElements(data: CourseMetadataResponse[]) {
		return data.map((item: CourseMetadataResponse) => {
			let to = null;
			if (item.id) {
				to = `/rooms/${item.id}`;
			}
			const isArchived = item.untilDate && isInPast(item.untilDate);
			if (!isArchived) {
				return { ...item, searchText: item.title, isArchived, to };
			}

			const startDate = item.startDate ? item.startDate.substring(0, 4) : "";
			const untilDate = item.untilDate ? item.untilDate.substring(0, 4) : "";
			const shortenedUntilDate = untilDate.substring(2, 4);
			const difference = Number(untilDate) - Number(startDate);

			let titleDate = untilDate;
			if (difference !== 0) {
				const symbol = difference > 1 ? "-" : "/";
				titleDate = `${startDate}${symbol}${symbol === "/" ? shortenedUntilDate : untilDate}`;
			}

			return {
				...item,
				titleDate: titleDate,
				searchText: `${item.title} ${titleDate}`,
				isArchived,
				to,
			};
		});
	}

	// Setters (internal mutations)
	const setRoomData = (data: DashboardGridElementResponse[]): void => {
		roomsData.value = processRoomData(data);
	};

	const setAllElements = (data: CourseMetadataResponse[]): void => {
		allElements.value = processAllElements(data);
	};

	const setRoomDataId = (id: string): void => {
		gridElementsId.value = id;
	};

	const setLoading = (value: boolean): void => {
		loading.value = value;
	};

	const setError = (err: object): void => {
		error.value = err;
	};

	const setPosition = (droppedComponent: DroppedObject): void => {
		const { to } = droppedComponent;
		const itemToBeChanged = roomsData.value.find((item) => item.id === droppedComponent.item.id);

		if (itemToBeChanged) {
			itemToBeChanged.xPosition = to.x;
			itemToBeChanged.yPosition = to.y;
		}
	};

	const setSharedCourseData = (status: SharingCourseObject): void => {
		sharedCourseData.value = status;
	};

	const setImportedCourseId = (id: string): void => {
		importedCourseId.value = id;
	};

	const setBusinessError = (err: BusinessError): void => {
		businessError.value = err;
	};

	const resetBusinessError = (): void => {
		businessError.value = {
			statusCode: "",
			message: "",
			error: {},
		};
	};

	// Getters
	const getRoomsData = computed<Array<RoomsData>>(() => roomsData.value as Array<RoomsData>);
	const getAllElements = computed<AllItems>(() => allElements.value as AllItems);
	const getLoading = computed<boolean>(() => loading.value);
	const getError = computed<object | null>(() => error.value);
	const getRoomsId = computed<string>(() => gridElementsId.value);
	const getCourseSharingStatus = computed<object>(() => sharedCourseData.value);
	const getImportedCourseId = computed<string>(() => importedCourseId.value);
	const getBusinessError = computed(() => businessError.value);
	const hasRooms = computed<boolean>(() => allElements.value.length > 0);
	const hasCurrentRooms = computed<boolean>(() => roomsData.value.length > 0);

	// Actions
	const fetch = async (params?: { indicateLoading: boolean; device: string }): Promise<void> => {
		// device parameter will be used to fetch data specified for device
		const indicateLoading = params?.indicateLoading === undefined ? true : params.indicateLoading;
		if (indicateLoading) setLoading(true);
		try {
			const { data } = await dashboardApi.dashboardControllerFindForUser();
			setRoomDataId(data.id || "");
			setRoomData(data.gridElements || []);
			if (indicateLoading) setLoading(false);
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
			if (indicateLoading) setLoading(false);
		}
	};

	const align = async (payload: DroppedObject): Promise<void> => {
		const { from, to } = payload;
		const reqObject = {
			from,
			to,
		};

		setLoading(true);
		try {
			const response = await dashboardApi.dashboardControllerMoveElement(getRoomsId.value, reqObject);

			setPosition(payload);
			setRoomData(response.data.gridElements);
			setLoading(false);
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
			setLoading(false);
		}
	};

	const update = async (payload: RoomsData): Promise<void> => {
		setLoading(true);
		try {
			await dashboardApi.dashboardControllerPatchGroup(getRoomsId.value, payload.xPosition, payload.yPosition, {
				title: payload.title,
			});
			const roomIndex = roomsData.value.findIndex(
				(room) => room.xPosition === payload.xPosition && room.yPosition === payload.yPosition
			);
			const updatedRoomsData = [...roomsData.value];
			updatedRoomsData[roomIndex] = {
				...roomsData.value[roomIndex],
				title: payload.title,
			};
			setRoomData(updatedRoomsData);
			setLoading(false);
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
			setLoading(false);
		}
	};

	const deleteRoom = async (id: string): Promise<void> => {
		setLoading(true);
		try {
			// TODO: delete call to to server
			const tempData = roomsData.value.filter((item) => item.id !== id);
			setRoomData(tempData);
			setLoading(false);
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
			setLoading(false);
		}
	};

	const fetchAllElements = async (): Promise<void> => {
		setLoading(true);
		try {
			const { data } = await coursesApi.courseControllerFindForUser(0, 100);

			setAllElements(data.data);
			setLoading(false);
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
			setLoading(false);
		}
	};

	const confirmSharedCourseData = async (courseData: SharingCourseObject): Promise<void> => {
		resetBusinessError();
		try {
			const importedCourseResponse = (
				await $axios.post("/v1/courses-share", {
					shareToken: courseData.code,
					courseName: courseData.courseName,
				})
			).data;
			setImportedCourseId(importedCourseResponse.id || "");
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	};

	return {
		// State
		roomsData,
		gridElementsId,
		allElements,
		sharedCourseData,
		importedCourseId,
		loading,
		error,
		businessError,

		// Setters
		setRoomData,
		setAllElements,
		setRoomDataId,
		setLoading,
		setError,
		setPosition,
		setSharedCourseData,
		setImportedCourseId,
		setBusinessError,
		resetBusinessError,

		// Getters
		getRoomsData,
		getAllElements,
		getLoading,
		getError,
		getRoomsId,
		getCourseSharingStatus,
		getImportedCourseId,
		getBusinessError,
		hasRooms,
		hasCurrentRooms,

		// Actions
		fetch,
		align,
		update,
		delete: deleteRoom,
		fetchAllElements,
		confirmSharedCourseData,
	};
});
