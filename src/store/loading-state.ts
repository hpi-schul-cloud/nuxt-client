import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { LoadingStatePayload } from "@store/types/loading-state-payload";

@Module({
	name: "loading-state",
	namespaced: true,
	stateFactory: true,
})
export default class LoadingStateModule extends VuexModule {
	private defaultPayload: Required<LoadingStatePayload> = {
		hasOverlay: true,
		isPersistent: true,
		text: "",
	};

	private loadingState: Required<LoadingStatePayload> = {
		...this.defaultPayload,
	};

	private isOpen: boolean = false;

	get getLoadingState(): Required<LoadingStatePayload> {
		return this.loadingState;
	}

	get getIsOpen(): boolean {
		return this.isOpen;
	}

	@Action
	open(payload: LoadingStatePayload): void {
		const mergedPayload: Required<LoadingStatePayload> = {
			...this.defaultPayload,
			...payload,
		};
		this.setLoadingState(mergedPayload);
		this.setIsOpen(true);
	}

	@Action
	close(): void {
		this.setIsOpen(false);
	}

	@Mutation
	setIsOpen(value: boolean): void {
		this.isOpen = value;
	}

	@Mutation
	setLoadingState(payload: Required<LoadingStatePayload>): void {
		this.loadingState = payload;
	}
}
