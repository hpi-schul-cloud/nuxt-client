import { Module, VuexModule } from "vuex-module-decorators";
import { newsModule } from "@/store";

@Module({
	name: "newsModule",
	namespaced: true,
	stateFactory: true,
})
export default class FooModule extends VuexModule {
	get getBusinessError() {
		console.log("### newsModule", newsModule);
		return newsModule.getBusinessError;
	}
}
