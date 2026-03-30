import {
	CourseMetadataResponse,
	CoursesApiFactory,
	DashboardApiFactory,
	DashboardGridElementResponse,
} from "@/generated/serverApi/v3";
import { DroppedObject, RoomsData, SharingCourseObject } from "@/store/types/rooms";
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

	// API instances
	const dashboardApi = DashboardApiFactory(undefined, "/v3", $axios);
	const coursesApi = CoursesApiFactory(undefined, "/v3", $axios);

	// Internal helpers
	const processRoomData = (data: DashboardGridElementResponse[]): DashboardGridElementResponse[] =>
		data.map((item) => {
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

	const processAllElements = (data: CourseMetadataResponse[]) =>
		data.map((item: CourseMetadataResponse) => {
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

	const setPosition = (droppedComponent: DroppedObject): void => {
		const { to } = droppedComponent;
		const itemToBeChanged = roomsData.value.find((item) => item.id === droppedComponent.item.id);

		if (itemToBeChanged) {
			itemToBeChanged.xPosition = to.x;
			itemToBeChanged.yPosition = to.y;
		}
	};

	// Getters

	const getRoomsId = computed<string>(() => gridElementsId.value);

	const hasRooms = computed<boolean>(() => allElements.value.length > 0);
	const hasCurrentRooms = computed<boolean>(() => roomsData.value.length > 0);

	// Actions
	const fetch = async (params?: { indicateLoading: boolean; device: string }): Promise<void> => {
		// device parameter will be used to fetch data specified for device
		const indicateLoading = params?.indicateLoading === undefined ? true : params.indicateLoading;
		if (indicateLoading) loading.value = true;
		try {
			const { data } = await dashboardApi.dashboardControllerFindForUser();
			gridElementsId.value = data.id;
			roomsData.value = processRoomData(data.gridElements || []);
			if (indicateLoading) loading.value = false;
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			if (indicateLoading) loading.value = false;
		}
	};

	const align = async (payload: DroppedObject): Promise<void> => {
		const { from, to } = payload;
		const reqObject = {
			from,
			to,
		};

		loading.value = true;
		try {
			const response = await dashboardApi.dashboardControllerMoveElement(getRoomsId.value, reqObject);

			setPosition(payload);
			roomsData.value = processRoomData(response.data.gridElements || []);
			loading.value = false;
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			loading.value = false;
		}
	};

	const update = async (payload: RoomsData): Promise<void> => {
		loading.value = true;
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
			roomsData.value = updatedRoomsData;
			loading.value = false;
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			loading.value = false;
		}
	};

	const deleteRoom = async (id: string): Promise<void> => {
		loading.value = true;
		try {
			const tempData = roomsData.value.filter((item) => item.id !== id);
			roomsData.value = tempData;
			loading.value = false;
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			loading.value = false;
		}
	};

	const fetchAllElements = async (): Promise<void> => {
		loading.value = true;
		try {
			const { data } = await coursesApi.courseControllerFindForUser(0, 100);

			allElements.value = processAllElements(data.data);
			loading.value = false;
		} catch (err: unknown) {
			const apiError = mapAxiosErrorToResponseError(err);

			loading.value = false;
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

		// Getters
		hasRooms,
		hasCurrentRooms,

		// Actions
		fetch,
		align,
		update,
		delete: deleteRoom,
		fetchAllElements,
	};
});
