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
} from "../serverApi/v3/api";

import { DroppedObject, RoomsData, AllItems } from "./types/rooms";
import { currentDate, fromUTC } from "@/plugins/datetime";

@Module({
	name: "rooms",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Rooms extends VuexModule {
	roomsData: Array<RoomsData> = [];
	gridElementsId: string = "";
	allElements: AllItems = [];

	loading: boolean = false;
	error: null | {} = null;
	private _dashboardApi?: DashboardApiInterface;
	private _coursesApi?: CoursesApiInterface;

	@Mutation
	setRoomData(data: Array<RoomsData>): void {
		this.roomsData = data;
	}

	@Mutation
	setAllElements(data: CourseMetadataResponse[]): void {
		this.allElements = data.map((item) => {
			const isArchived =
				item.untilDate && fromUTC(item.untilDate || "") < currentDate();
			if (!isArchived) {
				return { ...item, searchText: item.title, isArchived };
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
}

export default getModule(Rooms);
