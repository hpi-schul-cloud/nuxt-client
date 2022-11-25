import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { LoadingStatePayload } from "@store/types/loading-state-payload";

@Module({
	name: "loading-state",
	namespaced: true,
	stateFactory: true,
})
export default class LoadingStateModule extends VuexModule {
	_defaultPayload: Required<LoadingStatePayload> = {
		hasOverlay: true,
		isPersistent: true,
		text: "",
	};

	_loadingState: Required<LoadingStatePayload> = {
		...this._defaultPayload,
	};

	_isOpen: boolean = false;

	get getLoadingState(): Required<LoadingStatePayload> {
		return this._loadingState;
	}

	get getIsOpen(): boolean {
		return this._isOpen;
	}

	@Action
	open(payload: LoadingStatePayload): void {
		const mergedPayload: Required<LoadingStatePayload> = {
			...this._defaultPayload,
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
		this._isOpen = value;
	}

	@Mutation
	setLoadingState(payload: Required<LoadingStatePayload>): void {
		this._loadingState = payload;
	}
}
