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
	private topics: string[] = [];

	@Action
	async startExport(): Promise<void> {
		const version = this.getVersion;
		if (version === "1.1.0" || version === "1.3.0") {
			const topics = this.getTopics;
			await roomModule.downloadCommonCartridgeCourse({
				version,
				topics,
			});
		}
	}

	@Action
	startExportFlow(): void {
		this.setVersion("");
		this.setTopics([]);
		this.setIsExportModalOpen(true);
	}

	@Action
	resetExportFlow(): void {
		this.setVersion("");
		this.setTopics([]);
		this.setIsExportModalOpen(false);
	}

	@Mutation
	setVersion(version: string): void {
		this.version = version;
	}

	@Mutation
	setTopics(topicIds: string[]) {
		this.topics = topicIds;
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

	get getTopics(): string[] {
		return this.topics;
	}
}
