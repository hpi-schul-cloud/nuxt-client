import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ExternalToolStatus, SchoolExternalTool} from "./types/school-external-tool";

@Module({
	name: "external-tools",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	schoolExternalTools: SchoolExternalTool[] = [];

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	@Mutation
	setSchoolExternalTools(externalTools: SchoolExternalTool[]): void {
		this.schoolExternalTools = [...externalTools];
	}

	@Action
	async loadSchoolExternalTools(): Promise<void> {
		try {
			const resp = {
				data: [
					{id: 'testId', name: "Test", status: ExternalToolStatus.Latest},
					{id: 'testId2', name: "Test2", status: ExternalToolStatus.Outdated}
				],
				size: 2,
			};
			// TODO: map response when it is defined
			this.setSchoolExternalTools(resp.data);
		} catch (e) {
			throw new Error(e);
		}
	}
}
