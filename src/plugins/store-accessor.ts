import TaskModule from "@/store/tasks";
import { onGlobalSetup, provide, useContext } from "@nuxtjs/composition-api";
import { getModule } from "vuex-module-decorators";

export default () => {
	onGlobalSetup(() => {
		const { store } = useContext();
		provide("taskModule", getModule(TaskModule, store));
	});
};
