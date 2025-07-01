import type { Mock } from "vitest";
import ContentModule from "@/store/content";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import lernStoreLayout from "./lernStore.layout.vue";
import { CONTENT_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { useRoute } from "vue-router";

const params = {
	id: "mockId",
};
const query = {
	isCollection: "true",
};

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
}));

const useRouteMock = <Mock>useRoute;

const setup = (options?: {
	collectionEnabled: boolean;
	route?: { params: { id: string }; query: { isCollection: string } };
}) => {
	const route = options?.route || { params, query };
	useRouteMock.mockReturnValue(route);

	const contentModule = createModuleMocks(ContentModule, {
		getCollectionsFeatureFlag: options?.collectionEnabled,
	});
	const envConfigModule = createModuleMocks(EnvConfigModule, {
		getEnv: envsFactory.build({
			FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED: options?.collectionEnabled,
		}),
	});

	const wrapper = shallowMount(lernStoreLayout, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[CONTENT_MODULE_KEY.valueOf()]: contentModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			},
			stubs: {
				"router-view": { template: "<div class='router-view'></div>" },
			},
		},
	});

	return { wrapper };
};

describe("layouts/lernStoreLayout", () => {
	describe("when 'feature flag' is set", () => {
		it("should render 'logged-in' layout if feature flag set true", async () => {
			const { wrapper } = setup({ collectionEnabled: true });

			const layout = wrapper.findComponent({ name: "LoggedIn" });
			const routerView = wrapper.find(".router-view");

			expect(layout.exists()).toBe(true);
			expect(routerView.exists()).toBe(false);
		});

		it("should not render 'logged-in' layout if feature flag set false", async () => {
			const { wrapper } = setup({ collectionEnabled: false });

			const layout = wrapper.findComponent({ name: "LoggedIn" });
			const routerView = wrapper.find(".router-view");

			expect(layout.exists()).toBe(false);
			expect(routerView.exists()).toBe(true);
		});
	});

	describe("when 'isCollection' queryString is set", () => {
		it("should render any layout if 'isCollection' queryString is set true", async () => {
			const { wrapper } = setup({ collectionEnabled: true });

			const layout = wrapper.findComponent({ name: "LoggedIn" });
			expect(layout.exists()).toBe(true);
		});

		it("should not render any layout if 'isCollection' queryString is set false", async () => {
			const { wrapper } = setup({
				collectionEnabled: true,
				route: {
					params,
					query: {
						isCollection: "false",
					},
				},
			});

			const layout = wrapper.findComponent({ name: "LoggedIn" });
			expect(layout.exists()).toBe(false);
		});
	});
});
