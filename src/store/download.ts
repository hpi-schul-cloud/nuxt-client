import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { roomModule } from "./store-accessor";

export interface DownloadOption {
	version: "1.1.0" | "1.3.0";
}
@Module({
	name: "downloadModule",
	namespaced: true,
	stateFactory: true,
})
export default class DownloadModule extends VuexModule {
	private isDownloadModalOpen = false;
	private version = "";

	@Action
	async startDownload(): Promise<void> {
		if (this.version === "1.1.0" || this.version === "1.3.0") {
			roomModule.downloadImsccCourse(this.version);
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
