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
	CoursesData,
	SharingCourseObject,
} from "./types/courses";
import { AlertPayload } from "./types/alert-payload";

@Module({
	name: "coursesModule",
	namespaced: true,
	stateFactory: true,
})
export default class CoursesModule extends VuexModule {
	coursesData: DashboardGridElementResponse[] = [];
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
	error: null | object = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	alertData: AlertPayload = {
		status: "info",
	};

	@Mutation
	setCourseData(data: DashboardGridElementResponse[]): void {
		this.coursesData = data.map((item) => {
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
	setCourseDataId(id: string): void {
		this.gridElementsId = id;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: object): void {
		this.error = error;
	}

	@Mutation
	setPosition(droppedComponent: DroppedObject | any): void {
		const { to } = droppedComponent;
		const itemToBeChanged = this.coursesData.find(
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
	setAlertData(payload: AlertPayload): void {
		this.alertData = payload;
	}

	get getCoursesData(): Array<CoursesData> {
		return this.coursesData;
	}

	get getAllElements(): AllItems {
		return this.allElements;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): object | null {
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
		return this.coursesData.length > 0;
	}

	get getAlertData(): AlertPayload {
		return this.alertData;
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
	}): Promise<void> {
		// device parameter will be used to fetch data specified for device
		const indicateLoading =
			params?.indicateLoading === undefined ? true : params.indicateLoading;
		if (indicateLoading) this.setLoading(true);
		try {
			const { data } = await this.dashboardApi.dashboardControllerFindForUser();
			this.setCourseDataId(data.id || "");
			this.setCourseData(data.gridElements || []);
			if (indicateLoading) this.setLoading(false);
		} catch (error: any) {
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
		try {
			const response = await this.dashboardApi.dashboardControllerMoveElement(
				this.getRoomsId,
				reqObject
			);

			this.setPosition(payload);
			this.setCourseData(response.data.gridElements);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async update(payload: CoursesData): Promise<void> {
		this.setLoading(true);
		try {
			await this.dashboardApi.dashboardControllerPatchGroup(
				this.getRoomsId,
				payload.xPosition,
				payload.yPosition,
				{ title: payload.title }
			);
			const roomIndex = this.coursesData.findIndex(
				(room) =>
					room.xPosition === payload.xPosition &&
					room.yPosition === payload.yPosition
			);
			const coursesData = [...this.coursesData];
			coursesData[roomIndex] = {
				...this.coursesData[roomIndex],
				title: payload.title,
			};
			this.setCourseData(coursesData);
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
			const tempData = this.coursesData.filter((item) => item.id !== id);
			this.setCourseData(tempData);
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
