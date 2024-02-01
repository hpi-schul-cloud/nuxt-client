import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { roomModule } from "./store-accessor";

export interface StartFlow {
	version: string;
}

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
	async startDownload(downloadOption: DownloadOption): Promise<void> {
		roomModule.downloadImsccCourse(downloadOption.version);
	}

	@Action
	startDownloadFlow(): void {
		this.setVersion("");
		this.setDownloadModalOpen(true);
	}

	@Action
	resetDownloadFlow(): void {
		this.setVersion("");
		this.setDownloadModalOpen(false);
	}

	@Mutation
	setDownloadModalOpen(open: boolean): void {
		this.isDownloadModalOpen = open;
	}

	@Mutation
	setVersion(version: string): void {
		this.version = version;
	}

	get getVersion(): string {
		return this.version;
	}
	get getIsDownloadModalOpen(): boolean {
		return this.isDownloadModalOpen;
	}
}
