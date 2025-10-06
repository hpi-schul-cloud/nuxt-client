import { courseRoomDetailsModule } from "./store-accessor";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "commonCartridgeExportModule",
	namespaced: true,
	stateFactory: true,
})
export default class CommonCartridgeExportModule extends VuexModule {
	private isExportModalOpen = false;
	private version = "";
	private topics: string[] = [];
	private tasks: string[] = [];
	private columnBoards: string[] = [];

	@Action
	async startExport(): Promise<void> {
		if (this.getVersion !== "1.1.0" && this.getVersion !== "1.3.0") {
			return;
		}

		await courseRoomDetailsModule.downloadCommonCartridgeCourse({
			version: this.getVersion,
			topics: this.getTopics,
			tasks: this.getTasks,
			columnBoards: this.getColumnBoards,
		});
	}

	@Action
	startExportFlow(): void {
		this.setVersion("");
		this.setTopics([]);
		this.setTasks([]);
		this.setColumnBoards([]);
		this.setIsExportModalOpen(true);
	}

	@Action
	resetExportFlow(): void {
		this.setVersion("");
		this.setTopics([]);
		this.setTasks([]);
		this.setColumnBoards([]);
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
	setTasks(taskIds: string[]) {
		this.tasks = taskIds;
	}

	@Mutation
	setColumnBoards(columnBoardIds: string[]) {
		this.columnBoards = columnBoardIds;
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

	get getTasks(): string[] {
		return this.tasks;
	}

	get getColumnBoards(): string[] {
		return this.columnBoards;
	}
}
