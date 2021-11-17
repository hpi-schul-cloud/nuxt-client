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

export type RoomsData = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
};

export type AllElementsObject = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition?: number;
	yPosition?: number;
};

export type AllElements = Array<AllElementsObject> | any;

type DroppedObject = {
	from: {
		x: number;
		y: number;
		groupIndex?: number;
	};
	to: {
		x: number;
		y: number;
	};
	item: object;
};

const mockData: AllElements = [
	{
		id: "6183ddx6480fdc650e44b79d1",
		title: "Physics",
		shortTitle: "Ph",
		displayColor: "blue",
	},
	{
		id: "6183ddc6680fdc650e44b79d2",
		title: "Math",
		shortTitle: "Ma",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93dfvxc71f695cfb16fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "6188f941f71f695cfb16fvxce19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce06870b10d863vxccca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b659806870b10d863cvxca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618b659806870bsdf10d863cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
	},
	{
		id: "6183ddc6480fdc650e44b79d1",
		title: "Physics",
		shortTitle: "Ph",
		displayColor: "blue",
	},
	{
		id: "6183dd6680vvfdc650e44b79d2",
		title: "Math",
		shortTitle: "Ma",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93df71f6y95cfb1y6fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "6188yf941f71f695cfby16fe19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce06870b10d863cca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b659x806870b10xd863cca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618bc65dd9806870b10d8c63cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
	},
	{
		id: "6188f93vdf71f695cfbv16fe18",
		title: "Greek",
		shortTitle: "Gr",
		displayColor: "#f23f76",
	},
	{
		id: "61y88f941f71f695cfb16vfe19",
		title: "German",
		shortTitle: "Ge",
		displayColor: "#f23f76",
	},
	{
		id: "618a95ce0w6870b10dw863cca4",
		title: "English",
		shortTitle: "En",
		displayColor: "green",
	},
	{
		id: "618b65e9806870b10dt863cca5",
		title: "Biology",
		shortTitle: "Bi",
		displayColor: "yellow",
	},
	{
		id: "618b6r5980687dfg0b10d86r3cca5",
		title: "Chemistry",
		shortTitle: "Ch",
		displayColor: "#f23f76",
	},
];

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
	allElements: Array<AllElements> = [];

	loading: boolean = false;
	error: null | {} = null;
	private _dashboardApi?: DashboardApiInterface;

	@Mutation
	setRoomData(data: Array<RoomsData>): void {
		this.roomsData = data;
	}

	@Mutation
	setAllElements(data: Array<AllElements>): void {
		this.allElements = data;
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

	get getAllElements(): Array<AllElementsObject> {
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

	@Action
	async fetchAllElements(): Promise<void> {
		this.setLoading(true);
		try {
			// TODO: fetch all alements from server
			this.setAllElements(mockData);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}
}

export default getModule(Rooms);
