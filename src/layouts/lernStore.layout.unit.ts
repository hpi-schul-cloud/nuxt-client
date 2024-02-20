import { contentModule, envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import ContentModule from "@/store/content";
import EnvConfigModule from "@/store/env-config";
import { ConfigResponse } from "@/serverApi/v3/api";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { shallowMount } from "@vue/test-utils";
import lernStoreLayout from "./lernStore.layout.vue";

describe("lernStoreLayout", () => {
	const params = {
		id: "mockId",
	};

	const mountComponent = (attrs = {}) => {
		return shallowMount(lernStoreLayout, {
			...createComponentMocks({}),
			provide: {
				contentModule: ContentModule,
			},
			...attrs,
		});
	};

	beforeEach(async () => {
		setupStores({
			contentModule: ContentModule,
			envConfigModule: EnvConfigModule,
			authModule: AuthModule,
		});
	});

	describe("when 'feature flag' is set", () => {
		const query = {
			isCollection: "true",
		};
		it("should render 'legacy-logged-in' layout if feature flag set true", async () => {
			envConfigModule.setEnvs({
				FEATURE_ES_COLLECTIONS_ENABLED: true,
			} as ConfigResponse);
			contentModule.init();
			const mocks = {
				$route: {
					params,
					query,
				},
			};
			const wrapper = mountComponent({ mocks });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.vm).toBeDefined();
		});

		it("should not render 'legacy-logged-in' layout if feature flag set false", async () => {
			envConfigModule.setEnvs({
				FEATURE_ES_COLLECTIONS_ENABLED: false,
			} as ConfigResponse);
			contentModule.init();
			const mocks = {
				$route: {
					params,
					query,
				},
			};
			const wrapper = mountComponent({ mocks });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.vm).not.toBeDefined();
		});
	});

	describe("when 'isCollection' queryString is set", () => {
		beforeEach(() => {
			envConfigModule.setEnvs({
				FEATURE_ES_COLLECTIONS_ENABLED: true,
			} as ConfigResponse);
		});
		it("should render any layout if 'isCollection' queryString is set true", async () => {
			contentModule.init();
			const mocks = {
				$route: {
					params,
					query: {
						isCollection: "true",
					},
				},
			};
			const wrapper = mountComponent({ mocks });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.vm).toBeDefined();
		});

		it("should not render any layout if 'isCollection' queryString is set false", async () => {
			contentModule.init();
			const mocks = {
				$route: {
					params,
					query: {
						isCollection: "false",
					},
				},
			};
			const wrapper = mountComponent({ mocks });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.vm).not.toBeDefined();
		});
	});
});
