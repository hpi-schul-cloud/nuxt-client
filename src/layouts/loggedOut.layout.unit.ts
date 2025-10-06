import loggedOut from "./loggedOut.layout.vue";
import { SchulcloudTheme } from "@/serverApi/v3";
import ApplicationErrorModule from "@/store/application-error";
import FilePathsModule from "@/store/filePaths";
import { APPLICATION_ERROR_KEY, THEME_KEY } from "@/utils/inject";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mock } from "vitest";
import { useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("loggedOutLayout", () => {
	const mountComponent = () => {
		setupStores({
			filePathsModule: FilePathsModule,
		});
		setActivePinia(createTestingPinia());

		createTestEnvStore({
			GHOST_BASE_URL: "https://works-like-charm.com",
			// SC_THEME must be set here because of dependency to NavigationBar
			SC_THEME: SchulcloudTheme.Default,
		});

		const applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule);

		const $route = { path: "home" };
		const $router = {
			push: vi.fn(),
			currentRoute: { value: $route },
			replace: vi.fn(),
			afterEach: vi.fn(),
		};
		useRouterMock.mockReturnValue($router);

		const wrapper = mount(loggedOut, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModuleMock,
					[THEME_KEY.valueOf()]: {
						name: "instance name",
					},
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
