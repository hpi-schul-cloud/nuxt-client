// import { authModule, envConfigModule, filePathsModule } from "@/store";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import setupStores from "@@/tests/test-utils/setupStores";

import legacyLoggedIn from "./legacyLoggedIn.vue";
import { mount, shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TheSidebar from "@/components/legacy/TheSidebar.vue";
import TheTopBar from "@/components/legacy/TheTopBar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";
import MatrixMessenger from "@/components/organisms/Messenger/MatrixMessenger.vue";
import SkipLinks from "../components/molecules/SkipLinks.vue";
import { createModuleMocks } from "@/utils/mock-store-module";
import { Envs } from "../store/types/env-config";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

const mockStore = {
	auth: {
		state: () => ({
			user: {
				permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
				roles: [{ name: "administrator" }],
			},
		}),
		getters: {
			getUser: () => ({
				permissions: ["TEACHER_CREATE"],
			}),
			getAuthenticated: () => "token_sample",
		},
	},
	schools: {
		state: () => ({
			school: { _id: "12312" },
		}),
		getters: {
			getSchool: () => ({ _id: "12312" }),
		},
	},
	"env-config": {
		state: () => ({
			env: { ALERT_STATUS_URL: "https://status.dbildungscloud.de" },
		}),
	},
};

const $router = { push: jest.fn(), afterEach: jest.fn() };

// let authModuleMock: AuthModule;
// let envConfigModuleMock: EnvConfigModule;
// let filePathsModuleMock: FilePathsModule;

const getWrapper = () =>
	shallowMount(legacyLoggedIn, {
		...createComponentMocks({
			i18n: true,
			// @ts-ignore
			store: mockStore,
		}),
		// provide: {
		// 	authModule: authModuleMock,
		// 	envConfigModule: envConfigModuleMock,
		// 	filePathsModuleMock: FilePathsModule,
		// },
		mocks: {
			$theme: {
				short_name: "nbc",
			},
			$router,
			$route,
		},
	}) as any;

// // @ts-ignore
// authModule.setUser({
// 	permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
// 	roles: [{ name: "administrator" }],
// });

// authModule.setAccessToken("asdf");

// filePathsModule.setSpecificFiles("https://dbildungscloud.de");

// // @ts-ignore
// envConfigModule.setEnvs({
// 	ALERT_STATUS_URL: "https://status.dbildungscloud.de",
// });

describe("legacyLoggedIn", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			autoLogoutModule: AutoLogoutModule,
			envConfigModule: EnvConfigModule,
			filePathsModule: FilePathsModule,
			schoolsModule: SchoolsModule,
			statusAlertsModule: StatusAlertsModule,
		});
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		// envConfigModuleMock = createModuleMocks(EnvConfigModule, {
		// 	getAvailableLanguages: "de,en",
		// 	// @ts-ignore
		// 	getEnv: () => ({
		// 		ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		// 	}),
		// });
		// authModuleMock = createModuleMocks(AuthModule, {
		// 	// @ts-ignore
		// 	user: {
		// 		id: "userId",
		// 		permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
		// 	},
		// 	accesToken: "token",
		// 	// @ts-ignore
		// 	getUser: () => user,
		// });
	});

	// it("should render its sub components", async () => {
	// 	const wrapper = getWrapper();
	// 	await wrapper.vm.$nextTick();

	// 	const topbar = wrapper.findComponent(TheTopBar);
	// 	const sidebar = wrapper.findComponent(TheSidebar);
	// 	const footer = wrapper.findComponent(TheFooter);
	// 	const autoLogoutWarningComponent = wrapper.findComponent(autoLogoutWarning);
	// 	const matrixMessenger = wrapper.findComponent(MatrixMessenger);
	// 	const skipLinks = wrapper.findComponent(SkipLinks);

	// 	const components = [
	// 		topbar,
	// 		sidebar,
	// 		footer,
	// 		autoLogoutWarningComponent,
	// 		matrixMessenger,
	// 		skipLinks,
	// 	];

	// 	components.forEach((component) => {
	// 		expect(component).toBeDefined();
	// 	});
	// });

	// it("should called 'handleTopAction' when theTopBar component emits 'action'", async () => {
	// 	const handleTopActionMock = jest.fn();
	// 	const wrapper = getWrapper();
	// 	await wrapper.vm.$nextTick();
	// 	const methodNameSpy = jest.spyOn(wrapper.vm, "handleTopAction");
	// 	// (wrapper.vm as any).handleTopAction = handleTopActionMock;
	// 	await wrapper.vm.$nextTick();
	// 	expect(wrapper.vm.expandedMenu).toBe(false);

	// 	const topbar = wrapper.findComponent('[data-testid="topbar"]');

	// 	topbar.vm.$emit("fullscreen");

	// 	// expect(wrapper.vm.expandedMenu).toBe(true);

	// 	expect(methodNameSpy).toHaveBeenCalled();
	// });
});
