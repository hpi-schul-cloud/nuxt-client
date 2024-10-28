import EnvConfigModule from "@/store/env-config";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import {
	ENV_CONFIG_MODULE_KEY,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import UserLoginMigrationError from "./UserLoginMigrationError.page.vue";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import { userLoginMigrationFactory } from "@@/tests/test-utils/factory/userLoginMigration.factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("UserLoginMigrationError", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;
	let userLoginMigrationModule: jest.Mocked<UserLoginMigrationModule>;

	const setup = (props: {
		sourceSchoolNumber?: string;
		targetSchoolNumber?: string;
		multipleUsersFound?: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		const systemsMock: System[] = [
			{
				id: "sourceSystemId",
				name: "sourceSystem",
			},
			{
				id: "targetSystemId",
				name: "targetSystem",
			},
		];

		systemsModule = createModuleMocks(SystemsModule, {
			getSystems: systemsMock,
		});
		envConfigModule = createModuleMocks(EnvConfigModule, {
			getAccessibilityReportEmail: "nbc-support@netz-21.de",
		});
		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getUserLoginMigration: userLoginMigrationFactory.build(),
		});

		const wrapper = shallowMount(UserLoginMigrationError, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SYSTEMS_MODULE_KEY.valueOf()]: systemsModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[USER_LOGIN_MIGRATION_MODULE_KEY.valueOf()]: userLoginMigrationModule,
				},
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
					$theme: {
						name: "Testcloud",
					},
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	describe("Rendering", () => {
		describe("when the systems are loaded", () => {
			it("should show the description text", () => {
				const { wrapper } = setup({});

				const descriptionText = wrapper
					.findComponent("[data-testId=text-description]")
					.attributes("html");

				expect(descriptionText).toEqual(
					'pages.userMigration.error.description {"targetSystem":"targetSystem","instance":"Testcloud","supportLink":"mailto:nbc-support@netz-21.de?subject=Fehler%20bei%20der%20Migration"}'
				);
			});

			it("should show the 'back to login' button", () => {
				const { wrapper } = setup({});

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual("pages.userMigration.backToLogin");
				expect(button.attributes().to).toEqual("/logout");
			});
		});

		describe("when the systems and schoolnumbers are loaded", () => {
			it("should show the schoolNumberMismatch text", () => {
				const { wrapper } = setup({
					sourceSchoolNumber: "11111",
					targetSchoolNumber: "22222",
				});

				const schoolNumberMismatchText = wrapper
					.findComponent("[data-testId=text-schoolnumber-mismatch]")
					.attributes("html");

				expect(schoolNumberMismatchText).toEqual(
					'pages.userMigration.error.schoolNumberMismatch {"targetSystem":"targetSystem","targetSchoolNumber":"22222","sourceSchoolNumber":"11111"}'
				);
			});
		});
		describe("when mutliple users are found", () => {
			it("should show the multipleUsersFound text", () => {
				const { wrapper } = setup({
					multipleUsersFound: true,
				});

				const multipleUsersFoundText = wrapper
					.findComponent("[data-testId=text-multiple-users-found]")
					.attributes("html");

				expect(multipleUsersFoundText).toEqual(
					'pages.userMigration.error.multipleUsersFound {"targetSystem":"targetSystem","instance":"Testcloud","supportLink":"mailto:nbc-support@netz-21.de?subject=Fehler%20bei%20der%20Migration"}'
				);
			});
		});

		it("should have specific subject in mailto support link", () => {
			const { wrapper } = setup({
				sourceSchoolNumber: "11111",
				targetSchoolNumber: "22222",
			});

			const descriptionText = wrapper
				.findComponent("[data-testId=text-description]")
				.attributes("html");

			expect(descriptionText).toEqual(
				'pages.userMigration.error.description {"targetSystem":"targetSystem","instance":"Testcloud","supportLink":"mailto:nbc-support@netz-21.de?subject=Schulnummer%20nicht%20korrekt"}'
			);
		});
	});

	describe("Api", () => {
		describe("when mounting the component", () => {
			it("should fetch the systems", async () => {
				setup({});

				await nextTick();

				expect(systemsModule.fetchSystems).toHaveBeenCalledWith();
			});

			it("should fetch the user login migration", async () => {
				setup({});

				await nextTick();

				expect(
					userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser
				).toHaveBeenCalled();
			});
		});
	});
});
