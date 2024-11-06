import UserLoginMigrationConsent from "@/pages/user-login-migration/UserLoginMigrationConsent.page.vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import {
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { shallowMount } from "@vue/test-utils";
import { UserLoginMigration } from "@/store/user-login-migration";
import { userLoginMigrationFactory } from "@@/tests/test-utils/factory/userLoginMigration.factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("UserLoginMigrationConsent", () => {
	let systemsModule: jest.Mocked<SystemsModule>;
	let userLoginMigrationModule: jest.Mocked<UserLoginMigrationModule>;

	const setup = async (userLoginMigration?: Partial<UserLoginMigration>) => {
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
		const userLoginMigrationMock: UserLoginMigration =
			userLoginMigrationFactory.build({ ...userLoginMigration });
		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getUserLoginMigration: userLoginMigrationMock,
		});

		const wrapper = shallowMount(UserLoginMigrationConsent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SYSTEMS_MODULE_KEY.valueOf()]: systemsModule,
					[USER_LOGIN_MIGRATION_MODULE_KEY.valueOf()]: userLoginMigrationModule,
				},
				mocks: {
					$t: (key: string, dynamic?: object): string =>
						key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
				},
			},
		});

		return {
			wrapper,
			userLoginMigrationMock,
		};
	};

	describe("Rendering", () => {
		describe("when all mandatory props are defined", () => {
			it("should render the component", async () => {
				const { wrapper } = await setup();

				const result: boolean = wrapper
					.findComponent(UserLoginMigrationConsent)
					.exists();

				expect(result).toEqual(true);
			});
		});

		describe("when origin is equal to sourceSystemId and mandatory is not set", () => {
			it("should show the normal description text", async () => {
				const { wrapper } = await setup();

				const descriptionText = wrapper
					.findComponent("[data-testId=text-description]")
					.attributes("html");

				expect(descriptionText).toEqual(
					'pages.userMigration.description.fromSource {"targetSystem":"targetSystem","startMigration":"pages.userMigration.button.startMigration"}'
				);
			});

			it("should show the proceed migration button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find("[data-testId=btn-proceed]");

				expect(button.text()).toEqual(
					"pages.userMigration.button.startMigration"
				);
				expect(button.attributes().href).toEqual(
					"/login/oauth2/targetSystemId?migration=true"
				);
			});

			it("should show the skip migration button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("pages.userMigration.button.skip");
				expect(button.attributes().to).toEqual("/dashboard");
			});
		});

		describe("when origin is equal to sourceSystemId and when mandatory is set", () => {
			it("should show the mandatory description text", async () => {
				const { wrapper } = await setup({
					mandatorySince: new Date(2000, 1, 1),
				});

				const descriptionText = wrapper
					.findComponent("[data-testId=text-description]")
					.attributes("html");

				expect(descriptionText).toEqual(
					'pages.userMigration.description.fromSourceMandatory {"targetSystem":"targetSystem","startMigration":"pages.userMigration.button.startMigration"}'
				);
			});

			it("should show the logout button", async () => {
				const { wrapper } = await setup({
					mandatorySince: new Date(2000, 1, 1),
				});

				const button = wrapper.find("[data-testId=btn-cancel]");

				expect(button.text()).toEqual("common.actions.logout");
				expect(button.attributes().to).toEqual("/logout");
			});
		});
	});
});
