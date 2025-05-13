import { CoursesApiFactory, CoursesApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CommonCartridgeApiFactory,
	CommonCartridgeApiInterface,
} from "@/commonCartridgeApi/v3/api";
import { CommonCartridgeImportBodyParams } from "@/commonCartridgeApi/v3";

@Module({
	name: "commonCartridgeImportModule",
	namespaced: true,
	stateFactory: true,
})
export default class CommonCartridgeImportModule extends VuexModule {
	private _isOpen = false;
	private _isSuccess = false;
	private _file: File | undefined;

	public get file(): File | undefined {
		return this._file;
	}

	public get isOpen(): boolean {
		return this._isOpen;
	}

	public get isSuccess(): boolean {
		return this._isSuccess;
	}

	public get coursesApi(): CoursesApiInterface {
		return CoursesApiFactory(undefined, "/v3", $axios);
	}

	public get commonCartridgeApi(): CommonCartridgeApiInterface {
		return CommonCartridgeApiFactory(undefined, "/v3", $axios);
	}

	@Mutation
	public setFile(file: File | undefined): void {
		this._file = file;
	}

	@Mutation
	public setIsOpen(value: boolean): void {
		this._isOpen = value;
	}

	@Mutation
	public setIsSuccess(value: boolean): void {
		this._isSuccess = value;
	}

	@Action
	async importCommonCartridgeFile(file: File | undefined): Promise<void> {
		if (!file) {
			this.setIsSuccess(false);
			console.log(file);
			return;
		}

		try {
			await this.coursesApi.courseControllerImportCourse(file);
			this.setIsSuccess(true);
		} catch {
			this.setIsSuccess(false);
		}
	}
}
