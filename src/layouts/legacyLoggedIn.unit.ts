import { mount } from "@vue/test-utils";
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
import { Envs } from "@/store/types/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRoute } from "vue-router";
import { STATUS_ALERTS_MODULE_KEY } from "@/utils/inject";
import { reactive } from "vue";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

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
} as Envs);

jest.mock("vue-router");
const useRouteMock = <jest.Mock>useRoute;

describe("legacyLoggedIn", () => {
	it("should mark active links", () => {
		const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
			getStatusAlerts: [],
		});

		useRouteMock.mockImplementation(() => reactive($route));

		const wrapper = mount(legacyLoggedIn, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
				},
				mocks: {
					$theme: {
						name: "instance name",
					},
				},
				stubs: [
					"base-input",
					"base-modal",
					"base-link",
					"base-qr-code",
					"router-link",
				],
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
