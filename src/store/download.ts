import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { roomModule } from "./store-accessor";

@Module({
	name: "downloadModule",
	namespaced: true,
	stateFactory: true,
})
export default class DownloadModule extends VuexModule {
	private isDownloadModalOpen = false;
	private version = "";

	@Action
	async startDownload(version: string): Promise<void> {
		if (version === "1.1.0" || version === "1.3.0") {
			await roomModule.downloadCommonCartridgeCourse(version);
		}
	}

	@Action
	startDownloadFlow(): void {
		this.setVersion("");
		this.setIsDownloadModalOpen(true);
	}

	@Action
	resetDownloadFlow(): void {
		this.setVersion("");
		this.setIsDownloadModalOpen(false);
	}

	@Mutation
	setVersion(version: string): void {
		this.version = version;
	}

	@Mutation
	setIsDownloadModalOpen(open: boolean): void {
		this.isDownloadModalOpen = open;
	}

	get getVersion(): string {
		return this.version;
	}
	get getIsDownloadModalOpen(): boolean {
		return this.isDownloadModalOpen;
	}
}
