import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {SchoolExternalTool} from "./types/school-external-tool";
import {$axios} from "@utils/api";
import {authModule} from "@utils/store-accessor";
import {useSchoolExternalToolUtils} from "@components/administration/school-external-tool-utils.composable";

@Module({
	name: "external-tools",
	namespaced: true,
	stateFactory: true,
})
export default class ExternalToolsModule extends VuexModule {
	schoolExternalTools: SchoolExternalTool[] = [];
	loading: boolean = false;
	private readonly PATH: string = "/v3/tools/school";

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getSchoolExternalTools(): SchoolExternalTool[] {
		return this.schoolExternalTools;
	}

	@Mutation
	setSchoolExternalTools(externalTools: SchoolExternalTool[]): void {
		this.schoolExternalTools = [...externalTools];
	}

	@Action
	async loadSchoolExternalTools(): Promise<void> {
		this.setLoading(true);
		try {
			if (authModule.getUser?.schoolId) {
				const resp = await $axios.$get(
					`${this.PATH}?schoolId=${authModule.getUser.schoolId}`
				);
				this.setSchoolExternalTools(useSchoolExternalToolUtils().mapSchoolExternalToolSearchListResponse(resp));
			}
			this.setLoading(false);
		} catch (e) {
			this.setLoading(false);
			throw new Error(e);
		}
	}
}
