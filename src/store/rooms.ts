import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CourseMetadataResponse,
	CoursesApiFactory,
	CoursesApiInterface,
	DashboardApiFactory,
	DashboardApiInterface,
	DashboardGridElementResponse,
} from "../serverApi/v3/api";
import { $axios } from "../utils/api";

import { currentDate, fromUTC } from "@/plugins/datetime";
import { BusinessError } from "./types/commons";
import {
	AllItems,
	DroppedObject,
	RoomsData,
	SharingCourseObject,
} from "./types/rooms";
import { notifierModule } from "@/store";

@Module({
	name: "roomsModule",
	namespaced: true,
	stateFactory: true,
})
export default class RoomsModule extends VuexModule {
	roomsData: DashboardGridElementResponse[] = [];
	gridElementsId = "";
	allElements: CourseMetadataResponse[] = [];
	sharedCourseData: SharingCourseObject = {
		code: "",
		courseName: "",
		status: "",
		message: "",
	};
	importedCourseId = "";

	loading = false;
	error: null | {} = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};
	alignedSuccessfully = false;

	@Mutation
	setRoomData(data: DashboardGridElementResponse[]): void {
		this.roomsData = data.map((item) => {
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

	@Mutation
	setAllElements(data: CourseMetadataResponse[]): void {
		this.allElements = data.map((item: CourseMetadataResponse) => {
			let to = null;
			if (item.id) {
				to = `/rooms/${item.id}`;
			}
			const isArchived =
				item.untilDate && fromUTC(item.untilDate || "") < currentDate();
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
				titleDate = `${startDate}${symbol}${
					symbol == "/" ? shortenedUntilDate : untilDate
				}`;
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

	@Mutation
	setRoomDataId(id: string): void {
		this.gridElementsId = id;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: {}): void {
		this.error = error;
	}

	@Mutation
	setPosition(droppedComponent: DroppedObject | any): void {
		const { to } = droppedComponent;
		const itemToBeChanged = this.roomsData.find(
			(item) => item.id == droppedComponent.item.id
		);

		if (itemToBeChanged) {
			itemToBeChanged.xPosition = to.x;
			itemToBeChanged.yPosition = to.y;
		}
	}

	@Mutation
	setSharedCourseData(status: SharingCourseObject): void {
		this.sharedCourseData = status;
	}

	@Mutation
	setImportedCourseId(importedCourseId: string): void {
		this.importedCourseId = importedCourseId;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
			error: {},
		};
	}

	@Mutation
	setAlignedSuccessfully(success: boolean): void {
		this.alignedSuccessfully = success;
	}

	get getRoomsData(): Array<RoomsData> {
		return this.roomsData;
	}

	get getAllElements(): AllItems {
		return this.allElements;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	get getRoomsId(): string {
		return this.gridElementsId;
	}

	get getCourseSharingStatus(): object {
		return this.sharedCourseData;
	}

	get getImportedCourseId(): string {
		return this.importedCourseId;
	}

	get getBusinessError() {
		return this.businessError;
	}

	get hasRooms(): boolean {
		return this.allElements.length > 0;
	}

	get hasCurrentRooms(): boolean {
		return this.roomsData.length > 0;
	}

	get isAlignedSuccessfully(): boolean {
		return this.alignedSuccessfully;
	}

	private get dashboardApi(): DashboardApiInterface {
		return DashboardApiFactory(undefined, "/v3", $axios);
	}

	private get coursesApi(): CoursesApiInterface {
		return CoursesApiFactory(undefined, "/v3", $axios);
	}

	@Action
	async fetch(params?: {
		indicateLoading: boolean;
		device: string;
		showSubstitute: boolean;
	}): Promise<void> {
		// device parameter will be used to fetch data specified for device
		const indicateLoading =
			params?.indicateLoading === undefined ? true : params.indicateLoading;
		if (indicateLoading) this.setLoading(true);
		try {
			const { data } = await this.dashboardApi.dashboardControllerFindForUser(
				params?.showSubstitute,
				undefined
			);
			this.setRoomDataId(data.id || "");
			this.setRoomData(data.gridElements || []);
			if (indicateLoading) this.setLoading(false);
		} catch (error: any) {
			console.log(error);
			this.setError(error);
			if (indicateLoading) this.setLoading(false);
		}
	}

	@Action
	async align(payload: DroppedObject): Promise<void> {
		const { from, to } = payload;
		const reqObject = {
			from,
			to,
		};

		this.setLoading(true);
		this.setAlignedSuccessfully(true);
		try {
			const response = await this.dashboardApi.dashboardControllerMoveElement(
				this.getRoomsId,
				reqObject
			);

			this.setPosition(payload);
			this.setRoomData(response.data.gridElements);
			this.setLoading(false);
		} catch (error: any) {
			if (
				error.response.data.code === 400 &&
				error.response.data.message === "substitute courses cannot be arranged"
			) {
				notifierModule?.show({
					text: "pages.courses.index.courses.cannotArrangeSubstitute",
					status: "info",
					timeout: 10000,
					position: "bottom",
				});
				this.setLoading(false);
				this.setAlignedSuccessfully(false);
				return;
			}
			this.setError(error);
			this.setLoading(false);
			this.setAlignedSuccessfully(false);
		}
	}

	@Action
	async update(payload: RoomsData): Promise<void> {
		this.setLoading(true);
		try {
			const response = await this.dashboardApi.dashboardControllerPatchGroup(
				this.getRoomsId,
				payload.xPosition,
				payload.yPosition,
				{ title: payload.title }
			);
			const roomIndex = this.roomsData.findIndex(
				(room) =>
					room.xPosition === payload.xPosition &&
					room.yPosition === payload.yPosition
			);
			const roomsData = [...this.roomsData];
			roomsData[roomIndex] = {
				...this.roomsData[roomIndex],
				title: payload.title,
			};
			this.setRoomData(roomsData);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async delete(id: string): Promise<void> {
		this.setLoading(true);
		try {
			// TODO: delete call to to server
			const tempData = this.roomsData.filter((item) => item.id !== id);
			this.setRoomData(tempData);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async fetchAllElements(): Promise<void> {
		this.setLoading(true);
		try {
			const { data } = await this.coursesApi.courseControllerFindForUser(
				0,
				100
			);

			this.setAllElements(data.data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async getSharedCourseData(courseCode: string): Promise<void> {
		this.resetBusinessError();
		const params = {
			shareToken: courseCode,
		};
		try {
			const courseName = (
				await $axios.get("/v1/courses-share", {
					params,
				})
			).data;
			this.setSharedCourseData({
				code: courseCode,
				// @ts-ignore
				courseName: courseName,
				status: "success",
				message: "",
			});
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}

	@Action
	async confirmSharedCourseData(
		courseData: SharingCourseObject
	): Promise<void> {
		this.resetBusinessError();
		try {
			const importedCourseResponse = (
				await $axios.post("/v1/courses-share", {
					shareToken: courseData.code,
					courseName: courseData.courseName,
				})
			).data;
			// @ts-ignore
			this.setImportedCourseId(importedCourseResponse.id || undefined);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
		}
	}
}
