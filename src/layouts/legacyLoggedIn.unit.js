import { authModule, envConfigModule, filePathsModule } from "@/store";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import setupStores from "@@/tests/test-utils/setupStores";
import legacyLoggedIn from "./legacyLoggedIn";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

const $router = { push: jest.fn() };

setupStores({
	authModule: AuthModule,
	autoLogoutModule: AutoLogoutModule,
	envConfigModule: EnvConfigModule,
	filePathsModule: FilePathsModule,
	schoolsModule: SchoolsModule,
	statusAlertsModule: StatusAlertsModule,
});

authModule.setUser({
	permissions: ["ADMIN_VIEW", "LERNSTORE_VIEW"],
	roles: [{ name: "administrator" }],
});
authModule.setAccessToken("asdf");

filePathsModule.setSpecificFiles("https://dbildungscloud.de");

envConfigModule.setEnvs({
	ALERT_STATUS_URL: "https://status.dbildungscloud.de",
});

describe("legacyLoggedIn", () => {
	let wrapper;
	beforeAll(() => {
		wrapper = mount(legacyLoggedIn, {
			...createComponentMocks({ i18n: true, $router, $route }),
		});
	});

	it("should mark active links", () => {
		const administrationListItem = wrapper.find("[data-testId='Verwaltung']");
		const studentAdministrationListItem = wrapper.find(
			"[data-testId='Schüler:innen']"
		);
		expect(
			administrationListItem.element.classList.contains("child-active")
		).toBeTrue();
		expect(
			studentAdministrationListItem.element.classList.contains("active")
		).toBeTrue();
	});
});
