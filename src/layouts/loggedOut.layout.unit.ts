import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { APPLICATION_ERROR_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import loggedOut from "./loggedOut.layout.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

describe("loggedOutLayout", () => {
	const mountComponent = () => {
		setupStores({
			envConfigModule: EnvConfigModule,
			filePathsModule: FilePathsModule,
		});
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getGhostBaseUrl: "https://works-like-charm.com",
		});
		const applicationErrorModuleMock = createModuleMocks(
			ApplicationErrorModule
		);

		const $route = { path: "home" };
		const $router = {
			push: jest.fn(),
			currentRoute: { value: $route },
			replace: jest.fn(),
			afterEach: jest.fn(),
		};
		useRouterMock.mockReturnValue($router);

		const wrapper = mount(loggedOut, {
			global: {
				mocks: {
					$theme: {
						name: "instance name",
					},
				},
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModuleMock,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					mq: () => "desktop",
				},
				stubs: ["base-link"],
			},
		});

		return wrapper;
	};

	it("should contain composed urls", () => {
		const wrapper = mountComponent();

		const links = wrapper
			.findAll('[data-testid="logged-out-top-bar"] .link-container > a')
			.map((el) => el.element as HTMLLinkElement);

		expect(links.length).toBe(3);
		expect(new URL(links[0].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[1].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[2].href).host).toEqual("works-like-charm.com");
	});
});
