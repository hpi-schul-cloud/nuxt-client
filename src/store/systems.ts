import { $axios } from "@utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	SystemApiFactory,
	SystemApiInterface,
	SystemOauthResponse,
	SystemResponse,
} from "../serverApi/v3";
import { System } from "./types/system";

@Module({
	name: "systems",
	namespaced: true,
	stateFactory: true,
})
export default class SystemsModule extends VuexModule {
	private systems: System[] = [];
	private loading: boolean = false;

	private _systemApi?: SystemApiInterface;

	private get systemApi(): SystemApiInterface {
		if (!this._systemApi) {
			this._systemApi = SystemApiFactory(undefined, "v3", $axios);
		}
		return this._systemApi;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setSystems(systems: System[]): void {
		this.systems = systems;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSystems(): System[] {
		return this.systems;
	}

	findSystem(id: string): System | undefined {
		return this.systems.find((system: System): boolean => system.id === id);
	}

	@Action
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			const systems: AxiosResponse<SystemOauthResponse> =
				await this.systemApi.systemControllerFind();

			const mappedSystems: System[] = systems.data.data.map(
				(system: SystemResponse): System => ({
					id: system.id,
					name: system.displayName || "",
				})
			);
			this.setSystems(mappedSystems);
			this.setLoading(false);
		} catch (e) {
			console.error(`Some error occurred while loading system data: ${e}`);
			this.setLoading(false);
		}
	}
}
