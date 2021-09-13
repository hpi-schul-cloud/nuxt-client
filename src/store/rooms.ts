import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";

type Pos = {
	xPosition: number;
	yPosition: number;
};

@Module({
	name: "rooms",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Rooms extends VuexModule {
	roomsData: any = [];

	loading: boolean = false;
	error: null | {} = null;

	@Mutation
	setRoomData(data: []): void {
		this.roomsData = data;
	}

	@Mutation
	setAlignment(data: Object): void {
		// TODO: set alignment
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: {}): void {
		this.error = error;
	}

	get getRoomData(): Object {
		return this.roomsData;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	@Action
	async fetch(device: string): Promise<void> {
		// device parameter will be used to fetch data specified for device

		this.setLoading(true);
		try {
			const fetched = await $axios.$get("/v3/dashboard/");

			this.setRoomData(fetched.gridElements);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async align(from: Pos, to: Pos, roomObject: object = {}): Promise<void> {
		this.setLoading(true);
		try {
			// TODO: alignment
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async update(payload: any): Promise<void> {
		this.setLoading(true);
		try {
			// TODO: update data
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async delete(id: string): Promise<void> {
		this.setLoading(true);
		try {
			// TODO: delete room object
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}
}

export default getModule(Rooms);
