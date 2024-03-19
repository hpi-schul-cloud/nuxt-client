import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { roomModule } from "./store-accessor";

@Module({
	name: "commonCartridgeExportModule",
	namespaced: true,
	stateFactory: true,
})
export default class CommonCartridgeExportModule extends VuexModule {
	private isExportModalOpen = false;
	private version = "";

	@Action
	async startExport(version: string): Promise<void> {
		if (version === "1.1.0" || version === "1.3.0") {
			await roomModule.downloadCommonCartridgeCourse(version);
		}
	}

	@Action
	startExportFlow(): void {
		this.setVersion("");
		this.setIsExportModalOpen(true);
	}

	@Action
	resetExportFlow(): void {
		this.setVersion("");
		this.setIsExportModalOpen(false);
	}

	@Mutation
	setVersion(version: string): void {
		this.version = version;
	}

	@Mutation
	setIsExportModalOpen(open: boolean): void {
		this.isExportModalOpen = open;
	}

	get getVersion(): string {
		return this.version;
	}
	get getIsExportModalOpen(): boolean {
		return this.isExportModalOpen;
	}
}
