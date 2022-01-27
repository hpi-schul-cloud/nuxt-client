import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import {
	DashboardApiFactory,
	DashboardApiInterface,
	CoursesApiFactory,
	CoursesApiInterface,
	CourseMetadataResponse,
	DashboardGridElementResponse,
} from "../serverApi/v3/api";

import {
	DroppedObject,
	RoomsData,
	AllItems,
	SharingCourseObject,
} from "./types/rooms";
import { currentDate, fromUTC } from "@/plugins/datetime";
import { BusinessError, Status } from "./types/commons";

@Module({
	name: "rooms",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Rooms extends VuexModule {
	roomsData: DashboardGridElementResponse[] = [];
	gridElementsId: string = "";
	allElements: CourseMetadataResponse[] = [];
	courseSharingStatus: SharingCourseObject = {
		msg: "",
		status: "",
	};
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	loading: boolean = false;
	error: null | {} = null;
	private _dashboardApi?: DashboardApiInterface;
	private _coursesApi?: CoursesApiInterface;

	@Mutation
	setRoomData(data: DashboardGridElementResponse[]): void {
		this.roomsData = data.map((item) => {
			let href = "";
			if (item.groupElements) {
				item.groupElements = item.groupElements.map((groupItem) => {
					if (groupItem.id) {
						href = `/courses/${groupItem.id}`;
					}
					return { ...groupItem, href };
				});
			}
			if (item.id) {
				href = `/courses/${item.id}`;
			}
			return { ...item, href };
		});
	}

	@Mutation
	setAllElements(data: CourseMetadataResponse[]): void {
		this.allElements = data.map((item: CourseMetadataResponse) => {
			let href = null;
			if (item.id) {
				href = `/courses/${item.id}`;
			}
			const isArchived =
				item.untilDate && fromUTC(item.untilDate || "") < currentDate();
			if (!isArchived) {
				return { ...item, searchText: item.title, isArchived, href };
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
				href,
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
	setCourseSharingStatus(status: SharingCourseObject): void {
		this.courseSharingStatus = status;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
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
		return this.courseSharingStatus;
	}

	private get dashboardApi(): DashboardApiInterface {
		if (!this._dashboardApi) {
			this._dashboardApi = DashboardApiFactory(undefined, "/v3", $axios);
		}
		return this._dashboardApi;
	}

	private get coursesApi(): CoursesApiInterface {
		if (!this._coursesApi) {
			this._coursesApi = CoursesApiFactory(undefined, "/v3", $axios);
		}
		return this._coursesApi;
	}

	@Action
	async fetch(device: string): Promise<void> {
		// device parameter will be used to fetch data specified for device
		this.setLoading(true);
		try {
			const { data } = await this.dashboardApi.dashboardControllerFindForUser();
			this.setRoomDataId(data.id || "");
			this.setRoomData(data.gridElements || []);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
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
			this.setRoomData(response.data.gridElements);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
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
	async checkSharingStatus(sharingCode: string): Promise<void> {
		const params = {
			qs: {
				shareToken: sharingCode,
			},
		};
		try {
			// debugger;
			const shareCodeResponse = await $axios.$get("/v1/courses-share", {
				params,
			});
			// debugger;
			this.setCourseSharingStatus({
				msg: shareCodeResponse,
				status: "success",
			});
		} catch (error) {
			// debugger;
			this.setCourseSharingStatus({
				msg: "ShareToken is not in use.",
				status: "error",
			});
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}
}

export default getModule(Rooms);
