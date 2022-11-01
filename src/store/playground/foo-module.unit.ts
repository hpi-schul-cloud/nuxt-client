import Vue from "vue";
import Vuex from "vuex";
import NewsModule from "../news";
import setupStores from "@@/tests/test-utils/setupStores";
import FooModule from "./foo-module";

describe("FooModule", () => {
	it("should instantiate the module", () => {
		Vue.use(Vuex);
		setupStores({
			newsModule: NewsModule,
		});
		const fooModule = new FooModule({});
		expect(fooModule).toBeDefined();
		expect(fooModule.getBusinessError).toBeDefined();
	});
});
