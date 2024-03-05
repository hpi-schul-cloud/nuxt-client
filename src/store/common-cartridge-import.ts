import { CoursesApiFactory, CoursesApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "commonCartridgeImportModule",
	namespaced: true,
	stateFactory: true,
})
export default class CommonCartridgeImportModule extends VuexModule {
	private _isOpen = false;
	private _isSuccess = false;

	public get isOpen(): boolean {
		return this._isOpen;
	}

	public get isSuccess(): boolean {
		return this._isSuccess;
	}

	private get coursesApi(): CoursesApiInterface {
		return CoursesApiFactory(undefined, "/v3", $axios);
	}

	@Mutation
	public setIsSuccess(value: boolean): void {
		this._isSuccess = value;
	}

	@Mutation
	public openImportModal(): void {
		this._isOpen = true;
	}

	@Mutation
	public closeImportModal(): void {
		this._isOpen = false;
	}

	@Action
	async importCommonCartridgeFile(file: File | undefined): Promise<void> {
		if (!file) {
			return;
		}

		try {
			await this.coursesApi.courseControllerImportCourse(file);
			this.setIsSuccess(true);
		} catch (error) {
			this.setIsSuccess(false);
		}
	}
}
