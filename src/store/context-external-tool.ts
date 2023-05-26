import { Module, VuexModule } from "vuex-module-decorators";
import { ContextExternalTool } from "./external-tool/context-external-tool";

@Module({
	name: "contextExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ContextExternalToolsModule extends VuexModule {
	private contextExternalTools: ContextExternalTool[] = [];

	get getContextExternalTools() {
		return this.contextExternalTools;
	}
}
