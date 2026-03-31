import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import {
	CourseMetadataResponse,
	CoursesApiFactory,
	DashboardApiFactory,
	DashboardGridElementResponse,
} from "@/generated/serverApi/v3";
import { DroppedObject, RoomsData } from "@/store/types/rooms";
import { $axios } from "@/utils/api";
import { isInPast } from "@/utils/date-time.utils";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCourseRoomListStore = defineStore("courseRoomListStore", () => {
	const roomsData = ref<DashboardGridElementResponse[]>([]);
	const gridElementsId = ref("");
	const allElements = ref<CourseMetadataResponse[]>([]);

	const fetchCall = useSafeAxiosTask();
	const fetchAllElementsCall = useSafeAxiosTask();
	const alignElementCall = useSafeAxiosTask();
	const updateElementCall = useSafeAxiosTask();

	const loading = computed(() =>
		[fetchCall, fetchAllElementsCall, alignElementCall, updateElementCall].some((task) => task.isRunning.value)
	);

	const dashboardApi = DashboardApiFactory(undefined, "/v3", $axios);
	const coursesApi = CoursesApiFactory(undefined, "/v3", $axios);

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
				titleDate,
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

	const hasRooms = computed<boolean>(() => allElements.value.length > 0);
	const hasCurrentRooms = computed<boolean>(() => roomsData.value.length > 0);

	const fetchCourses = async (): Promise<void> => {
		const { success, result } = await fetchCall.execute(() => dashboardApi.dashboardControllerFindForUser());

		if (success && result) {
			gridElementsId.value = result.data.id;
			roomsData.value = processRoomData(result.data.gridElements || []);
		}
	};

	const alignCourse = async (payload: DroppedObject): Promise<void> => {
		const { from, to } = payload;
		const reqObject = { from, to };

		const { success, result } = await alignElementCall.execute(() =>
			dashboardApi.dashboardControllerMoveElement(gridElementsId.value, reqObject)
		);

		if (success && result) {
			setPosition(payload);
			roomsData.value = processRoomData(result.data.gridElements || []);
		}
	};

	const updateCourse = async (payload: RoomsData): Promise<void> => {
		const { success } = await updateElementCall.execute(() =>
			dashboardApi.dashboardControllerPatchGroup(gridElementsId.value, payload.xPosition, payload.yPosition, {
				title: payload.title,
			})
		);

		if (success) {
			const roomIndex = roomsData.value.findIndex(
				(room) => room.xPosition === payload.xPosition && room.yPosition === payload.yPosition
			);
			const updatedRoomsData = [...roomsData.value];
			updatedRoomsData[roomIndex] = {
				...roomsData.value[roomIndex],
				title: payload.title,
			};
			roomsData.value = updatedRoomsData;
		}
	};

	const deleteRoom = (id: string): void => {
		roomsData.value = roomsData.value.filter((item) => item.id !== id);
	};

	const fetchAllElements = async (): Promise<void> => {
		const { success, result } = await fetchAllElementsCall.execute(() =>
			coursesApi.courseControllerFindForUser(0, 100)
		);

		if (success && result) {
			allElements.value = processAllElements(result.data.data);
		}
	};

	return {
		roomsData,
		gridElementsId,
		allElements,
		loading,
		hasRooms,
		hasCurrentRooms,
		fetchCourses,
		alignCourse,
		updateCourse,
		delete: deleteRoom,
		fetchAllElements,
	};
});
