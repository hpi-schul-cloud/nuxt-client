import { System } from "./types/system";
import { PublicSystemListResponse, PublicSystemResponse, SystemsApiFactory, SystemsApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "systemsModule",
	namespaced: true,
	stateFactory: true,
})
export default class SystemsModule extends VuexModule {
	private systems: System[] = [];
	private loading = false;
	private error: object | null = null;

	private get systemApi(): SystemsApiInterface {
		return SystemsApiFactory(undefined, "v3", $axios);
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setSystems(systems: System[]): void {
		this.systems = systems;
	}

	@Mutation
	setError(error: object | null): void {
		this.error = error;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSystems(): System[] {
		return this.systems;
	}

	get getError(): object | null {
		return this.error;
	}

	@Action
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			const systems: AxiosResponse<PublicSystemListResponse> = await this.systemApi.systemControllerFind();

			const mappedSystems: System[] = systems.data.data.map(
				(system: PublicSystemResponse): System => ({
					id: system.id,
					name: system.displayName || "",
				})
			);
			this.setSystems(mappedSystems);
		} catch (error) {
			this.setError(error as Error);
		}
		this.setLoading(false);
	}
}
