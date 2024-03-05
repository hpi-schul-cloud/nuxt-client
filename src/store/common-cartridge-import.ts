import { CoursesApiFactory, CoursesApiInterface } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { notifierModule, loadingStateModule } from "@/store";
// import { useI18n } from "vue-i18n";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "commonCartridgeImportModule",
	namespaced: true,
	stateFactory: true,
})
export default class CommonCartridgeImportModule extends VuexModule {
	// private readonly i18n = useI18n();
	private _isOpen = false;

	public get isOpen(): boolean {
		return this._isOpen;
	}

	private get coursesApi(): CoursesApiInterface {
		return CoursesApiFactory(undefined, "/v3", $axios);
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
	async importCommonCartridgeFile(
		file: Record<string, unknown> | null
	): Promise<void> {
		if (!file) {
			return;
		}

		try {
			loadingStateModule.open({
				// text: this.i18n.t("pages.rooms.ccImportCourse.loading").toString(),
				text: "pages.rooms.ccImportCourse.loading",
			});
			await this.coursesApi.courseControllerImportCourse(file);
			notifierModule.show({
				status: "success",
				text: "pages.rooms.ccImportCourse.success",
				autoClose: true,
			});
		} catch (error) {
			notifierModule.show({
				status: "error",
				text: "pages.rooms.ccImportCourse.error",
				autoClose: true,
			});
		} finally {
			this.closeImportModal();
			loadingStateModule.close();
		}
	}
}
