import { Module, VuexModule } from "vuex-module-decorators";
import { ContextExternalTool } from "./external-tool/context-external-tool";

@Module({
	name: "contextExternalToolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class ContextExternalToolsModule extends VuexModule {
	private contextExternalTools: ContextExternalTool[] = [
		{
			id: "6475bcfa882d1d1cdb3d6cb7",
			name: "TEST TOOL",
			openInNewTab: false,
		},
	];

	get getContextExternalTools() {
		return this.contextExternalTools;
	}
}
