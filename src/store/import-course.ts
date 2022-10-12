import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface ImportPayload {
	name: string;
	token: string;
}

@Module({
	name: "share-course",
	namespaced: true,
	stateFactory: true,
})
export default class ImportCourseModule extends VuexModule {
	private isImportModalOpen: boolean = false;
	private courseId: string | undefined = undefined;
	private name: string | undefined = undefined;

	@Action
	startImportFlow(options: { token: string; name: string }): void {
		// this.validateToken(options.token);
		this.setName(options.name);
		this.setImportModalOpen(true);
	}

	@Action
	resetImportFlow(): void {
		this.setImportModalOpen(false);
		this.setName(undefined);
		this.setCourseId(undefined);
	}

	@Mutation
	setImportModalOpen(open: boolean): void {
		this.isImportModalOpen = open;
	}

	@Mutation
	setName(value: string | undefined): void {
		this.name = value;
	}

	@Mutation
	setCourseId(value: string | undefined): void {
		this.courseId = value;
	}

	get getIsImportModalOpen(): boolean {
		return this.isImportModalOpen;
	}

	get getName(): string | undefined {
		return this.name;
	}

	get getCourseId(): string | undefined {
		return this.courseId;
	}
}
