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
	RoomsApiInterface,
	RoomsApiFactory,
	BoardResponse,
	PatchVisibilityParams,
	PatchOrderParams,
} from "../serverApi/v3/api";
import { BusinessError } from "./types/commons";

@Module({
	name: "room",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Room extends VuexModule {
	roomData: BoardResponse = {
		roomId: "",
		title: "",
		displayColor: "",
		elements: [],
	};
	loading: boolean = false;
	error: null | {} = null;
	businessError: BusinessError = {
		statusCode: "",
		message: "",
		error: {},
	};

	private _roomsApi?: RoomsApiInterface;
	private get roomsApi(): RoomsApiInterface {
		if (!this._roomsApi) {
			this._roomsApi = RoomsApiFactory(undefined, "/v3", $axios);
		}
		return this._roomsApi;
	}

	@Action
	async fetchContent(id: string): Promise<void> {
		this.setLoading(true);
		try {
			const { data } = await this.roomsApi.roomsControllerGetRoomBoard(id);
			this.setRoomData(data);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async publishCard(payload: {
		elementId: string;
		visibility: boolean;
	}): Promise<void> {
		this.setLoading(true);
		const visibilityParam: PatchVisibilityParams = {
			visibility: payload.visibility,
		};
		try {
			await this.roomsApi.roomsControllerPatchElementVisibility(
				this.roomData.roomId,
				payload.elementId,
				visibilityParam
			);
			await this.fetchContent(this.roomData.roomId);

			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async sortElements(payload: PatchOrderParams): Promise<void> {
		this.setLoading(true);
		try {
			const response =
				await this.roomsApi.roomsControllerPatchOrderingOfElements(
					this.roomData.roomId,
					payload
				);
			console.log(response);

			// await this.fetchContent(this.roomData.roomId);

			this.setLoading(false);
		} catch (error: any) {
			this.setBusinessError({
				statusCode: error?.response?.status,
				message: error?.response?.statusText,
				...error,
			});
			this.setLoading(false);
		}
	}

	@Mutation
	setRoomData(payload: BoardResponse): void {
		this.roomData = payload;
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

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	get getRoomData(): BoardResponse {
		return this.roomData;
	}

	get getBusinessError() {
		return this.businessError;
	}
}

export default getModule(Room);
