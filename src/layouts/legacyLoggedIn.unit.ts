import { ConfigResponse } from "@/serverApi/v3/api";
import { authModule, envConfigModule, filePathsModule } from "@/store";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import NotifierModule from "@/store/notifier";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import { STATUS_ALERTS_MODULE_KEY } from "@/utils/inject";
import setupStores from "@@/tests/test-utils/setupStores";
import legacyLoggedIn from "./legacyLoggedIn.vue";

import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { meResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { reactive } from "vue";
import { useRoute } from "vue-router";

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

const mockMe = meResponseFactory.build({ permissions: ["ADMIN_VIEW"] });
authModule.setMe(mockMe);
authModule.setAccessToken("asdf");

filePathsModule.setSpecificFiles("https://dbildungscloud.de");

envConfigModule.setEnvs({
	ALERT_STATUS_URL: "https://status.dbildungscloud.de",
} as ConfigResponse);

jest.mock("vue-router");
const useRouteMock = <jest.Mock>useRoute;

describe("legacyLoggedIn", () => {
	it("should mark active links", () => {
		const autoLogoutModule = createModuleMocks(AutoLogoutModule);
		const statusAlertsModule = createModuleMocks(StatusAlertsModule, {
			getStatusAlerts: [],
		});
		const notifierModule = createModuleMocks(NotifierModule);

		useRouteMock.mockImplementation(() => reactive($route));

		const wrapper = mount(legacyLoggedIn, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					autoLogoutModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[STATUS_ALERTS_MODULE_KEY.valueOf()]: statusAlertsModule,
				},
				mocks: {
					$route: { hash: "" },
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
