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
} from "../serverApi/v3/api";
import { DroppedObject, RoomsData } from "./types/rooms";
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

	loading: boolean = false;
	error: null | {} = null;
	private _dashboardApi?: DashboardApiInterface;

	@Mutation
	setRoomData(data: Array<RoomsData>): void {
		this.roomsData = data;
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

	@Action
	async fetch(device: string): Promise<void> {
		// device parameter will be used to fetch data specified for device
		this.setLoading(true);
		try {
			const fetched = await $axios.$get("/v3/dashboard/");

			this.setRoomDataId(fetched.id || "");
			this.setRoomData(fetched.gridElements || []);
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
			const data = await $axios.$patch(
				`/v3/dashboard/${this.gridElementsId}/moveElement`,
				reqObject
			);
			this.setPosition(payload);
			this.setRoomData(data.gridElements);
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
}

export default getModule(Rooms);
