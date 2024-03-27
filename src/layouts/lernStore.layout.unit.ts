import { contentModule, envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import ContentModule from "@/store/content";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { shallowMount } from "@vue/test-utils";
import lernStoreLayout from "./lernStore.layout.vue";

describe("lernStoreLayout", () => {
	const params = {
		id: "mockId",
	};
	const query = {
		isCollection: "true",
	};

	const mountComponent = (globalAttr = {}) => {
		return shallowMount(lernStoreLayout, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					contentModule: ContentModule,
				},
				...globalAttr,
			},
		});
	};

	beforeEach(() => {
		setupStores({
			contentModule: ContentModule,
			envConfigModule: EnvConfigModule,
			authModule: AuthModule,
		});
	});

	describe("when 'feature flag' is set", () => {
		it("should render 'legacy-logged-in' layout if feature flag set true", async () => {
			const envs = envsFactory.build({
				FEATURE_ES_COLLECTIONS_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);

			contentModule.init();

			const wrapper = mountComponent({ mocks: { $route: { params, query } } });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.exists()).toBe(true);
		});

		it("should not render 'legacy-logged-in' layout if feature flag set false", async () => {
			const envs = envsFactory.build({
				FEATURE_ES_COLLECTIONS_ENABLED: false,
			});
			envConfigModule.setEnvs(envs);
			contentModule.init();

			const wrapper = mountComponent({ mocks: { $route: { params, query } } });
			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.exists()).toBe(false);
		});
	});

	describe("when 'isCollection' queryString is set", () => {
		beforeEach(() => {
			const envs = envsFactory.build({
				FEATURE_ES_COLLECTIONS_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
		});
		it("should render any layout if 'isCollection' queryString is set true", async () => {
			contentModule.init();
			const wrapper = mountComponent({ mocks: { $route: { params, query } } });

			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.exists()).toBe(true);
		});

		it("should not render any layout if 'isCollection' queryString is set false", async () => {
			contentModule.init();
			const wrapper = mountComponent({
				mocks: { $route: { params, query: { isCollection: "false" } } },
			});

			const mainContentElement = wrapper.find(".content");
			expect(mainContentElement.exists()).toBe(false);
		});
	});
});
