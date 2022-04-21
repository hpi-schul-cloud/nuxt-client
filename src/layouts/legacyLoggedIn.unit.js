import legacyLoggedIn from "./legacyLoggedIn";
import { authModule, envConfigModule, filePathsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import SchoolsModule from "@/store/schools";
import AutoLogoutModule from "@/store/autoLogout";

const $route = {
	query: {
		id: "mockId",
	},
	path: "/administration/students/",
};

const $router = { push: jest.fn() };

describe("legacyLoggedIn", () => {
	let wrapper;

	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			autoLogout: AutoLogoutModule,
			"env-config": EnvConfigModule,
			filePaths: FilePathsModule,
			schools: SchoolsModule,
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

		wrapper = mount(legacyLoggedIn, {
			...createComponentMocks({ i18n: true, $router, $route }),
		});
	});

	it(...isValidComponent(legacyLoggedIn));

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

		const courseLinkItem = wrapper.find("[data-testId='Kurse']");
		expect(courseLinkItem.element.style.display).toStrictEqual("none");
	});

	it("should mark course link visibility if env-varable set", async () => {
		envConfigModule.setEnvs({
			LEGACY_COURSE_OVERVIEW_ENABLED: true,
		});
		const legacyRoute = wrapper.vm.sidebarItems.filter(
			(item) => item.linkType === "legacyCourse"
		);

		expect(legacyRoute[0].visibility).toStrictEqual("true");
	});
});
