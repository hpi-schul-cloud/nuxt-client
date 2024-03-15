import { ConfigResponse, SchulcloudTheme } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import loggedOut from "./loggedOut.layout.vue";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

describe("loggedOutLayout", () => {
	const mountComponent = () => {
		setupStores({
			envConfigModule: EnvConfigModule,
			filePathsModule: FilePathsModule,
		});

		envConfigModule.setEnvs({
			GHOST_BASE_URL: "https://works-like-charm.com",
			// SC_THEME must be set here because of dependency to NavigationBar
			SC_THEME: SchulcloudTheme.Default,
		} as ConfigResponse);

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
