import App from "./App.vue";
import LoggedInLayout from "./layouts/LoggedIn.layout.vue";
import LoggedOutLayout from "./layouts/LoggedOut.layout.vue";
import { Layouts } from "./layouts/types";
import { SchulcloudTheme } from "./serverApi/v3";
import FilePathsModule from "./store/filePaths";
import LoadingStateModule from "./store/loading-state";
import StatusAlertsModule from "./store/status-alerts";
import { FILE_PATHS_MODULE_KEY, STATUS_ALERTS_MODULE_KEY, THEME_KEY } from "./utils/inject";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { Router, useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

const filePathsModule = createModuleMocks(FilePathsModule, {
	getSpecificFiles: {
		accessibilityStatement: "statement",
		privacy: "",
		termsOfUse: "",
		analogConsent: "",
	},
});

const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
	getStatusAlerts: [],
});

describe("App.vue", () => {
	let loadingStateModuleMock: LoadingStateModule;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});
	beforeEach(() => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			getIsOpen: false,
			getLoadingState: {
				hasOverlay: false,
				isPersistent: false,
				text: "Loading...",
			},
		});
	});
	const setup = (options: { layout: Layouts | undefined }) => {
		mockedPiniaStoreTyping(useAppStore);
		const router = createMock<Router>({});
		useRouterMock.mockReturnValue(router);
		useRouteMock.mockReturnValue({
			path: "rooms/courses-list",
			meta: {
				layout: options?.layout,
			},
		});

		const wrapper = mount(App, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[FILE_PATHS_MODULE_KEY.valueOf()]: filePathsModule,
					[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
					[THEME_KEY.valueOf()]: {
						name: SchulcloudTheme.Default,
					},
					loadingStateModule: loadingStateModuleMock,
				},
			},
		});

		return { wrapper };
	};

	it("should be rendered correctly", () => {
		const { wrapper } = setup({ layout: Layouts.LOGGED_OUT });

		expect(wrapper.exists()).toBe(true);
	});

	describe("layout rendering", () => {
		it("should render LoggedIn layout", () => {
			const { wrapper } = setup({ layout: Layouts.LOGGED_IN });

			expect(wrapper.findComponent(LoggedInLayout).exists()).toBe(true);
		});

		it("should not render loggedOut layout", () => {
			useAppStore().isLoggedIn = false;
			const { wrapper } = setup({ layout: Layouts.LOGGED_OUT });

			expect(wrapper.findComponent(LoggedInLayout).exists()).toBe(false);
			expect(wrapper.findComponent(LoggedOutLayout).exists()).toBe(true);
		});

		it("should throw when layout is unknown", () => {
			const layout = "unknown-layout" as Layouts;

			expect(() => setup({ layout })).toThrow("Unknown layout 'unknown-layout'");
		});
	});
});
