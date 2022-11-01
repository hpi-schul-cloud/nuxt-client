import Vue from "vue";
import Vuex, { Store } from "vuex";
import { initilizeNewsModule } from "../store-accessor";
import FooModule from "./foo-module";

describe("FooModule", () => {
	it("should instantiate the module", () => {
		Vue.use(Vuex);
		initilizeNewsModule(new Store({}));
		const fooModule = new FooModule({});
		expect(fooModule).toBeDefined();
		expect(fooModule.getBusinessError).not.toBeDefined();
	});
});
