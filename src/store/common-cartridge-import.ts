import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { FileApiFactory, FileApiInterface, FileRecordParentType, StorageLocation } from "@/fileStorageApi/v3";
import { $axios } from "@/utils/api";
import { useAppStoreRefs } from "@data-app";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

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

	public get commonCartridgeApi(): CommonCartridgeApiInterface {
		return CommonCartridgeApiFactory(undefined, "/v3", $axios);
	}

	public get fileStorageApi(): FileApiInterface {
		return FileApiFactory(undefined, "/v3", $axios);
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
		const { user, school } = useAppStoreRefs();
		const schoolId = school.value?.id;
		const currentUserId = user.value?.id;

		if (!file || !currentUserId || !schoolId) {
			this.setIsSuccess(false);
			return;
		}

		try {
			const uploadResult = await this.fileStorageApi.upload(
				schoolId,
				StorageLocation.SCHOOL,
				currentUserId,
				FileRecordParentType.USERS,
				file
			);

			const fileRecords = uploadResult.data;

			// TODO use the fileRecords to start the import and remove this console.log statement.
			// eslint-disable-next-line no-console
			console.log(fileRecords);
			this.setIsSuccess(true);
		} catch {
			this.setIsSuccess(false);
		}
	}
}
