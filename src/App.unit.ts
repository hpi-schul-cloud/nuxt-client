import App from "./App.vue";
import LoggedInLayout from "./layouts/LoggedIn.layout.vue";
import LoggedOutLayout from "./layouts/LoggedOut.layout.vue";
import { Layouts } from "./layouts/types";
import { SchulcloudTheme } from "./generated/serverApi/v3";
import FilePathsModule from "./store/filePaths";
import { FILE_PATHS_MODULE_KEY, THEME_KEY } from "./utils/inject";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { createRouterMock, injectRouterMock, type RouterMock } from "vue-router-mock";

const filePathsModule = createModuleMocks(FilePathsModule, {
	getSpecificFiles: {
		accessibilityStatement: "statement",
		privacy: "",
		termsOfUse: "",
		analogConsent: "",
	},
});

describe("App.vue", () => {
	let router: RouterMock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		router = createRouterMock({
			routes: [{ path: "/test-route", name: "test-route", component: { template: "<div />" } }],
		});
		injectRouterMock(router);
	});

	const setup = async (options: { layout: Layouts | undefined }) => {
		mockedPiniaStoreTyping(useAppStore);

		await router.push({ path: "/test-route", meta: { layout: options?.layout } });
		router.currentRoute.value.meta.layout = options?.layout;

		const wrapper = mount(App, {
			shallow: true,
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
					[THEME_KEY.valueOf()]: {
						name: SchulcloudTheme.DEFAULT,
					},
				},
				stubs: {
					RouterView: true,
				},
			},
		});

		return { wrapper };
	};

	it("should be rendered correctly", async () => {
		const { wrapper } = await setup({ layout: Layouts.LOGGED_OUT });

		expect(wrapper.exists()).toBe(true);
	});

	describe("layout rendering", () => {
		it("should render LoggedIn layout", async () => {
			const { wrapper } = await setup({ layout: Layouts.LOGGED_IN });

			expect(wrapper.findComponent(LoggedInLayout).exists()).toBe(true);
		});

		it("should render loggedOut layout", async () => {
			useAppStore().isLoggedIn = false;
			const { wrapper } = await setup({ layout: Layouts.LOGGED_OUT });

			expect(wrapper.findComponent(LoggedInLayout).exists()).toBe(false);
			expect(wrapper.findComponent(LoggedOutLayout).exists()).toBe(true);
		});

		it("should throw when layout is unknown", async () => {
			const layout = "unknown-layout" as Layouts;

			await expect(setup({ layout })).rejects.toThrow("Unknown layout 'unknown-layout'");
		});
	});
});
