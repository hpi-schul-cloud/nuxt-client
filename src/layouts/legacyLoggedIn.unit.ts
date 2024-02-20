import Vue from "vue";
import { mount, MountOptions } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import { authModule, envConfigModule, filePathsModule } from "@/store";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import setupStores from "@@/tests/test-utils/setupStores";
import legacyLoggedIn from "./legacyLoggedIn.vue";
import { ConfigResponse } from "@/serverApi/v3/api";
import { I18N_KEY, STATUS_ALERTS_MODULE_KEY } from "@/utils/inject";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

const $router = { push: jest.fn(), currentRoute: $route, afterEach: jest.fn() };

setupStores({
	authModule: AuthModule,
	autoLogoutModule: AutoLogoutModule,
	envConfigModule: EnvConfigModule,
	filePathsModule: FilePathsModule,
	schoolsModule: SchoolsModule,
});

authModule.setUser({
	permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
	roles: [{ name: "administrator" }],
	_id: "asdf",
	id: "asdf",
	firstName: "Arthur",
	lastName: "Dent",
	email: "arthur.dent@hitchhiker.org",
	updatedAt: "",
	birthday: "",
	createdAt: "",
	preferences: {},
	schoolId: "",
	emailSearchValues: [],
	firstNameSearchValues: [],
	lastNameSearchValues: [],
	consent: {},
	forcePasswordChange: false,
	language: "",
	fullName: "",
	avatarInitials: "",
	avatarBackgroundColor: "",
	age: 0,
	displayName: "",
	accountId: "",
	schoolName: "",
	externallyManaged: false,
});
authModule.setAccessToken("asdf");

filePathsModule.setSpecificFiles("https://dbildungscloud.de");

envConfigModule.setEnvs({
	ALERT_STATUS_URL: "https://status.dbildungscloud.de",
} as ConfigResponse);

describe("legacyLoggedIn", () => {
	it("should mark active links", () => {
		const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
			getStatusAlerts: [],
		});

		const wrapper = mount(legacyLoggedIn as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
				[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
			},
			mocks: {
				$theme: {
					name: "instance name",
				},
				$router,
				$route,
			},
		});

		const administrationListItem = wrapper.find("[data-testId='Verwaltung']");
		const studentAdministrationListItem = wrapper.find(
			"[data-testId='Schüler:innen']"
		);
		expect(
			administrationListItem.element.classList.contains("child-active")
		).toBeTruthy();
		expect(
			studentAdministrationListItem.element.classList.contains("active")
		).toBeTruthy();
	});
});
