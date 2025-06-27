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
import type { Mocked } from "vitest";

vi.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("UserLoginMigrationError", () => {
	let systemsModule: Mocked<SystemsModule>;
	let envConfigModule: Mocked<EnvConfigModule>;
	let userLoginMigrationModule: Mocked<UserLoginMigrationModule>;

	const setup = (props: {
		sourceSchoolNumber?: string;
		targetSchoolNumber?: string;
		multipleUsersFound?: boolean;
	}) => {
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
			getAccessibilityReportEmail: "ticketsystem@niedersachsen.support",
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

				const descriptionText = wrapper.find("[data-testid=text-description]");

				expect(descriptionText.text()).toEqual(
					"pages.userMigration.error.description.fail pages.userMigration.error.description.support.link"
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

				const schoolNumberMismatchText = wrapper.get(
					"[data-testId=text-schoolnumber-mismatch]"
				);

				expect(schoolNumberMismatchText.text()).toEqual(
					"pages.userMigration.error.schoolNumberMismatch.information pages.userMigration.error.schoolNumberMismatch.information.schoolNumber"
				);
			});
		});
		describe("when mutliple users are found", () => {
			it("should show the multipleUsersFound text", () => {
				const { wrapper } = setup({
					multipleUsersFound: true,
				});

				const multipleUsersFoundText = wrapper.get(
					"[data-testid=text-multiple-users-found]"
				);

				expect(multipleUsersFoundText.text()).toEqual(
					"pages.userMigration.error.multipleUsersFound pages.userMigration.error.description.support.link"
				);
			});
		});

		it("should have specific subject in mailto support link", () => {
			const { wrapper } = setup({
				sourceSchoolNumber: "11111",
				targetSchoolNumber: "22222",
			});

			const supportLink = wrapper
				.get("[data-testid=text-description]")
				.find("a");

			expect(supportLink.text()).toEqual(
				"pages.userMigration.error.description.support.link"
			);
			expect(supportLink.element.href).toEqual(
				"mailto:ticketsystem@niedersachsen.support?subject=Schulnummer%20nicht%20korrekt"
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
